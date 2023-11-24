import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { isString } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BULL_NAME_PROCESS } from './consumer/auth.env';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthUpDto, AuthInDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue("signs") private readonly signsQueue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  private readonly regexId = /^[0-9]+$/;

  async userById(id: string) {
    if (!isString(id)) {  // ERROR : Type Date
      throw new HttpException(
        "ERR_NO_ID_USER_EXISTS",
        HttpStatus.NOT_FOUND
      );
    }

    const throwUserNotFound = new HttpException(
      "ERR_USER_NOT_FOUND",
      HttpStatus.NOT_FOUND
    );

    if (this.regexId.test(id)) {
      const idNum = parseInt(id);
      const cacheUserData = await this.cacheManager.get("cache-user_" + id);
      if ((cacheUserData) && (idNum === cacheUserData["id"])) {  // GET
        const result = {
          statusCode: 200,
          message: "SUCCESS",
          user: cacheUserData
        };
        return result;
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: idNum
        }
      });
      if (!user) { throw throwUserNotFound }

      // SET
      await this.cacheManager.set("cache-user_" + id, user)
      const result = {
        statusCode: 200,
        message: "SUCCESS",
        user: user
      };
      return result;
    } else { throw throwUserNotFound };
  }

  async signup(dto: AuthUpDto) {
    const hash = await argon.hash(dto.password);

    try {  // SAVE
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash
        }
      });
      delete user.password;
      
      await this.signsQueue.add(  // STATUS
        BULL_NAME_PROCESS,
        { mode: "up", user: user },
        { delay: 10000 }
      );
      return user;
    } catch (error) {  // ERROR
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new HttpException(
            "ERR_USER_EMAIL_EXISTS",
            HttpStatus.BAD_REQUEST
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    if (!user) {  // EMAIL
      throw new HttpException(
        "ERR_USER_EMAIL_EXISTS",
        HttpStatus.BAD_REQUEST
      );
    }

    const passwordVerify = await argon.verify(
      user.password,
      dto.password
    );
    if (!passwordVerify) {  // PASSWORD
      throw new HttpException(
        "ERR_USER_PASSWORD_EXISTS",
        HttpStatus.BAD_REQUEST
      );
    }
    delete user.password;

    await this.signsQueue.add(  // STATUS
      BULL_NAME_PROCESS,
      { mode: "in", user: user },
      { delay: 10000 }
    );
    return user;
  }

  async signout(id: string) {
    let errorSignOutOn = 1
    if (this.regexId.test(id)) {
      --errorSignOutOn;
      const idNum = parseInt(id);
      const cacheUserData = await this.cacheManager.get("cache-user_" + id);
      if ((cacheUserData) && (idNum === cacheUserData["id"])) {
        await this.signsQueue.add(  // STATUS
          BULL_NAME_PROCESS,
          { mode: "out", user: cacheUserData },
          { delay: 10000 }
        );
        return;
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: idNum
        }
      });
      if (!user) { ++errorSignOutOn; }

      await this.signsQueue.add(  // STATUS
        BULL_NAME_PROCESS,
        { mode: "out", user: user },
        { delay: 10000 }
      );
      return;
    }

    if (errorSignOutOn >= 1) {
      throw new HttpException(
        "ERR_ID_USER_EXISTS",
        HttpStatus.NOT_FOUND
      );
    }
  }
}

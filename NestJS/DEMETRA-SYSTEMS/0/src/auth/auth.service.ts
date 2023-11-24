import { HttpException, HttpStatus, Injectable, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BULL_NAME_PROCESS } from './consumer/auth.env';
import { AuthUpDto, AuthInDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue("signs") private readonly signsQueue: Queue
  ) {}

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

    const regex = /^[0-9]+$/
    if (regex.test(id)) {
      --errorSignOutOn;

      const idNum = parseInt(id);
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
    }

    if (errorSignOutOn >= 1) {
      throw new HttpException(
        "ERR_ID_USER_EXISTS",
        HttpStatus.NOT_FOUND
      );
    }
  }
}

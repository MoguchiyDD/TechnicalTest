import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
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

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    console.log(user);
    if (!user) {
      throw new HttpException(
        "ERR_USER_EMAIL_EXISTS",
        HttpStatus.BAD_REQUEST
      );
    }

    const passwordVerify = await argon.verify(
      user.password,
      dto.password
    );
    console.log(passwordVerify);
    if (!passwordVerify) {
      throw new HttpException(
        "ERR_USER_PASSWORD_EXISTS",
        HttpStatus.BAD_REQUEST
      );
    }

    delete user.password;
    return user;
  }
}

import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { isString } from 'class-validator';
import { InjectQueue } from '@nestjs/bull';
import { UsersUpDto, UsersInDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEmployee } from 'src/entity/users.entity';
import { Queue } from 'bull';
import { BULL_NAME_PROCESS } from './consumer/users.env';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEmployee) private usersDB: Repository<UsersEmployee>,
    @InjectQueue("signs") private readonly signsQueue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  private readonly logger = new Logger(UsersService.name);
  private readonly regexId = /^[0-9]+$/;
  private readonly regexEmail = /^[a-z0-9._-]+@[a-z]+\.[a-z]{2,4}$/;

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Retrieves all USERS from DATABASE TABLE
   * @returns List all USER DATA from DATABASE TABLE
  */
  async findAll(): Promise<UsersEmployee[]> {
    return await this.usersDB.find({
      cache: 0
    });
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Searches for USER by ID (SET and GET CACHE)
   * @param {string} id ID from The URL Request
   * @returns Response to Request
  */
  async userById(id: string): Promise<{
    statusCode: number,
    message: string,
    user: UsersEmployee | unknown
  }> {
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
    const throwUserOffline = new HttpException(
      "THE USER IS OFFLINE",
      HttpStatus.FORBIDDEN
    )

    // Find CACHE
    if (this.regexId.test(id)) {
      const idNum = parseInt(id);
      const cacheUserData = await this.cacheManager.get("cache-user_" + id);
      if ((cacheUserData) && (idNum === cacheUserData["id"])) {  // GET
        if (cacheUserData["status"] === true) {
          this.logger.warn("Retrieving DATA from CACHE");
          const result = {
            statusCode: HttpStatus.OK,
            message: "SUCCESS",
            user: cacheUserData
          };
          return result;
        } else { throw throwUserOffline; }
      }

      // Without CACHE
      const user = await this.usersDB.findOne({
        where: {
          id: idNum
        },
        cache: 0
      });
      if (!user) { throw throwUserNotFound }

      if (user.status === true) {
        await this.cacheManager.set("cache-user_" + id, user);
        this.logger.warn("Sending DATA from CACHE");
        const result = {
          statusCode: 200,
          message: "SUCCESS",
          user: user
        };
        return result;
      } else { throw throwUserOffline; }
    } else { throw throwUserNotFound };
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Register an ACCOUNT, as well as changing USER STATUS (true) (SET CACHE)
   * @param {UsersUpDto} dto Data Transfer Object
   * @returns USER DATA from DATABASE TABLE
  */
  async signup(dto: UsersUpDto): Promise<UsersEmployee> {
    if (!this.regexEmail.test(dto.email)) {
      throw new HttpException(
        "ERR_WRONG_EMAIL",
        HttpStatus.BAD_REQUEST
      );
    }

    const hash = await argon.hash(dto.password);

    // Find USER
    const findUser = await this.usersDB.findOne({
      where: {
        email: dto.email
      },
      cache: 0
    });
    if (findUser) {
      throw new HttpException(
        "ERR_USER_EMAIL_EXISTS",
        HttpStatus.BAD_REQUEST
      );
    }

    // Save USER
    const newUser = await this.usersDB.create({
      name: dto.name,
      email: dto.email,
      password: hash
    });
    await this.usersDB.save(newUser);

    await this.signsQueue.add(  // STATUS
      BULL_NAME_PROCESS,
      { mode: "up", user: newUser },
      { delay: 10000 }
    );

    // Set CACHE
    newUser.status = true;  // Bull executes after 10 seconds, but STATUS changes for CACHE
    await this.cacheManager.set("cache-user_" + newUser, newUser);
    this.logger.warn("Sending DATA from CACHE");

    // Result
    delete newUser.password;
    return newUser;
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Login to your ACCOUNT, as well as changing USER STATUS (true) (SET CACHE)
   * @param {UsersInDto} dto Data Transfer Object
   * @returns USER DATA from DATABASE TABLE
  */
  async signin(dto: UsersInDto): Promise<UsersEmployee> {
    const user = await this.usersDB.findOne({
      where: {
        email: dto.email
      },
      cache: 0
    });
    if (!user) {  // EMAIL
      throw new HttpException(
        "ERR_USER_EMAIL_EXISTS",
        HttpStatus.BAD_REQUEST
      );
    }

    // Because of The DATABASE (METHOD OF SAVING DATA IN «TypeORM»),
    // «argon2» complains about The HASHES PASSWORD,
    // so we make a CRUTCH SOLUTION
    const bufferPassword = Buffer.from(user.password, "utf8");
    const passwordVerify = await argon.verify(
      bufferPassword.toString(),
      dto.password
    );
    if (!passwordVerify) {  // PASSWORD
      throw new HttpException(
        "ERR_USER_PASSWORD_EXISTS",
        HttpStatus.BAD_REQUEST
      );
    }

    await this.signsQueue.add(  // STATUS
      BULL_NAME_PROCESS,
      { mode: "in", user: user },
      { delay: 10000 }
    );

    // Set CACHE
    user.status = true;  // Bull executes after 10 seconds, but STATUS changes for CACHE
    await this.cacheManager.set("cache-user_" + user.id, user);
    this.logger.warn("Sending DATA from CACHE");

    delete user.password;
    return user;
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Signing out of your ACCOUNT, as well as changing USER STATUS (false) (GET CACHE)
   * @param {string} id ID from The URL Request
  */
  async signout(id: string): Promise<void> {
    let errorSignOutOn = 1

    if (this.regexId.test(id)) {
      --errorSignOutOn;
      const idNum = parseInt(id);

      // Find CACHE
      const cacheUserData = await this.cacheManager.get("cache-user_" + id);
      if ((cacheUserData) && (idNum === cacheUserData["id"])) {
        this.logger.warn("Retrieving DATA from CACHE");
        await this.signsQueue.add(  // STATUS
          BULL_NAME_PROCESS,
          { mode: "out", user: cacheUserData },
          { delay: 10000 }
        );

        this.cacheManager.del("cache-user_" + id);  // Del CACHE
        this.logger.warn("Deleting DATA from CACHE");
      }

      // Without CACHE
      const user = await this.usersDB.findOne({
        where: {
          id: idNum
        },
        cache: 0
      });
      if (!user) { ++errorSignOutOn; }

      await this.signsQueue.add(  // STATUS
        BULL_NAME_PROCESS,
        { mode: "out", user: user },
        { delay: 10000 }
      );

      return;
    }

    if (errorSignOutOn >= 1) {  // ERROR
      throw new HttpException(
        "ERR_ID_USER_EXISTS",
        HttpStatus.NOT_FOUND
      );
    }
  }
}

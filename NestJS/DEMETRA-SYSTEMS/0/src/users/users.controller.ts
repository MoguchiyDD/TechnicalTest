import { Controller, Body, Query, Param, Get, Post } from '@nestjs/common';
import { CacheTTL } from '@nestjs/cache-manager';
import { UsersEmployee } from 'src/entity/users.entity';
import { UsersService } from './users.service';
import { UsersUpDto, UsersInDto } from './dto';

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Retrieves all USERS from DATABASE TABLE
   * @returns List all USER DATA from DATABASE TABLE
  */
  @Get("all")
  getUsersAll(): Promise<UsersEmployee[]>{
      return this.usersService.findAll();
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Searches for USER by ID (SET and GET CACHE)
   * @param {string} query.id ID from The URL Request
   * @returns Response to Request
  */
  @Get("get-user-by-id")
  @CacheTTL(1800)  // seconds
  getUserById(@Query() query: { id: string }): Promise<{
    statusCode: number,
    message: string,
    user: UsersEmployee | unknown
  }> {
    return this.usersService.userById(query.id);
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Register an ACCOUNT, as well as changing USER STATUS (true) (SET CACHE)
   * @param {UsersUpDto} dto Data Transfer Object
   * @returns USER DATA from DATABASE TABLE
  */
  @CacheTTL(1800)  // seconds
  @Post("signup")
  signup(@Body() dto: UsersUpDto): Promise<UsersEmployee> {
    return this.usersService.signup(dto);
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Login to your ACCOUNT, as well as changing USER STATUS (true) (SET CACHE)
   * @param {UsersInDto} dto Data Transfer Object
   * @returns USER DATA from DATABASE TABLE
  */
  @CacheTTL(1800)  // seconds
  @Post("signin")
  signin(@Body() dto: UsersInDto): Promise<UsersEmployee> {
    return this.usersService.signin(dto);
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Signing out of your ACCOUNT, as well as changing USER STATUS (false) (GET CACHE)
   * @param {string} query.id ID from The URL Request
  */
  @Post("signout")
  signout(@Query() query: { id: string }): Promise<void> {
    return this.usersService.signout(query.id);
  }
}

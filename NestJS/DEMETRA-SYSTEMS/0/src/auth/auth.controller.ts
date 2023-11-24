import { Controller, Body, Query, Param, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUpDto, AuthInDto } from './dto';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("get-user-by-id")
  getUserById(@Query() query: { id: string }) {
    return this.authService.userById(query.id);
  }

  @Post("signup")
  signup(@Body() dto: AuthUpDto) {
    return this.authService.signup(dto);
  }

  @Post("signin")
  signin(@Body() dto: AuthInDto) {
    return this.authService.signin(dto);
  }

  @Post("signout/:id")
  signout(@Param("id") id: string) {
    return this.authService.signout(id);
  }
}

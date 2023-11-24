import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthUpDto {
  @IsNotEmpty()
  @Length(2, 35)
  name: string
  
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string
}

export class AuthInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string
}

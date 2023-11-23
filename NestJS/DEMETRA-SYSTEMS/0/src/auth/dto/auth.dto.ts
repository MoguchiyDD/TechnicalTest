import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthDto {
  // @Length(3, 35)
  name: string
  
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string
}

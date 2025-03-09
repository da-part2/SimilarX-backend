/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, MinLength } from 'class-validator';

export class SigninUserDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;
}

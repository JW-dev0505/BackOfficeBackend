// src/auth/dto/auth.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  username: string;
  
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

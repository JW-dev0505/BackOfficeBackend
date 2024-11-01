// src/user/dto/user.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  fcmToken?: string;
}

export class UpdateUserDto {
  username: string;
  fcmToken: string;
  notificationsEnabled: boolean;
}

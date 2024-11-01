import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';

import { JwtStrategy } from './jwt.strategy'; // Make sure this exists
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

dotenv.config();
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Sets JWT as the default
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Register JwtStrategy here
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}

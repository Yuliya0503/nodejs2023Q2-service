import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/auth.guard';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
    {
      useClass: AuthGuard,
      provide: APP_GUARD,
    },
  ],
})
export class AuthModule {}

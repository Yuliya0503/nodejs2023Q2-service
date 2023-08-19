import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import AuthConst from '../../models/authConst';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: AuthConst.JWT_SECRET_KEY,
      signOptions: { expiresIn: AuthConst.TOKEN_EXPIRE_TIME },
    }),
  ],
})
export class AuthModule {}

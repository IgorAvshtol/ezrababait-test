import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [UserModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}

import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { Response } from 'express';

import { RegisterDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';


@Controller('auth')
export class AuthController {
  constructor(
      private userService: UserService,
      private authService: AuthService,
  ) {
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO, @Res({ passthrough: true }) res: Response) {
    const user = await this.userService.create(registerDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    await res.cookie('auth-cookie', token, { httpOnly: true });
    return { user, token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO, @Req() req, @Res({ passthrough: true }) res: Response) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    await res.cookie('auth-cookie', token, { httpOnly: true });
    return { user, token };
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Res() res: Response) {
    await res.cookie('auth-cookie', 'logout', { httpOnly: true });
    return res.json({ message: 'logout' });
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    return req.user;
  }
}

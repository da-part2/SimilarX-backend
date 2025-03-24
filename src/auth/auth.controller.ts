import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SigninUserDto, SignupUserDto } from 'src/user/dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards';
import { RequestWithUser } from 'src/user';
import { AuthSwagger } from './swagger/auth.swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @AuthSwagger.signin()
  async signin(@Body() data: SigninUserDto) {
    return this.authService.signin(data);
  }

  @Post('/signup')
  @AuthSwagger.signup()
  async signup(@Body() data: SignupUserDto) {
    return this.authService.signup(data);
  }

  @Get('/signout')
  @UseGuards(AuthGuard)
  @AuthSwagger.signout()
  async signout(@Req() req: RequestWithUser) {
    return this.authService.signout(req.user.sub);
  }
}

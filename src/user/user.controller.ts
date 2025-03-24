import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards';
import { RequestWithUser } from './user.type';
import { UserSwagger } from './swagger/user.swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UserSwagger.getProfile()
  async getProfile(@Req() req: RequestWithUser) {
    return await this.userService.getProfile(req.user.email);
  }
}

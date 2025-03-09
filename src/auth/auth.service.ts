import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto, SignupUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signin(data: SigninUserDto) {
    const user = await this.userService.validate(data);
    const tokens = await this.createTokens(user.email, user.id);
    await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
    return {
      ...tokens,
    };
  }

  async signout(id: number) {
    await this.userService.updateRefreshToken(id, null);
    return;
  }

  async signup(data: SignupUserDto) {
    const user = await this.userService.create(data);
    const tokens = await this.createTokens(user.email, user.id);
    await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
    return {
      ...tokens,
    };
  }

  async createTokens(email: string, id: number) {
    return {
      access_token: await this.jwtService.signAsync({ email, sub: id }),
      refresh_token: await this.jwtService.signAsync(
        { email, sub: id },
        { expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') },
      ),
    };
  }
}

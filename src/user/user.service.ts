import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SignupUserDto } from './dto/signup-user.dto';
import { compare, hash } from 'bcrypt';
import { SigninUserDto } from './dto/signin-user-dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async validate(data: SigninUserDto) {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Login failed');
    }

    const hashedPassword = user.password;
    const isPasswordValid = await compare(password, hashedPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Login failed');
    }

    return user;
  }

  async create(data: SignupUserDto) {
    const { email, name, password: plainTextPassword } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

    try {
      const saltRounds = 10;
      const hashedPassword = await hash(plainTextPassword, saltRounds);

      return this.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error creating user: ${error}`);
    }
  }

  async updateRefreshToken(id: number, refreshToken: string | null) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
  }

  async getProfile(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}

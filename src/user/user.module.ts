import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'nestjs-prisma';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

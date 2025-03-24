import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SWAGGER_USERNAME',
      useFactory: (configService: ConfigService) => configService.get('SWAGGER_USERNAME'),
      inject: [ConfigService],
    },
    {
      provide: 'SWAGGER_PASSWORD',
      useFactory: (configService: ConfigService) => configService.get('SWAGGER_PASSWORD'),
      inject: [ConfigService],
    },
  ],
  exports: ['SWAGGER_USERNAME', 'SWAGGER_PASSWORD'],
})
export class SwaggerModule {} 
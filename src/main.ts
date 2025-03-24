import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger/swagger.config';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger 설정
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  app.use('/api-docs', (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger UI"');
      return res.status(401).send('Authentication required');
    }

    const auth = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString().split(':');
    const username = auth[0];
    const password = auth[1];

    if (username === process.env.SWAGGER_USERNAME
      && password === process.env.SWAGGER_PASSWORD) {
      next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger UI"');
      return res.status(401).send('Invalid credentials');
    }
  });

  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();

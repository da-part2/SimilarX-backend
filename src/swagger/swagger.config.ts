import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('SimilarX API')
  .setDescription('SimilarX API 문서')
  .setVersion('1.0')
  .addBearerAuth()
  .build(); 
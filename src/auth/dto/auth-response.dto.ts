import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({ description: '액세스 토큰' })
  access_token: string;

  @ApiProperty({ description: '리프레시 토큰' })
  refresh_token: string;
} 
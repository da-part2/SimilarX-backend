import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserResponseDto } from '../dto/user-response.dto';

export const UserSwagger = {
  getProfile: () => applyDecorators(
    ApiTags('User'),
    ApiBearerAuth(),
    ApiOperation({ 
      summary: '사용자 프로필 조회', 
      description: '현재 로그인한 사용자의 프로필 정보를 조회합니다.' 
    }),
    ApiResponse({ 
      status: 200, 
      description: '프로필 조회 성공',
      type: UserResponseDto 
    }),
    ApiResponse({ 
      status: 401, 
      description: '인증 실패 - 유효하지 않은 토큰' 
    })
  )
}; 
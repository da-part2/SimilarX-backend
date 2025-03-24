import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { TokenResponseDto } from '../dto/auth-response.dto';
import { SigninUserDto, SignupUserDto } from '../../user/dto';

export const AuthSwagger = {
  signin: () => applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ 
      summary: '로그인', 
      description: '이메일과 비밀번호로 로그인합니다.' 
    }),
    ApiBody({
      type: SigninUserDto,
      examples: {
        example1: {
          value: {
            email: 'melong@neople.co.kr',
            password: '123456'
          },
          description: '로그인 예시'
        }
      }
    }),
    ApiResponse({ 
      status: 200, 
      type: TokenResponseDto,
      examples: {
        example1: {
          value: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          },
          summary: '로그인 성공',
        }
      }
    }),
    ApiResponse({ 
      status: 401, 
      description: '로그인 실패 - 잘못된 인증 정보' 
    })
  ),

  signup: () => applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ 
      summary: '회원가입', 
      description: '새로운 사용자를 등록합니다.' 
    }),
    ApiBody({
      type: SignupUserDto,
      examples: {
        example1: {
          value: {
            email: 'newuser@example.com',
            password: 'password123',
            name: 'New User'
          },
          description: '회원가입 예시'
        }
      }
    }),
    ApiResponse({ 
      status: 201, 
      description: '회원가입 성공',
      type: TokenResponseDto,
      examples: {
        example1: {
          value: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          },
          summary: '회원가입 성공 응답'
        }
      }
    }),
    ApiResponse({
      status: 409,
      description: '이미 존재하는 이메일'
    })
  ),

  signout: () => applyDecorators(
    ApiTags('Auth'),
    ApiBearerAuth(),
    ApiOperation({ 
      summary: '로그아웃', 
      description: '현재 로그인한 사용자를 로그아웃합니다.' 
    }),
    ApiResponse({ 
      status: 200, 
      description: '로그아웃 성공'
    }),
    ApiResponse({ 
      status: 401, 
      description: '인증 실패 - 유효하지 않은 토큰' 
    })
  )
}; 
// src/shared/enum/error.enum.ts
import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  CONFLICT = 'CONFLICT',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
}

export interface ErrorDefinition {
  message: string;
  statusCode: HttpStatus;
}

export const ErrorMap: Record<ErrorCode, ErrorDefinition> = {
  // 000
  [ErrorCode.USER_ALREADY_EXISTS]: {
    message: '이미 존재하는 사용자 이메일입니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.INVALID_CREDENTIALS]: {
    message: '유효하지않은 이메일 또는 패스워드입니다.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [ErrorCode.USER_NOT_FOUND]: {
    message: '사용자를 찾을 수 없습니다.',
    statusCode: HttpStatus.NOT_FOUND,
  },
  // 500
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    message: '알 수 없는 서버 오류',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  // 400
  [ErrorCode.BAD_REQUEST]: {
    message: '올바르지않은 요청입니다.',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.UNAUTHORIZED]: {
    message: '유효하지않은 접근 요청입니다.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [ErrorCode.TOKEN_EXPIRED]: {
    message: '만료된 토큰입니다.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [ErrorCode.INVALID_TOKEN]: {
    message: '유효하지않은 토큰입니다.',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  [ErrorCode.FORBIDDEN]: {
    message: '접근이 차단되었습니다.',
    statusCode: HttpStatus.FORBIDDEN,
  },
  [ErrorCode.NOT_FOUND]: {
    message: '요청 정보를 찾을 수 없습니다.',
    statusCode: HttpStatus.NOT_FOUND,
  },
  [ErrorCode.METHOD_NOT_ALLOWED]: {
    message: '허용되지않은 요청입니다.',
    statusCode: HttpStatus.METHOD_NOT_ALLOWED,
  },
  [ErrorCode.CONFLICT]: {
    message: '충돌이 발생했습니다.',
    statusCode: HttpStatus.CONFLICT,
  },
  [ErrorCode.TOO_MANY_REQUESTS]: {
    message: '요청이 너무 많습니다.',
    statusCode: HttpStatus.TOO_MANY_REQUESTS,
  },
  [ErrorCode.SERVICE_UNAVAILABLE]: {
    message: '일시적으로 서비스를 사용할 수 없습니다.',
    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
  },
};

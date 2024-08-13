// src/common/exceptions/custom.exception.ts
import { HttpException } from '@nestjs/common';
import { ErrorCode, ErrorMap } from './error';

export class CustomException extends HttpException {
  constructor(public readonly errorCode: ErrorCode) {
    const error = ErrorMap[errorCode];
    super(
      {
        message: error.message,
        statusCode: error.statusCode,
        errorCode: errorCode,
      },
      error.statusCode,
    );
  }
}

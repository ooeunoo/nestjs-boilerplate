import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { CustomException } from '../exception/custom_exception';
import { ErrorCode } from '../exception/error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new CustomException(ErrorCode.TOKEN_EXPIRED);
      } else if (info?.name === 'JsonWebTokenError') {
        throw new CustomException(ErrorCode.INVALID_TOKEN);
      } else {
        throw new CustomException(ErrorCode.UNAUTHORIZED);
      }
    }
    return user;
  }
}

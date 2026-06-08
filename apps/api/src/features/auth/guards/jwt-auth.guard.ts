import type { IUser } from '@job-search-tracker/types';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = IUser>(err: Error | null, user: TUser): TUser {
    if (err || !user) {
      throw new UnauthorizedException('Access token is missing or invalid');
    }
    return user;
  }
}

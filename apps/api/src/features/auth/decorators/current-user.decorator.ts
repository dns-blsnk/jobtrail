import type { IUser } from '@job-search-tracker/types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): IUser => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.user as IUser;
});

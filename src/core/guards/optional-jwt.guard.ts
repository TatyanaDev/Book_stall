import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from '../../types/authenticated-request';

@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
  handleRequest<TUser = AuthenticatedRequest['user']>(
    err: Error | null,
    user: TUser | null,
  ): TUser | null {
    if (err || !user) {
      return null;
    }

    return user;
  }
}

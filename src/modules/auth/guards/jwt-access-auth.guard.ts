import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import AuthConst from '../../../models/authConst';
import { unauthorizedError } from '../../../helpers/exeptions';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    try {
      const token = this.extractTokenFromHeader(req.headers.authorization);
      if (!token) {
        throw unauthorizedError;
      }

      const user = this.validateToken(token);
      req.user = user;
      return true;
    } catch (error) {
      throw unauthorizedError;
    }
  }

  private extractTokenFromHeader(
    authHeader: string | undefined,
  ): string | null {
    if (!authHeader) {
      return null;
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== AuthConst.BEARER_PREFIX || !token) {
      return null;
    }

    return bearer && token ? token : null;
  }

  private validateToken(token: string): any {
    return this.jwtService.verify(token, { secret: AuthConst.JWT_SECRET_KEY });
  }
}

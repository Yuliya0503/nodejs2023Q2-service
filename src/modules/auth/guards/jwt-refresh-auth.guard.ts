import {
  Injectable,
  CanActivate,
  UnauthorizedException,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JtwRefreshGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new UnauthorizedException({
        message: 'RefreshToken should not be empty',
      });
    }
    try {
      const user = this.validateRefreshToken(refreshToken);
      req.user = user;
      return true;
    } catch (error) {
      throw new ForbiddenException('RefreshToken no valid');
    }
  }

  private validateRefreshToken(refreshToken: string) {
    return this.jwtService.verify(refreshToken);
  }
}

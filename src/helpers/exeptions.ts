import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Invalid credentials', HttpStatus.FORBIDDEN);
  }
}

export class RefreshTokenMissingException extends HttpException {
  constructor() {
    super('Refresh token is missing', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidRefreshTokenException extends HttpException {
  constructor() {
    super('Refresh token is invalid or expired', HttpStatus.FORBIDDEN);
  }
}

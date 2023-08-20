import {
  Injectable,
  NestMiddleware,
  Logger,
  RawBodyRequest,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger('HTTP');

  use(
    request: RawBodyRequest<Request>,
    response: Response,
    next: NextFunction,
  ) {
    const body = request.rawBody ? request.rawBody.toString() : '';
    this.logger.log(
      `Logging http request. Method: ${request.method} - URL: ${request.url} - Header: ${request.rawHeaders} - Body: ${body} - Status code: ${response.statusCode}`,
    );

    next();
  }
}

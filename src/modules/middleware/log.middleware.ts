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
    const { method, url, rawHeaders } = request;
    const body = request.rawBody ? request.rawBody.toString() : '';
    const statusCode = response.statusCode;
    this.logger.log(
      `Method: ${method} - URL: ${url} - Header: ${rawHeaders} - Body: ${body} - Status code: ${statusCode}`,
    );

    next();
  }
}

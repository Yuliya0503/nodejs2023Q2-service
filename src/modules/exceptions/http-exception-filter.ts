import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LogService } from '../log/log.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LogService) {}
  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status: number = exception.getStatus();
    const message: string = exception.message || 'Server Error';
    const errorDataLog = {
      request: {
        method: request.method,
        url: request.url,
        body: request.body,
        query: request.query,
      },
      response: {
        message,
        StatusCode: status,
      },
    };
    await this.loggerService.error(JSON.stringify(errorDataLog));
    response.status(status).json(errorDataLog);
  }
}

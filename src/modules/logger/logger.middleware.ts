import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';
import LoggerConts from '../../models/loggerConst';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  private getRequestLog(req: Request): string {
    const { method, url, query, body, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const requestDate = new Date().toISOString();
    return `Date: ${requestDate} - Request: ${method} ${url} - Query: ${JSON.stringify(
      query,
    )} - Body: ${JSON.stringify(body)} - User agent: ${userAgent} - IP: ${ip}`;
  }

  private logResponse(
    responseLog: string,
    statusCode: number,
    contentLength: number,
    exitData: string,
  ): void {
    let logMethod = 'log';
    if (statusCode >= LoggerConts.STATUS_CODE_ERROR) {
      logMethod = 'error';
    } else if (statusCode >= LoggerConts.STATUS_CODE_WARNING) {
      logMethod = 'warn';
    }
    this.loggerService[logMethod](
      `[${logMethod.toUpperCase()}]: ${responseLog} - Status: ${statusCode} - ExitData: ${exitData} - Content length: ${contentLength}B`,
    );
  }

  private handleResponseLogging(
    req: Request,
    res: Response,
    exitData: string,
  ): void {
    if (res.listenerCount('json')) {
      const responseLog = this.getRequestLog(req);
      const contentLength = parseInt(res.get('content-length') || '0', 10);
      const statusCode = res.statusCode;

      this.logResponse(
        responseLog,
        statusCode,
        contentLength,
        exitData.substring(0, LoggerConts.MAX_LOG_DATA_LENGTH),
      );
    }
  }

  use(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', () => {
      const responseLog = this.getRequestLog(req);
      const contentLength = parseInt(res.get('content-length') || '0', 10);
      const statusCode = res.statusCode;

      this.logResponse(responseLog, statusCode, contentLength, '');
    });

    const send = res.send;
    res.send = (exitData) => {
      this.handleResponseLogging(req, res, exitData.toString());
      res.send = send;
      return res.send(exitData);
    };

    next();
  }
}

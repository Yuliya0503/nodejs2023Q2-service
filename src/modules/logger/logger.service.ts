import { ConsoleLogger, Injectable } from '@nestjs/common';
import LoggerConts from '../../models/loggerConst';
import { ILoggerService } from 'src/models/ILoggerService';

@Injectable()
export class LoggingService extends ConsoleLogger implements ILoggerService {
  private loggingLevel: number;
  constructor() {
    super();
    this.loggingLevel = LoggerConts.LOGGING_LEVEL;
  }
  async log(message: string): Promise<void> {
    super.log(message);
  }

  async verbose(message: string): Promise<void> {
    if (this.loggingLevel) {
      super.verbose(message);
    }
  }

  async debug(message: string): Promise<void> {
    if (this.loggingLevel > 1) {
      super.debug(message);
    }
  }

  async warn(message: string): Promise<void> {
    if (this.loggingLevel > 2) {
      super.warn(message);
    }
  }
  async error(message: string): Promise<void> {
    if (this.loggingLevel === 4) {
      super.error(message);
    }
  }
}

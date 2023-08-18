import { ConsoleLogger, Injectable } from '@nestjs/common';
import LoggerConts from '../../models/loggerConst';
import { ILoggerService, LogLevel } from 'src/models/ILoggerService';
import { appendFile, mkdir, readdir } from 'fs/promises';

@Injectable()
export class LoggerService extends ConsoleLogger implements ILoggerService {
  private loggingLevel: number;
  private logFileName = `log${new Date().toISOString().replace(/:/g, '-')}.log`;

  constructor() {
    super();
    this.loggingLevel = LoggerConts.LOGGING_LEVEL;
  }

  private async createLogFolder(folderPath: string): Promise<void> {
    try {
      await readdir(folderPath);
    } catch (error) {
      console.error('Error: reading log folder:', error);
      try {
        await mkdir(folderPath, { recursive: true });
      } catch (mkdirError) {
        console.error('Error creating log folder:', mkdirError);
      }
    }
  }

  private async getLogFilePath(fileName: string): Promise<string> {
    const logFolder = `${process.cwd()}/${LoggerConts.LOG_DIRECTORY}/`;
    return `${logFolder}${fileName}`;
  }

  private async appendLogToFile(filePath: string, line: string): Promise<void> {
    try {
      await appendFile(filePath, line);
    } catch (appendError) {
      console.error('Error appending to log file:', appendError);
    }
  }

  private async writeToFile(fileName: string, message: string): Promise<void> {
    const logFolder = `${process.cwd()}/${LoggerConts.LOG_DIRECTORY}/`;
    await this.createLogFolder(logFolder);
    const source = await this.getLogFilePath(fileName);
    const line = `${message}\r\n`;
    await this.appendLogToFile(source, line);
  }

  private async logMessage(logLevel: LogLevel, message: string): Promise<void> {
    if (this.loggingLevel == logLevel) {
      await this.writeToFile(this.logFileName, message);
      super[logLevel](message);
    }
  }

  async log(message: string): Promise<void> {
    await this.logMessage(LogLevel.LOG, message);
  }

  async verbose(message: string): Promise<void> {
    await this.logMessage(LogLevel.VERBOSE, message);
  }

  async debug(message: string): Promise<void> {
    await this.logMessage(LogLevel.DEBUG, message);
  }

  async warn(message: string): Promise<void> {
    await this.logMessage(LogLevel.WARN, message);
  }
  async error(message: string): Promise<void> {
    if (this.loggingLevel === LogLevel.ERROR) {
      const fullMessage = `[ERROR]: ${message}\nStatck Trace: ${
        new Error().stack
      }`;
      await this.writeToFile(LoggerConts.ERROR_LOG_FILE_NAME, fullMessage);
      await this.writeToFile(LoggerConts.LOG_FILE_NAME, fullMessage);
      super.error(fullMessage);
    }
  }
}

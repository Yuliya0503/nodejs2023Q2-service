import { Injectable, LoggerService } from '@nestjs/common';
import { appendFile, stat, readdir, mkdir } from 'fs/promises';
import { resolve } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LogService implements LoggerService {
  private logfileIndex = 1;
  private errorLogFileIndex = 1;
  private warningLogFileIndex = 1;
  private logFile: string;
  private errorLogFile: string;
  private warningLogFile: string;
  private logMaxSize: number;
  private logLevel: number;
  private logFolder: string;

  constructor(private readonly configService: ConfigService) {
    this.logFile = process.env.LOG_FILE;
    this.errorLogFile = process.env.ERROR_LOG_FILE;
    this.warningLogFile = process.env.WARNING_LOG_FILE;
    this.logMaxSize = Number(process.env.LOG_MAX_SIZE);
    this.logLevel = Number(process.env.LOGGING_LEVEL);
    this.logFolder = `${process.cwd()}/${process.env.LOG_DIR}`;
    this.writeToFolder();
  }

  private async writeToFolder() {
    try {
      await readdir(this.logFolder);
    } catch (err) {
      await mkdir(this.logFolder, { recursive: true });
    }
  }

  private async writeLogToFile(logType: string, message: any) {
    if (this.logLevel < 1 && logType === 'error') return;
    if (this.logLevel < 2 && logType === 'warning') return;
    if (this.logLevel < 3 && logType === 'log') return;

    const logIndex =
      logType === 'error'
        ? this.errorLogFileIndex
        : logType === 'warning'
        ? this.warningLogFileIndex
        : this.logfileIndex;

    const logFileName =
      logType === 'error'
        ? this.errorLogFile
        : logType === 'warning'
        ? this.warningLogFile
        : this.logFile;

    const pathToLog = resolve(this.logFolder, `${logFileName}_${logIndex}.log`);

    try {
      const stats = await stat(pathToLog);
      const size = stats.size;
      if (size > this.logMaxSize * 1024) {
        if (logType === 'error') {
          this.errorLogFileIndex++;
        } else if (logType === 'warning') {
          this.warningLogFileIndex++;
        } else {
          this.logfileIndex++;
        }
        return this.writeLogToFile(logType, message); // Retry with updated index
      }
    } catch (error) {
      console.error(error);
    }

    console.log(message);
    try {
      await appendFile(pathToLog, `${message}\n`, 'utf8');
    } catch (error) {
      console.error(error);
    }
  }

  log(message: any) {
    this.writeLogToFile('log', message);
  }

  warn(message: any) {
    this.writeLogToFile('warning', message);
  }

  error(message: any) {
    this.writeLogToFile('error', message);
  }
}

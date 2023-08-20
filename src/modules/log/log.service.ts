import { Injectable, LoggerService } from '@nestjs/common';
import { appendFile, stat } from 'fs/promises';
import { resolve } from 'path';
import { config } from 'dotenv';
config();

@Injectable()
export class LogService implements LoggerService {
  logfileIndex: number;
  errorLogFileIndex: number;
  warningLogFileIndex: number;
  logFile: string;
  errorLogFile: string;
  warningLogFile: string;
  logMaxSize: number;

  constructor() {
    this.logfileIndex = 1;
    this.errorLogFileIndex = 1;
    this.warningLogFileIndex = 1;
    this.logFile = process.env.LOG_FILE;
    this.errorLogFile = process.env.ERROR_LOG_FILE;
    this.warningLogFile = process.env.WARNING_LOG_FILE;
    this.logMaxSize = Number(process.env.LOG_MAX_SIZE);
  }

  async log(message: any) {
    let pathToLog = resolve(
      process.cwd(),
      `${this.logFile}_${this.logfileIndex}.txt`,
    );
    try {
      const stats = await stat(pathToLog);
      const size = stats.size;
      if (size > this.logMaxSize * 1024) {
        this.logfileIndex++;
        pathToLog = resolve(
          process.cwd(),
          `${this.logFile}_${this.errorLogFileIndex}.txt`,
        );
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
  async warn(message: any) {
    let pathToWarningLog = resolve(
      process.cwd(),
      `${this.warningLogFile}_${this.warningLogFileIndex}.txt`,
    );
    try {
      const stats = await stat(pathToWarningLog);
      const size = stats.size;
      if (size > this.logMaxSize * 1024) {
        this.warningLogFileIndex++;
        pathToWarningLog = resolve(
          process.cwd(),
          `${this.warningLogFile}_${this.warningLogFileIndex}.txt`,
        );
      }
    } catch (error) {
      console.error(error);
    }
    console.log(message);
    try {
      await appendFile(pathToWarningLog, `${message}\n`, 'utf8');
    } catch (error) {
      console.error(error);
    }
  }

  async error(message: any) {
    let pathToErrorLog = resolve(
      process.cwd(),
      `${this.errorLogFile}_${this.errorLogFileIndex}.txt`,
    );
    try {
      const stats = await stat(pathToErrorLog);
      const size = stats.size;
      if (size > this.logMaxSize * 1024) {
        this.errorLogFileIndex++;
        pathToErrorLog = resolve(
          process.cwd(),
          `${this.errorLogFile}_${this.errorLogFileIndex}.txt`,
        );
      }
    } catch (error) {
      console.error(error);
    }

    console.log(message);
    try {
      await appendFile(pathToErrorLog, `${message}\n`, 'utf8');
    } catch (error) {
      console.error(error);
    }
  }
}

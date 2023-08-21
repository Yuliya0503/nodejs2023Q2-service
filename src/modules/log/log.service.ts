import { Injectable, LoggerService } from '@nestjs/common';
import { appendFile, stat, readdir, mkdir } from 'fs/promises';
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
  logLevel: number;
  logDirectory: string;
  logFolder: string;

  constructor() {
    this.logfileIndex = 1;
    this.errorLogFileIndex = 1;
    this.warningLogFileIndex = 1;
    this.logFile = process.env.LOG_FILE;
    this.errorLogFile = process.env.ERROR_LOG_FILE;
    this.warningLogFile = process.env.WARNING_LOG_FILE;
    this.logMaxSize = Number(process.env.LOG_MAX_SIZE);
    this.logLevel = Number(process.env.LOGGING_LEVEL);
    this.logDirectory = process.env.LOG_DIR;
    this.logFolder = `${process.cwd()}/${this.logDirectory}/`;
  }

  private async writeToFolder() {
    try {
      await readdir(this.logFolder);
    } catch (err) {
      await mkdir(this.logFolder, { recursive: true });
    }
  }

  async log(message: any) {
    await this.writeToFolder();
    let pathToLog = resolve(
      this.logFolder,
      `${this.logFile}_${this.errorLogFileIndex}.log`,
    );
    try {
      const stats = await stat(pathToLog);
      const size = stats.size;
      if (size > this.logMaxSize) {
        this.logfileIndex++;
        pathToLog = resolve(
          this.logFolder,
          `${this.logFile}_${this.errorLogFileIndex}.log`,
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
    if (this.logLevel > 1) {
      await this.writeToFolder();
      let pathToWarningLog = resolve(
        this.logFolder,
        `${this.warningLogFile}_${this.warningLogFileIndex}.log`,
      );
      try {
        const stats = await stat(pathToWarningLog);
        const size = stats.size;
        if (size > this.logMaxSize) {
          this.warningLogFileIndex++;
          pathToWarningLog = resolve(
            this.logFolder,
            `${this.warningLogFile}_${this.warningLogFileIndex}.log`,
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
  }

  async error(message: any) {
    if (this.logLevel > 0) {
      await this.writeToFolder();
      let pathToErrorLog = resolve(
        this.logFolder,
        `${this.errorLogFile}_${this.errorLogFileIndex}.log`,
      );
      try {
        const stats = await stat(pathToErrorLog);
        const size = stats.size;
        if (size > this.logMaxSize) {
          this.errorLogFileIndex++;
          pathToErrorLog = resolve(
            this.logFolder,
            `${this.errorLogFile}_${this.errorLogFileIndex}.log`,
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
}

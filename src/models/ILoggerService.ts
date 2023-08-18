export interface ILoggerService {
  log(message: string): Promise<void>;
  verbose(message: string): Promise<void>;
  debug(message: string): Promise<void>;
  warn(message: string): Promise<void>;
  error(message: string): Promise<void>;
}

export enum LogLevel {
  LOG = 1,
  VERBOSE = 2,
  DEBUG = 3,
  WARN = 4,
  ERROR = 5,
}

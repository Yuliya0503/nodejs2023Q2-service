export default class LoggerConts {
  public static LOGGING_LEVELS = ['log', 'verbose', 'debug', 'warn', 'error'];
  public static LOGGING_LEVEL = Number(process.env.LOGGING_LEVEL) || 4;
}

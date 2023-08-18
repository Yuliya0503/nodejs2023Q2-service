export default class LoggerConts {
  public static STATUS_CODE_ERROR = 500;
  public static STATUS_CODE_WARNING = 400;
  public static MAX_LOG_DATA_LENGTH = 1000;

  public static LOGGING_LEVEL = Number(process.env.LOGGING_LEVEL) || 4;
  public static LOG_DIRECTORY = 'logs';
  public static ERROR_LOG_FILE_NAME = 'error.log';
  public static LOG_FILE_NAME = 'log.log';
}

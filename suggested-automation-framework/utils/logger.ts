import winston from 'winston';
import { env } from '../environments/env';

/**
 * Logger utility for logging messages
 */
class Logger {
  private logger: winston.Logger;
  private static instance: Logger;

  private constructor() {
    const logConfig = env.getLoggingConfig();
    
    // Define log levels
    const levels = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    };

    // Define colors for each level
    const colors = {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'white',
    };

    // Add colors to winston
    winston.addColors(colors);

    // Custom format for logs
    const format = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      winston.format.colorize({ all: true }),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    );

    // Create logger instance
    this.logger = winston.createLogger({
      level: logConfig.level,
      levels,
      format,
      transports: [
        // Console transport
        new winston.transports.Console(),
        // File transport for errors
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        // File transport for all logs
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  /**
   * Get the singleton instance of Logger
   * @returns Logger instance
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Log an error message
   * @param message Message to log
   * @param meta Additional metadata
   */
  public error(message: string, meta?: any): void {
    this.logger.error(this.formatMessage(message, meta));
  }

  /**
   * Log a warning message
   * @param message Message to log
   * @param meta Additional metadata
   */
  public warn(message: string, meta?: any): void {
    this.logger.warn(this.formatMessage(message, meta));
  }

  /**
   * Log an info message
   * @param message Message to log
   * @param meta Additional metadata
   */
  public info(message: string, meta?: any): void {
    this.logger.info(this.formatMessage(message, meta));
  }

  /**
   * Log an HTTP message
   * @param message Message to log
   * @param meta Additional metadata
   */
  public http(message: string, meta?: any): void {
    this.logger.http(this.formatMessage(message, meta));
  }

  /**
   * Log a debug message
   * @param message Message to log
   * @param meta Additional metadata
   */
  public debug(message: string, meta?: any): void {
    this.logger.debug(this.formatMessage(message, meta));
  }

  /**
   * Format the log message
   * @param message Message to format
   * @param meta Additional metadata
   * @returns Formatted message
   */
  private formatMessage(message: string, meta?: any): string {
    if (meta) {
      if (typeof meta === 'object') {
        return `${message} ${JSON.stringify(meta)}`;
      }
      return `${message} ${meta}`;
    }
    return message;
  }
}

// Export singleton instance
export const logger = Logger.getInstance();
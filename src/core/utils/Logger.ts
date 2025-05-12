import winston from 'winston';
import { config } from '../config/ConfigManager';

export class Logger {
  private logger: winston.Logger;

  constructor(context: string) {
    this.logger = winston.createLogger({
      level: config.logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${context}] ${level}: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.colorize({ all: true })
        }),
        new winston.transports.File({
          filename: `logs/${config.env}/error.log`,
          level: 'error'
        }),
        new winston.transports.File({
          filename: `logs/${config.env}/combined.log`
        })
      ]
    });
  }

  public info(message: string, ...meta: any[]): void {
    this.logger.info(message, ...meta);
  }

  public error(message: string, ...meta: any[]): void {
    this.logger.error(message, ...meta);
  }

  public warn(message: string, ...meta: any[]): void {
    this.logger.warn(message, ...meta);
  }

  public debug(message: string, ...meta: any[]): void {
    this.logger.debug(message, ...meta);
  }
}
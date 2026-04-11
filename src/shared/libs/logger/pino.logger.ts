import { injectable } from 'inversify';
import pino, { Logger as PinoLoggerInstance } from 'pino';
import { Logger } from './logger.interface.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoLoggerInstance;

  constructor() {
    this.logger = pino({
      level: process.env.LOG_LEVEL ?? 'info',
    });
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }
}

import { inject, injectable } from 'inversify';
import { Component } from '../shared/container/container.types.js';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { AppConfig } from '../shared/config/config.js';

@injectable()
export class Application {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: AppConfig
  ) {}

  public init(): void {
    this.logger.info('Application initialized');
    this.logger.info(`Server port: ${this.config.get('PORT')}`);
  }
}

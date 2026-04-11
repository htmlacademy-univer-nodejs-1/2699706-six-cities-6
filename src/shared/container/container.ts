import { Container } from 'inversify';
import { Component } from './container.types.js';
import { Application } from '../../application/application.js';
import { Logger } from '../libs/logger/logger.interface.js';
import { PinoLogger } from '../libs/logger/pino.logger.js';
import { AppConfig, appConfig } from '../config/config.js';

const container = new Container();

container.bind<Application>(Component.Application).to(Application).inSingletonScope();
container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
container.bind<AppConfig>(Component.Config).toConstantValue(appConfig);

export { container };

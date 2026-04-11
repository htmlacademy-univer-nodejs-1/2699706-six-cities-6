import 'reflect-metadata';
import { container } from './shared/container/container.js';
import { Component } from './shared/container/container.types.js';
import { Application } from './application/application.js';

async function bootstrap() {
  const app = container.get<Application>(Component.Application);
  app.init();
}

bootstrap();

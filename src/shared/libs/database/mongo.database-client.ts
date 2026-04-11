import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { Logger } from '../logger/logger.interface.js';
import { Component } from '../../container/container.types.js';
import { DatabaseClient } from './database.interface.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {}

  public async connect(uri: string): Promise<void> {
    this.logger.info(`Connecting to MongoDB: ${uri}`);

    try {
      await mongoose.connect(uri);
      this.logger.info('MongoDB connection established');
    } catch (error) {
      this.logger.error('MongoDB connection failed');
      if (error instanceof Error) {
        this.logger.error(error.message);
      }
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('MongoDB connection closed');
  }
}

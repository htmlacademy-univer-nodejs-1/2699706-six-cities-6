import { createWriteStream } from 'node:fs';
import { once } from 'node:events';
import chalk from 'chalk';
import axios from 'axios';
import { Command } from './command.interface.js';
import { OfferGenerator } from '../../shared/libs/offer-generator/offer-generator.js';
import { isMockServerData, MockServerData } from '../../shared/types/index.js';

const MIN_OFFERS_COUNT = 1;

export class GenerateCommand implements Command {
  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [countParameter, filePath, url] = parameters;

    if (!countParameter || !filePath || !url) {
      console.error('Usage: --generate <n> <filepath> <url>');
      return;
    }

    const offersCount = Number.parseInt(countParameter, 10);

    if (Number.isNaN(offersCount) || offersCount < MIN_OFFERS_COUNT) {
      console.error('n should be a positive integer.');
      return;
    }

    try {
      const mockData = await this.loadMockData(url);
      const generator = new OfferGenerator(mockData);

      await this.writeDataToFile(generator, offersCount, filePath);
      console.info(`${chalk.bold.green(offersCount)} offers generated to ${chalk.yellow(filePath)}.`);
    } catch (error) {
      console.error(`Failed to generate data for ${filePath}.`);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  private async loadMockData(url: string): Promise<MockServerData> {
    const { data } = await axios.get<unknown>(url, { timeout: 5000 });

    if (!isMockServerData(data)) {
      throw new Error('The source data from mock server has invalid format.');
    }

    return data;
  }

  private async writeDataToFile(generator: OfferGenerator, offersCount: number, filePath: string): Promise<void> {
    const fileWriter = createWriteStream(filePath, { encoding: 'utf-8' });
    const streamError = once(fileWriter, 'error').then(([error]) => {
      throw error as Error;
    });

    for (let i = 0; i < offersCount; i++) {
      const nextLine = `${generator.generate()}\n`;
      const canContinueWrite = fileWriter.write(nextLine);

      if (!canContinueWrite) {
        await Promise.race([once(fileWriter, 'drain'), streamError]);
      }
    }

    fileWriter.end();
    await Promise.race([once(fileWriter, 'finish'), streamError]);
  }
}

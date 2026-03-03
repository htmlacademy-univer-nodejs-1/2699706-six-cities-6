import chalk from 'chalk';
import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { createOffer } from '../../shared/helpers/offer.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;

    if (!filename) {
      console.error('Can not import data from non-existent file');
      return;
    }

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', (line) => {
      createOffer(line);
    });

    fileReader.on('end', (count) => {
      console.info(`${chalk.bold.green(count)} rows imported.`);
    });

    fileReader.on('error', (error) => {
      console.error(`Failed to import data from ${filename}`);
      if (error instanceof Error) {
        console.error(error.message);
      }
    });

    console.info(`Preparing to import data from ${chalk.yellow(filename)} ...`);
    await fileReader.read();
  }
}

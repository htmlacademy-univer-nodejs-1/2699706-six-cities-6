import chalk from 'chalk';
import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { createOffer } from '../../shared/helpers/offer.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;

    if (!filename) {
      console.error('Can not import data from non-existent file');
      return;
    }

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', (line) => {
      const offer = createOffer(line);
      console.info(offer);
    });

    fileReader.on('end', (count) => {
      console.info(`${chalk.bold.green(count)} rows imported.`);
    });

    console.info(`Preparing to import data from ${chalk.yellow(filename)} ...`);
    fileReader.read();
  }
}

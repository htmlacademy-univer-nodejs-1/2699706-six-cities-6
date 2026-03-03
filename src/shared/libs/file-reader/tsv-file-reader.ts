import { EventEmitter } from 'node:events';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { FileReader } from './file-reader.interface.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private readonly CHUNK_SIZE = 16384;

  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    const lineReader = createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    let importedRowCount = 0;

    try {
      for await (const line of lineReader) {
        if (!line.trim()) {
          continue;
        }

        importedRowCount++;
        this.emit('line', line);
      }

      this.emit('end', importedRowCount);
    } catch (error) {
      this.emit('error', error);
    }
  }
}

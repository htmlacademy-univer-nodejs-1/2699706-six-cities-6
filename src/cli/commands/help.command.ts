import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.bold.blue('Программа для подготовки данных для REST API сервера.')}
        ${chalk.bold('Пример:')}
            cli.js --<command> [--arguments]
        ${chalk.bold('Команды:')}
            ${chalk.green('--version:')}                          # выводит номер версии
            ${chalk.green('--help:')}                             # печатает этот текст
            ${chalk.green('--generate <n> <path> <url>:')}        # генерирует данные в TSV
            ${chalk.green('--import <path>:')}                    # импортирует данные из TSV
    `);
  }
}

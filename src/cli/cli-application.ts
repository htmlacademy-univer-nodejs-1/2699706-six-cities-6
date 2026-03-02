import { Command } from './commands/command.interface.js';

type CommandCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandCollection = {};

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }
      this.commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if (! this.commands['--help']) {
      throw new Error('The default command (--help) is not registered.');
    }
    return this.commands['--help'];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName, commandArguments] = parsedCommand;
    const command = this.getCommand(commandName);
    command.execute(...commandArguments);
  }

  private parseCommand(cliArguments: string[]): [string, string[]] {
    const parsedCommand: [string, string[]] = ['', []];
    let command = '';

    // Если аргументов нет, возвращаем пустую команду (обработается как default/help)
    if (cliArguments.length === 0) {
        return parsedCommand;
    }

    command = cliArguments[0];
    
    // Простая проверка, что это флаг команды
    if (!command.startsWith('--')) {
        // Если первый аргумент не команда, можно либо вернуть default, либо считать это ошибкой.
        // По ТЗ: если пользователь не ввёл параметр -> help. 
        // Если ввёл что-то странное, лучше тоже показать help или ошибку.
        return parsedCommand;
    }

    parsedCommand[0] = command;
    parsedCommand[1] = cliArguments.slice(1);

    return parsedCommand;
  }
}
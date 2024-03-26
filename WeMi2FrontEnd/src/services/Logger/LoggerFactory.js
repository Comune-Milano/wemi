
import { Logger } from './Logger';
import { LoggerLevels } from './LoggerLevels';
import { ConsoleLoggerChannel } from './ConsoleLoggerChannel';
import { __PRODUCTION__ } from 'utils/environment/variables';

export class LoggerFactory {
  static Create() {
    const globalLevel = __PRODUCTION__ ?
      LoggerLevels.OFF :
      LoggerLevels.LOG;
    return new Logger(globalLevel, [new ConsoleLoggerChannel()]);
  }
}

const loggerService = LoggerFactory.Create();
export { loggerService };

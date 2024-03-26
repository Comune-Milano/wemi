
import { noop } from 'utils/functions/noop';
import { LoggerLevels } from './LoggerLevels';
import { LoggerChannel } from './LoggerChannel';

export class ConsoleLoggerChannel extends LoggerChannel {
  constructor() {
    super();

    this.levelToHandlerMap = {
      [LoggerLevels.OFF]: noop,
      [LoggerLevels.LOG]: this.log,
      [LoggerLevels.DEBUG]: this.debug,
      [LoggerLevels.INFO]: this.info,
      [LoggerLevels.ERROR]: this.error,
    };
  }

  /**
   * Gets the handler associated with the given level.
   * @param {number} level The log level.
   */
  resolveLevelHandler(level) {
    return this.levelToHandlerMap[level];
  }

  /**
   * Writes a message with the LOG level.
   * @param {string} message The message to write.
   * @param {[]} args The arguments of the message.
   */
  log(message, ...args) {
    console.log(message, ...args);
  }

  /**
   * Writes a message with the DEBUG level.
   * @param {string} message The message to write.
   * @param {[]} args The arguments of the message.
   */
  debug(message, ...args) {
    console.debug(message, ...args);
  }


  /**
   * Writes a message with the INFO level.
   * @param {string} message The message to write.
   * @param {[]} args The arguments of the message.
   */
  info(message, ...args) {
    console.info(message, ...args);
  }

  /**
   * Writes a message with the WARN level.
   * @param {string} message The message to write.
   * @param {[]} args The arguments of the message.
   */
  warn(message, ...args) {
    console.warn(message, ...args);
  }

  /**
   * Writes a message with the ERROR level.
   * @param {string} message The message to write.
   * @param {[]} args The arguments of the message.
   */
  error(message, ...args) {
    console.error(message, ...args);
  }
}

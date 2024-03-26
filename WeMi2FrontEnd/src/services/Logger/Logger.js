
import { isFunction } from 'utils/functions/typeCheckers';
import { LoggerLevels } from './LoggerLevels';

export class Logger {
  constructor(globalLevel, channels = []) {
    this.globalLevel = globalLevel;
    this.channels = channels;
  }

  /**
   * Writes a message with the given level and arguments.
   * @param {number} level The log level.
   * @param {string} message The message to write.
   * @param {[]} args The arguments of the message.
   */
  write(level, message, ...args) {
    if (this.globalLevel === LoggerLevels.OFF || level < this.globalLevel) {
      return;
    }

    // Loop all channels and call the handler associated with the given level.
    this.channels.forEach(channel => {
      const levelHandler = channel.resolveLevelHandler(level);
      if (isFunction(levelHandler)) {
        levelHandler(message, ...args);
      }
    });
  }

  /**
   * Writes a message with the LOG level.
   * @param {string} message The message to write.
   * @param {[]} args The arguments of the message.
   */
  log(message, ...args) {
    this.write(LoggerLevels.LOG, message, ...args);
  }

  /**
   * Writes a message with the DEBUG level.
   * @param {string} message The message to write.
   * @param {[]} args The arguments of the message.
   */
  debug(message, ...args) {
    this.write(LoggerLevels.DEBUG, message, ...args);
  }

  /**
   * Writes a message with the DEBUG level.
   * @param {string} message The message to write.
   * @param {[]} args The arguments of the message.
   */
  info(message, ...args) {
    this.write(LoggerLevels.INFO, message, ...args);
  }

  /**
   * Writes a message with the WARN level.
   * @param {string} message The message to write.
   * @param {[]} args The arguments of the message.
   */
  warn(message, ...args) {
    this.write(LoggerLevels.WARN, message, ...args);
  }

  /**
   * Writes a message with the ERROR level.
   * @param {string} message The message to write.
   * @param {[]} args The arguments of the message.
   */
  error(message, ...args) {
    this.write(LoggerLevels.ERROR, message, ...args);
  }
}

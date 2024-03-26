
export class LoggerChannel {
  constructor() {
    if (this.constructor === LoggerChannel) {
      throw new Error(`
        This class must not be instantiated directed.
        It should be used as as base class for any logger channel type.
      `);
    }
  }

  /**
   * Gets the handler associated with the given level.
   * @param {number} level The log level.
   */
  resolveLevelHandler(level) {
    throw new Error(
      `While extending this class you need to ovveride this method
      linking the level (${level}) to a specific handler.`
    );
  }
}

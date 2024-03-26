import loggerBunyan from "bunyan";
import { options } from "./options";

/**
 * Singleton class to have unique instance of the logger
 */
export const SingletonLogger =
  function () {
    let logger;
    return {
      getIstance: function () {
        if (!logger) {
          logger = loggerBunyan.createLogger(options);
        }
        return logger;
      }
    }
  }();

export const logger = SingletonLogger.getIstance();

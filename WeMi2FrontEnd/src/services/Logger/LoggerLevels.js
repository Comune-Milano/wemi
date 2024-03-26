
export const LoggerLevels = {
  OFF: 0,
  LOG: 1,
  DEBUG: 2,
  INFO: 3,
  WARN: 4,
  ERROR: 5,
};

export const levelToString = {
  [LoggerLevels.OFF]: 'off',
  [LoggerLevels.LOG]: 'log',
  [LoggerLevels.DEBUG]: 'debug',
  [LoggerLevels.INFO]: 'info',
  [LoggerLevels.ERROR]: 'error',
};

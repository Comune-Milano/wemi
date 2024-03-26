
/**
 * Determines if the given value is a function.
 * @param {*} value
 */
export const isFunction = obj =>
  typeof obj === 'function';

/**
 * Determines if the given value is a function.
 * @param {*} value
 */
export const isObject = obj =>
  obj !== null && typeof obj === 'object';

/**
 * Determines if the given value is a string.
 * @param {*} value
 */
export const isString = value => typeof value === 'string';

/**
 * Determines if the given value is a number.
 * @param {*} value
 */
export const isNumber = value => !Number.isNaN(parseFloat(value)) && Number.isFinite(value);

/**
 * Determines if the given value is a function.
 * @param {*} value
 */
export const isBoolean = value => typeof value === 'boolean';

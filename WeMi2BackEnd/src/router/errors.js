

import { INTERNAL_SERVER_ERROR, NOT_AUTHORIZED, NOT_FOUND, SUCCESS } from 'constants/statuscode';
/**
 * The base error class
 */
class BaseError extends Error {
  /**
   * The constructor of the class
   * @param {*} message the message
   * @param {*} statusCode the status code
   */
  constructor(message, statusCode = INTERNAL_SERVER_ERROR) {
    super(message);
    this.responseCode = statusCode;
    this.message = message;
  }
}

/**
 * The base http error class
 */
export class HttpError extends Error {
  /**
   * The constructor of the class
   * @param {*} message the message
   * @param {*} statusCode the status code
   */
  constructor(message, statusCode = INTERNAL_SERVER_ERROR) {
    super(message);
    this.responseCode = statusCode;
    this.code = statusCode;
    this.message = message;
  }
}

/**
 * The not found http error class
 */
export class NotFoundError extends Error {
  /**
   * The constructor of the class
   * @param {*} message the message
   */
  constructor(message) {
    super(message);
    this.responseCode = NOT_FOUND;
    this.code = NOT_FOUND;
    this.message = message;
  }
}

/**
 * The unauthorized http error class
 */
export class UnauthorizedError extends Error {
  /**
   * The constructor of the class
   * @param {*} message the message
   */
  constructor(message) {
    super(message);
    this.responseCode = NOT_AUTHORIZED;
    this.code = NOT_AUTHORIZED;
    this.message = message;
  }
}

/**
 * The base error class
 */
export class CustomError extends BaseError {
  /**
   * The constructor of the class
   * @param {*} code the code
   * @param {*} message the message
   */
  constructor(code, message) {
    super(message);
    this.responseCode = SUCCESS;
    this.code = code;
    this.message = message;
  }
}

/**
 * The handleError funcrion
 * @param {*} err the error
 * @param {*} res the response
 */
export const handleError = (err, res) => {
  const { code, responseCode, message } = err;
  res.status(responseCode || 500).json({
    error: {
      code: code || responseCode,
      message,
    },
    success: false,
  });
};

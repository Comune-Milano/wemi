import jwt from 'jsonwebtoken';
import { logger } from 'utility/logger/getInstance';

const { SECRET_SERVICE = '', TOKEN_SERVICE_EXPIRATION = '30m' } = process.env;
/**
 * A function to create the token for services
 * @param {object} object the object to create the token
 * @returns {string} the token
 */
export const createToken = (object = {}) => {
  const token = jwt.sign({ payload: object }, SECRET_SERVICE, { expiresIn: TOKEN_SERVICE_EXPIRATION });
  return token;
};

/**
 * Decodes the token 
 * @param {string} token the token
 * @returns {object} of the token decoded  
 */
export const decodeToken = (token = '') => {
  try{
    const { exp, payload } = jwt.decode(token, { }, SECRET_SERVICE);
    if (Date.now() >= exp * 1000) {
      return;
    }
    return payload;
  }
  catch(error) {
    logger.error(error, 'Error while decoding jwt token');
    throw (error);
  }
};
import jwt from 'jsonwebtoken';
import { SECRET as JWT_SECRET } from '../../constants/authentication/cookie';
import { UNAUTHENTICATED } from '../../errors/authorization';
import { logger } from "utility/logger/getInstance";

/**
 * @deprecated
 * @param {String} token
 * Function that @returns {Object} of the token decoded  
 */
export const decodeToken = (token) => {
  try{
    const decodedToken = jwt.decode(token, { }, JWT_SECRET);
    return decodedToken;
  }
  catch(error) {
    logger.error(error, 'Error while decoding jwt token');
    throw (UNAUTHENTICATED);
  }
};
import jwt from 'jsonwebtoken';
import { SECRET as JWT_SECRET, TOKEN_EXPIRATION } from "../../constants/authentication/cookie";

/**
 * @param {Request} req
 * HTTP Request
 * @deprecated
 */

export const createToken = (user) => {
  const token = jwt.sign({ user, success: true }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
  return token;
};
/**
 * Constant to indicate the secret for the session
 */

export const { SECRET } = process.env;


/**
 * Constant to indicate the name of the Header token
 */

export const HEADER_NAME = 'iv-user';


/**
 * Constant to indicate the token expiration
 */

export const TOKEN_EXPIRATION = 2000 * 10000;


/**
 * Constant to set the options for the auth cookie
 */

export const OPTIONS_COOKIE = { httpOnly: true, sameSite: true, maxAge: TOKEN_EXPIRATION };


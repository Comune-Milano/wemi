import { PubSub } from 'apollo-server';
import cookiePkg from 'cookie';
import cookieParser from 'cookie-parser';
import tabelle from '../tabelle';
import sequence from '../sequence';
import psqlAdapter from '../helpers/psqlAdapter';
import { tradeUserInformation } from '../helpers/utenteConnesso';
import { SingletonLogger } from './logger/getInstance';
import { SESSION_NAME } from 'constants/constants';
import { SECRET } from 'constants/authentication/cookie';
const { db, queryBuilder, formatter } = psqlAdapter;
export const pubsub = new PubSub();
export const SESSION_EXPIRATION = 'SESSION_EXPIRATION';
/**
 * Function to create the context
 * @param {object} httpConnection general params
 * @param {Request} httpConnection.req the request HTTP
 * @param {object} httpConnection.res the response HTTP
 * @param {WebSocket} httpConnection.socket the web-socket package 
 * The function to create the context graphql
 * @returns {object} the context created
 */
export const contextCreation = async ({ req, res, socket }) => {
  const logger = SingletonLogger.getIstance();

  if(!req && socket){
    const cookie = socket.upgradeReq.headers.cookie || '';

    const sessionIdxCrypted = cookiePkg.parse(cookie)[SESSION_NAME];

    const { [SESSION_NAME]: sessionIndex } = cookieParser.signedCookies({ [SESSION_NAME]: sessionIdxCrypted }, SECRET);


    return {
      user: datiUtente,
      logger,
      db,
      formatter,
      queryBuilder,
      tabelle,
      sequence,
      res,
      req,
      formatter,
      sessionIndex,
    };

  }
 
  // logger.info('session: ' + req.session.user, 'graphql');

  const datiUtente = await tradeUserInformation(req);
  // const datiUtente = mockUtente
  // req.session.user= mockUtente;
  return {
    user: datiUtente,
    logger,
    db,
    formatter,
    queryBuilder,
    tabelle,
    sequence,
    res,
    req,
    formatter,
  };
};
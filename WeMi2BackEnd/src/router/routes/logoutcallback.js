import { Router } from 'express';
import passport from 'passport';
import { INTERNAL_SERVER_ERROR, SUCCESS } from '../../constants/statuscode';
import { FRONTEND, SESSION_NAME } from 'constants/constants';
import { logger } from 'utility/logger/getInstance';
import { domain, __PRODUCTION__ } from 'environment';

const logoutcallback = Router();

logoutcallback.use(passport.initialize());
logoutcallback.use(passport.session());

logoutcallback.post('/', async (request, response) => {
  try {
    logger.trace(request.body, 'body logout response');
    logger.trace(request.session, 'the user to logout');
    /**
     * A function to clear the session
     * @returns {Promise} a promise
     */
    const clearSession = async () => new Promise((resolve, reject) => {
      response.clearCookie(SESSION_NAME, {
        domain: __PRODUCTION__? domain : undefined,
      });
      response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      request.session.destroy(err => {
        if (err) {
          logger.error(err, 'Session destroy failed');
          reject(err);

          return;
        }

        resolve();
      });
      logger.trace(request.session, 'the user logged out');
    });

    await clearSession();

    return response.status(SUCCESS).redirect(FRONTEND);
  }
  catch (error) {
    logger.error(error, 'Errore in logout');
    return response.status(INTERNAL_SERVER_ERROR).send('Errore');

  }

});

export { logoutcallback };
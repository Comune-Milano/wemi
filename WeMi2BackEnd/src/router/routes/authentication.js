import { Router } from 'express';
import { SUCCESS } from '../../constants/statuscode';
import { logger } from 'utility/logger/getInstance';
import { verifyUser } from 'utility/user/verifyuser';

/**
 * 
 * EndPoint to give the token to the client
 * 
 */
const authentication = Router();

authentication.get('/', async (req, res) => {
  logger.info('authenticating');
    /**
     * Reading the session 
     */
  try {
    logger.info('Extracting the session');
    const { session } = req;
    const user = verifyUser(session.user);

    logger.info(user);
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');  
    res.status(SUCCESS).json({ user, success: true });
  }
  catch (error) {

    res.status(SUCCESS).json({ success: false, user: null });

  }
});

export { authentication };
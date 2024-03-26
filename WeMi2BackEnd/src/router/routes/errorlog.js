import { BAD_REQUEST, INTERNAL_SERVER_ERROR, SUCCESS } from "constants/statuscode";
import { logger } from 'utility/logger/getInstance';
import { ErrorLogDAO } from "dao/error/errorlogDAO";
import psqlAdapter from 'helpers/psqlAdapter';
import { Router } from "express";

const { db } = psqlAdapter;
const router = Router();

router.post(
  '/',
  async (req, res) => {
    try {
      const { description } = req.body;

      if (!description) {
        logger.trace('Trying the persist an error without providing a description.');
        res.status(BAD_REQUEST).send({
          error: 'You must provide a description of the error.',
          success: false
        });

        return;
      }
      
      const userId = req.session?.user?.idUtente;

      const errorLogDAO = new ErrorLogDAO(db, logger);
      await errorLogDAO.insert(description, userId);

      res.status(SUCCESS).send({ success: true });
    } catch(error) {
      logger.error(error, 'A problem occurred while tracing the error');
      res.status(INTERNAL_SERVER_ERROR)
        .send({
          success: false,
          error: 'A problem occurred while persisting the error.'
        });
    }
  },
);

export { router as errorLog };
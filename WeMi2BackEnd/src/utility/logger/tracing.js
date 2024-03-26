import { logger } from "./getInstance";

export class WeMiTracing {
    requestDidStart({
      variables,
      context,
      requestContext,
    }) {
      logger.trace(
        requestContext.request.query,  
        variables,
        context.user
      ); 
    }
  
    didEncounterErrors(errors) {
      for (const error of errors) {
        logger.error(error, 'WemiTracing did encounter - Error');
      }
    }
  }
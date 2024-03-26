import { ApolloError } from 'apollo-server';
import { INOLTRA_CANDIDATURA_ERROR } from '../../../errors/inoltrocandidatura';
import { changeStateUtenteOffertaLav } from '../../../sql/utenteoffertalav/update';
import { TEMPLATE_INOLTRA_CANDIDATURA } from 'constants/templates/database_template';
import { insertStateUtenteOffertaLav } from 'sql/utenteoffertalavstt/insert';
import { EMAIL_TYPE } from 'constants/templates/type_email';
import { SingletonFactoryEmail } from 'utility/email/factoryemail';
import { PAGE_AREAPERSONALE_URL } from 'constants/router/url';
/**
 * The mutation to send the request of candidacy
 * @param {*} _ nothing
 * @param {*} args the args
 * @param {*} context the context
 * @param {*} info the info
 * @returns {*} the response
 */
export const sendCandidacyRequest = async (_, args, context, info) => {
  const { idLavoratore } = args;
  let response = false;
  await context.db.tx(async t => {
    try {
      /**
       * Update the state of the worker offer in INOLTRATA 
       */
      const offerState = 1;

      await t.none(changeStateUtenteOffertaLav, { idLavoratore, offerState });
      context.logger.info(info.fieldName, changeStateUtenteOffertaLav, { idLavoratore, offerState });

      /**
       * Inserting the same state on utente_offerta_lav_stt
       */

      await t.none(insertStateUtenteOffertaLav, { idLavoratore, offerState });
      context.logger.info(info.fieldName, insertStateUtenteOffertaLav, { idLavoratore, offerState });
      response = true;
    }
    catch (error) {
      context.logger.error(error, 'Error in sending the candidacy');
      throw new ApolloError(INOLTRA_CANDIDATURA_ERROR.message, INOLTRA_CANDIDATURA_ERROR.code);
    }
  });
  return response;
};

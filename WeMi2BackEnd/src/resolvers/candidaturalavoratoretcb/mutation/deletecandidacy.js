import { ApolloError } from 'apollo-server';
import { deleteFromValAttributo } from '../../../sql/valattributout/delete';
import { deleteFromUtenteOffertaStt } from '../../../sql/utenteoffertalavstt/delete';
import { deleteFromAttributoOfferta } from '../../../sql/valattributooffertaut/delete';
import { deleteFromOffertaServizio } from '../../../sql/valattributooffertaservizio/delete';
import { deleteFromUtenteOfferta } from '../../../sql/utenteoffertaservizio/delete';
import { deleteFromUtenteLav } from '../../../sql/utenteoffertalav/delete';
import { deleteFromAttributoCalOff } from '../../../sql/valattributocaloffservlav/delete';
import { deleteFromAttributoRelOff } from '../../../sql/valattributoreloffservlav/delete';
import { deleteFromAttributoDomanda } from '../../../sql/valattributodomanda/delete';
import { deleteFromRMatchLav } from '../../../sql/rmatchriclav/delete';
import { deleteFromRichiestaTcb } from '../../../sql/richiestatcb/delete';
import { deleteFromRichiestaEnteStt } from '../../../sql/richiestaentestt/delete';
import { deleteFromRichiestaEnte } from '../../../sql/richiestaente/delete';
import { deleteFromRichiestaBaseStt } from '../../../sql/richiestabasestt/delete';
import { deleteFromAllegatoOfferta } from '../../../sql/allegatooffertalav/delete';
import { deleteFromRichiestaBase } from '../../../sql/richiestabase/delete';
import { findRichiestaBaseByTcb } from '../../../sql/richiestabase/selezione';
import { updateFlagCittadino } from '../../../sql/utente/update';
import { findIdRichiestaByLavoratore } from '../../../sql/rmatchriclav/selezione';
import { DELETE_CANDIDATURA_ERROR } from '../../../errors/inoltrocandidatura';
import { deleteFromRecensioneServizioStt, deleteFromRecensioneServizio } from 'sql/recensioneente/delete';
import User from 'dto/UtenteDTO';
import { CITTADINO, LAVORATORE } from 'constants/usercode';
import { ProfileManager } from 'domain/profiles';
/**
 * The resolver for delete candidacy
 * @param {*} _ nothing
 * @param {*} args the args 
 * @param {*} context the context
 * @param {*} info the info
 * @returns {boolean} the result
 */
export const deleteCandidacy = async (_, args, context, info) => {
  /**
   * TODO Estrarre idLavoratore da contesto
   */
  const { idLavoratore } = args;
  try {
    /**
     * TODO: Spostare le query di eliminazione e creare un errore per la mutation 
     */
    await context.db.tx('DeleteCandidacyTx', async t => {
      /**
       * Deleting the attributes associated to the idLavoratore from val_attributo_ut
       */
      context.logger.info(info.fieldName, deleteFromValAttributo, { idLavoratore });
      await t.none(deleteFromValAttributo, { idLavoratore });

      /**
       * Deleting the attributes associated to the idLavoratore from utente_offerta_lav_stt
       */
      context.logger.info(info.fieldName, deleteFromUtenteOffertaStt, { idLavoratore });
      await t.none(deleteFromUtenteOffertaStt, { idLavoratore });

      /**
       * Deleting the attributes associated to the idLavoratore from val_attributo_offerta_ut
       */
      context.logger.info(info.fieldName, deleteFromAttributoOfferta, { idLavoratore });
      await t.none(deleteFromAttributoOfferta, { idLavoratore });

      /**
       * Deleting the attributes associated to the idLavoratore from allegato_offerta_lav
       */
      context.logger.info(info.fieldName, deleteFromAllegatoOfferta, { idLavoratore });
      await t.none(deleteFromAllegatoOfferta, { idLavoratore });

      /**
       * Deleting the attributes associated to the idLavoratore from val_attributo_rel_off_serv_lav
       */
      context.logger.info(info.fieldName, deleteFromAttributoRelOff, { idLavoratore });
      await t.none(deleteFromAttributoRelOff, { idLavoratore });

      /**
       * Deleting the attributes associated to the idLavoratore from val_attributo_cal_off_serv_lav
       */
      context.logger.info(info.fieldName, deleteFromAttributoCalOff, { idLavoratore });
      await t.none(deleteFromAttributoCalOff, { idLavoratore });

      /**
       * Deleting the attributes associated to the idLavoratore from val_attributo_offerta_servizio
       */
      context.logger.info(info.fieldName, deleteFromOffertaServizio, { idLavoratore });
      await t.none(deleteFromOffertaServizio, { idLavoratore });

      /**
       * Deleting the attributes associated to the idLavoratore from utente_offerta_servizio
       */
      context.logger.info(info.fieldName, deleteFromUtenteOfferta, { idLavoratore });

      await t.none(deleteFromUtenteOfferta, { idLavoratore });

      /**
       * Deleting the attributes associated to the idLavoratore from utente_offerta_lav
       */
      context.logger.info(info.fieldName, deleteFromUtenteLav, { idLavoratore });

      await t.none(deleteFromUtenteLav, { idLavoratore });


      /**
       * Finding the idRichiesta associated to the idLavoratore
       */
      context.logger.info(info.fieldName, findIdRichiestaByLavoratore, { idLavoratore });

      const responseRMatchRicerca = await t.any(findIdRichiestaByLavoratore, { idLavoratore });

      if (Array.isArray(responseRMatchRicerca) && responseRMatchRicerca.length) {
        context.logger.info(responseRMatchRicerca);
        const idRichiesteEsperienze = responseRMatchRicerca.map(x => x.idRichiesta);

        /**
         * Deleting the idRichiesta associated to the idLavoratore from val_attributo_domanda
         */
        context.logger.info(info.fieldName, deleteFromAttributoDomanda, { idLavoratore });
        await t.none(deleteFromAttributoDomanda, { idRichiesteEsperienze });

        /**
         * Deleting the idRichiesta associated to the idLavoratore from r_match_ric_lav
         */
        context.logger.info(info.fieldName, deleteFromRMatchLav, { idLavoratore });
        await t.none(deleteFromRMatchLav, { idLavoratore });

        /**
         * Deleting the idRichiesta associated to the idLavoratore from richiesta_servizio_tcb
         */
        context.logger.info(info.fieldName, deleteFromRichiestaTcb, { idLavoratore });
        await t.none(deleteFromRichiestaTcb, { idRichiesteEsperienze });

        /**
         * Deleting the idRichiesta associated to the idLavoratore from recensione_servizio_ente_stt
         */
        context.logger.info(info.fieldName, deleteFromRecensioneServizioStt, { idLavoratore });
        await t.none(deleteFromRecensioneServizioStt, { idRichiesteEsperienze });

        /**
         * Deleting the idRichiesta associated to the idLavoratore from recensione_servizio_ente
         */
        context.logger.info(info.fieldName, deleteFromRecensioneServizio, { idLavoratore });
        await t.none(deleteFromRecensioneServizio, { idRichiesteEsperienze });

        /**
         * Deleting the idRichiesta associated to the idLavoratore from richiesta_servizio_ente_stt
         */
        context.logger.info(info.fieldName, deleteFromRichiestaEnteStt, { idLavoratore });
        await t.none(deleteFromRichiestaEnteStt, { idRichiesteEsperienze });


        /**
         * Finding the idRichiestaBase associated to the idRichiestaTCB           
         */
        context.logger.info(info.fieldName, findRichiestaBaseByTcb, { idRichiesteEsperienze });

        const responseRichiestaBase = await t.any(findRichiestaBaseByTcb, { idRichiesteEsperienze });

        /**
         * Deleting the idRichiesta associated to the idLavoratore from richiesta_servizio_ente
         */
        context.logger.info(info.fieldName, deleteFromRichiestaEnte, { idLavoratore });
        await t.none(deleteFromRichiestaEnte, { idRichiesteEsperienze });

        if (Array.isArray(responseRichiestaBase) && responseRichiestaBase.length) {
          const idRichiesteBaseEsperienze = responseRichiestaBase.map(x => x.idRichiestaBase);
          /**
           * Deleting the idRichiesta associated to the idLavoratore from richiesta_servizio_base_stt
           */

          context.logger.info(info.fieldName, deleteFromRichiestaBaseStt, { idRichiesteBaseEsperienze });
          await t.none(deleteFromRichiestaBaseStt, { idRichiesteBaseEsperienze });


          /**
           * Deleting the idRichiesta associated to the idLavoratore from richiesta_servizio_base
           */
          context.logger.info(info.fieldName, deleteFromRichiestaBase, { idRichiesteBaseEsperienze });
          await t.none(deleteFromRichiestaBase, { idRichiesteBaseEsperienze });
        }
      }
      /**
       * Updating the fg_lavoratore associated to the idLavoratore in utente
       */
      context.logger.info(info.fieldName, updateFlagCittadino, { idLavoratore });
      const user = await t.one(updateFlagCittadino, { idLavoratore });
      const userProfileManager = new ProfileManager({ ...context, helpers: context.queryBuilder, db: t });
      /**
       * Deleting the record into r_utente_profilo and insert new record with the new profile
       */
      await userProfileManager.updateProfiles([idLavoratore].map(id => ({
        id: id,
        code: LAVORATORE,
      })), CITTADINO, { idUtente: idLavoratore });
      if (context.user.profile === LAVORATORE) {
        const userDTO = new User({
          ...user,
          cd_profilo_utente: CITTADINO,
        });

        context.req.session.user = userDTO;
      }

    });
    return true;

  }
  catch (error) {
    context.logger.error(error, 'Error in deleting the candidacy');
    throw new ApolloError(DELETE_CANDIDATURA_ERROR.message, DELETE_CANDIDATURA_ERROR.code);
  }

};
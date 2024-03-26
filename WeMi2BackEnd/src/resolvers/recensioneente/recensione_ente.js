import { isNullOrUndefined } from 'util';
import { ApolloError } from 'apollo-server';
import {
  TEMPLATE_FEEDBACK_RIC_ENTE,
  TEMPLATE_NOTIFICA_ENTE_FEEDBACK_SERVIZIO,
} from '../../constants/templates/database_template';
import { FEEDBACK_REQUEST_ERROR } from '../../errors/errors';
import RecensioneDao from './RecensioneDao';
import { SingletonFactoryEmail } from 'utility/email/factoryemail';
import { EMAIL_TYPE } from 'constants/templates/type_email';
import { PAGE_FEEDBACK_URL, generatePath } from 'constants/router/url';
import { lastState } from 'sql/recensione_ente/lastState';
import { historyStates } from 'sql/recensione_ente/historyStates';
import { extractReviewRequestServiceEnter } from 'sql/recensione_ente/extractReviewRequestServiceEnter';
import { extractServiceEnter } from 'sql/recensione_ente/extractServiceEnter';
import { extractUserName } from 'sql/recensione_ente/extractUserName';
import { insertRecensioneEnte } from 'sql/recensione_ente/insertRecensioneEnte';
import { insertRecensioneEnteStt } from 'sql/recensione_ente/insertRecensioneEnteStt';
import { updateRecensioneEnte } from 'sql/recensione_ente/updateRecensioneEnte';
import { updateRecensioneEnteStt } from 'sql/recensione_ente/updateRecensioneEnteStt';
import { selectAllRecensioneEnte } from 'sql/recensione_ente/selectAllRecensioneEnte';
import { insertRecensioneServizioEnte } from 'sql/recensione_ente/insertRecensioneServizioEnte';

String.prototype.replaceAll = function (searchStr, replaceStr) {
  var str = this;

  // no match exists in string?
  if (str.indexOf(searchStr) === -1) {
    // return string
    return str;
  }

  // replace and remove first match, and do another recursirve search/replace
  return str.replace(searchStr, replaceStr).replaceAll(searchStr, replaceStr);
};
export default {
  RecensioneEnte: {
    ultimoStato: async (parent, args, context, info) => {
      context.logger.info(lastState, parent);
      return await context.db.oneOrNone(lastState, parent);
    },
    storiaStati: async (parent, args, context, info) => {
      context.logger.info(historyStates, parent);
      return await context.db.any(historyStates, parent);
    },
  },
  Query: {
    EstraiRecensioneRichiestaServizioEnte: async (
      parent,
      args,
      context,
      info
    ) => {
      context.logger.info(extractReviewRequestServiceEnter);

      return await context.db.oneOrNone(extractReviewRequestServiceEnter, args);
    },
    EstraiRecensioni: async (parent, args, context, info) => {
      const recensioni = new RecensioneDao(context);
      return recensioni.estrairecensioni(args);
    },
    EstraiEnteServizio: async (parent, args, context, info) => {
      context.logger.info(extractServiceEnter);
      return await context.db.oneOrNone(extractServiceEnter, args);
    },
    EstraiNomeUtente: async (parent, args, context, info) => {
      context.logger.info(extractUserName);
      return await context.db.oneOrNone(extractUserName, args);
    },
  },
  Mutation: {
    //Stato RECENSIONE 0 non richiesto, 1 richiesto, 2 rilasciato, 3 confermato
    RichiediFeedBackConMailRichiestaServizioEnte: async (
      parent,
      args,
      context,
      info
    ) => {
      const {
        user: { idUtente },
      } = context;
      try {
        return await context.db.tx('RichiediFeedBackTx', async (t) => {
          try {
            context.logger.info(insertRecensioneEnte);
            await t.oneOrNone(insertRecensioneEnte, args);

            context.logger.info(insertRecensioneEnteStt);
            await t.oneOrNone(insertRecensioneEnteStt, {
              ...args,
              idUtente,
              cdStatoRecensione: 1,
            });
          } catch (error) {
            throw FEEDBACK_REQUEST_ERROR;
          }
        });
      } catch (error) {
        context.logger.error(
          error,
          'Errore RichiediFeedBackConMailRichiestaServizioEnte'
        );
        throw new ApolloError(error.message, error.code);
      }
    },

    ConfermaRecensioneServizioEnte: async (parent, args, context, info) => {
      const {
        user: { idUtente },
      } = context;
      let risultato;

      context.logger.info(insertRecensioneEnteStt);
      await context.db
        .oneOrNone(insertRecensioneEnteStt, {
          ...args,
          idUtente,
          cdStatoRecensione: 3,
        })
        .then((result) => (risultato = result));
      if (risultato) return true;
      return false;
    },
    RichiediRecensioneServizioEnte: async (parent, args, context, info) => {
      const {
        user: { idUtente },
      } = context;
      let risultato;

      context.logger.info(insertRecensioneEnteStt);
      await context.db
        .oneOrNone(insertRecensioneEnteStt, {
          ...args,
          idUtente,
          cdStatoRecensione: 1,
        })
        .then((result) => (risultato = result));
      if (risultato) {
        return true;
      }
      return false;
    },
    InserisciRecensioneServizioEnte: async (parent, args, context, info) => {
      const { feedBack } = args;
      let jsonRecensione = {};
      if (feedBack.noteRecensione)
        jsonRecensione.txNotaRecensione = feedBack.noteRecensione;
      if (feedBack.velocita) jsonRecensione.qtVelocita = feedBack.velocita;
      if (feedBack.professionalita)
        jsonRecensione.qtProfessionalita = feedBack.professionalita;
      if (feedBack.puntualita)
        jsonRecensione.qtPuntualita = feedBack.puntualita;
      jsonRecensione = JSON.stringify(jsonRecensione);
      let sql, risultato, risultatoFinale;
      await context.db.tx('InserisciFeedBack', async (t) => {
        await t.batch([
          context.logger.info(updateRecensioneEnte),
          await t
            .oneOrNone(updateRecensioneEnte, {
              ...args,
              jsonRecensione,
              mediaRecensione: feedBack.mediaRecensione,
            })
            .then((result) => (risultato = result)),
        ]);
        await t.batch([
          context.logger.info(updateRecensioneEnteStt),
          await t
            .oneOrNone(updateRecensioneEnteStt, {
              ...args,
              cdStatoRecensione: 3,
            })
            .then((result) => (risultatoFinale = result)),
        ]);
      });
      if (risultatoFinale) return true;
      return false;
    },
    inserisciFeedbackServizioEnte: async (parent, args, context, info) => {
      let sql;

      return await context.db.tx('txInsert', async (t) => {
        context.logger.info(selectAllRecensioneEnte, args);
        let risultato = await t.oneOrNone(selectAllRecensioneEnte, args.input);
        context.logger.info(risultato);
        if (!isNullOrUndefined(risultato)) {
          context.logger.info(updateRecensioneEnte, args);
          const inputQuery = {
            jsonRecensione: args.input?.js_dati_recensione,
            mediaRecensione: args.input?.qt_media_singola_recensione,
            idRichiestaEnte: args.input?.id_rich_serv_rec,
          };
          await t.none(updateRecensioneEnte, { ...inputQuery });
        } else {
          await t.none(insertRecensioneServizioEnte, args.input);
        }
        const {
          user: { idUtente },
        } = context;

        context.logger.info(insertRecensioneEnteStt, args);
        const recEnteStt = await t.one(insertRecensioneEnteStt, {
          idRichiestaEnte: args.input.id_rich_serv_rec,
          cdStatoRecensione: 2,
          idUtente,
        });

        return !!recEnteStt;
      });
    },
  },
};

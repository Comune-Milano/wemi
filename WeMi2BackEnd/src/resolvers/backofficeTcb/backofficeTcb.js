import { ApolloError } from 'apollo-server';
import { BackofficeTcbDAO } from '../../dao/backofficeTcb/backofficeTcbDAO';
import { extractDomainByType } from 'sql/dominioTcb/selezione';
import { extractMunicipality } from 'sql/dominio/selezione';
import { attributo } from 'constants/db/attributo';
import { extractWorkerWithFilters, extractWorkerWithFiltersCount } from 'sql/backofficeTcb/extractWorkersWithFilters';
import { updateStatoAssociazioneLavoratore } from 'sql/rmatchriclav/update';
import { inserisciAllegatoOffertaLav } from 'sql/allegatooffertalav/inserisci';
import {
  TEMPLATE_PROMEMORIA_DISPONIBILITA_CANDIDATURA,
  TEMPLATE_VALUTAZIONE_WEMI_CITTADINO,
  TEMPLATE_VALUTAZIONE_LAVORATORE_CITTADINO,
} from 'constants/templates/database_template';
import { eliminaCv } from 'sql/allegatooffertalav/delete';
import { insertRMatchRicLav } from 'sql/rmatchriclav/insert';
import { findRichiestaAssociazione } from 'sql/rmatchriclav/selezione';
import {
  SEND_EMAIL_ERROR,
  NOT_BLOCKING_SEND_EMAIL_ERROR,
  WORKER_EVALUATION_REQUEST_BACKOFFICE_TCB,
} from 'errors/errors';
import { EMAIL_TYPE } from 'constants/templates/type_email';
import { SingletonFactoryEmail } from 'utility/email/factoryemail';
import BackOfficeTcbDomain from 'domain/backofficetcb/backofficetcb';
import { PAGE_TCB_DISPONIBILITA_LAVORATORE, PAGE_FEEDBACK_TCB_URL, PAGE_FEEDBACK_LAVORATORE_URL, generatePath } from 'constants/router/url';

export default {
  Query: {
    EstraiMatchRicercaLavoratori: async (parent, args, context) => await context.db.task(async task => {


      const { offset, parameters, idRichiesta } = args;

      const {
          cognome,
          codiceFiscale,

        } = parameters;


      const filtroCognome = cognome ? `%${cognome}%` : undefined;
      const filtroCodiceFiscale = codiceFiscale ? `%${codiceFiscale}%` : undefined;

      const params = {
        ...parameters,
        cognome: filtroCognome,
        codiceFiscale: filtroCodiceFiscale,
        offset,
        idRichiesta,
      };


      context.logger.trace(params, parameters, extractWorkerWithFilters(parameters));

      // Find the worker with parameters
      const workers = await task.any(extractWorkerWithFilters(parameters), params);
      context.logger.trace('lavoratori associati a domanda', workers);


      return workers;

    }),
    EstraiFiltersMatchingDomandaLavoratore: async (parent, args, context) => await context.db.task(async task => {
      const tyDomains = [
        52,
        51,
      ];
        // DominiTcb
      const dominiTcb = await task.many(extractDomainByType(tyDomains));

      const valuesToReturn = [...dominiTcb];

      return valuesToReturn;

    }),
    EstraiDatiMatchRicercaLavoratore: async (parent, args, context) => await context.db.task(async task => {
      const tyDomains = [
        attributo.LS_STIPENDIO_CONVIVENTE.ty_dominio_tcb,
        attributo.LS_STIPENDIO_NON_CONVIVENTE.ty_dominio_tcb,
        attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.ty_dominio_tcb,
        attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.ty_dominio_tcb,
        attributo.LS_STIPENDIO_WEEKEND.ty_dominio_tcb,
        attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.ty_dominio_tcb,
        attributo.CD_RIC_SESSO_ASSISTITO.ty_dominio_tcb,
        attributo.LS_DISPONIBILITA_SUPERFICI_CASA.ty_dominio_tcb,
        attributo.LS_FASCE_ORE_SETTIMANALI.ty_dominio_tcb,
        attributo.LS_TIPOLOGIA_CONTRATTO.ty_dominio_tcb,
        attributo.LS_DISPONIBILITA_SUPERFICI_CASA.ty_dominio_tcb,
        attributo.LS_SPAZI_CONVIVENTE.ty_dominio_tcb,
        attributo.LS_FASCE_ORE_SETTIMANALI.ty_dominio_tcb,
        attributo.LS_ORARIO_LAVORO.ty_dominio_tcb,
        attributo.LS_TIPOLOGIA_CONTRATTO.ty_dominio_tcb,
        attributo.FASCE_ETA_MANSIONI_TATA.ty_dominio_tcb1,
        attributo.LS_CORSI_BADANTE.ty_dominio_tcb,
        attributo.LS_CORSI_TATA.ty_dominio_tcb,
        attributo.LS_CARATTERE.ty_dominio_tcb,
        attributo.LS_MANSIONI_BADANTE.ty_dominio_tcb,
        attributo.LS_MANSIONI_COLF.ty_dominio_tcb,
        attributo.LS_MEZZA_GIORNATA_CONVIVENTE.ty_dominio_tcb,
        attributo.LS_FASCIA_ETA_BAMBINI.ty_dominio_tcb,
        attributo.FASCE_ETA_MANSIONI_TATA.ty_dominio_tcb,
        attributo.LS_PATOLOGIE_DISP_ACCUDIMENTO.ty_dominio_tcb,
          //attributo.LIV_LINGUE_CONOSCIUTE
        24,
      ];

        // DominiTcb
      const dominiTcb = await task.many(extractDomainByType(tyDomains));


        // municipiAll
      const municipi = await task.many(extractMunicipality);

      const valuesToReturn = [...dominiTcb, ...municipi];

      return valuesToReturn;

    }),
    EstraiRichiesteTcb: async (parent, args, context) => await context.db.task(async t => {
      const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);
      const righeTotali = await backofficeTcbDao.countRichiesteTcb();
      const results = await backofficeTcbDao.richiesteTcb();
      return { ...righeTotali, results };
    }),
    EstraiLavoratoriAssociatiRichiestaTcb: async (parent, args, context) => {

      const backofficeTcbDao = new BackofficeTcbDAO(context, args);
      return await backofficeTcbDao.lavoratoriAssociatiRichiestaTcb();
    },
    EstraiCandidatureLavoratoriTcb: async (parent, args, context) => await context.db.task(async t => {
      const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);
      let righeTotali = await backofficeTcbDao.countCandidatureLavoratoriTcb();
      const results = await backofficeTcbDao.candidatureLavoratoriTcb();
    
      return { ...righeTotali || 0, results };
    }),
    InvioEmailPromemoriaDisponibilita: async (parent, args, context) => {
      try {
      } catch (error) {
      }
    },
    EstraiDatiAssociaLavoratoriRichiesta: async (parent, args, context) => {
      const backofficeTcbDao = new BackofficeTcbDAO(context, args);
      return await backofficeTcbDao.estraiDatiAssociaLavoratoriRichiestaTcb();
    },
    AttivitaInPending: async (parent, args, context) => await context.db.task(async t => {
      const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);
      return await backofficeTcbDao.attivitaInPendingTcb();
    }),
  },
  Mutation: {
    saveCompletePdf: async (parent, args, context) => {
      const { idUtenteLav, pdfBase64 } = args;

      const { db } = context;

      const insertParams = {
        idLavoratore: idUtenteLav,
        nomeAllegato: 'CV_COMPLETO.pdf',
        byteMedia: pdfBase64,
      };

      await db.tx(async t => {
        await t.none(eliminaCv, { idLavoratore: idUtenteLav, nomeAllegato: 'CV_COMPLETO.pdf' });
        await t.none(inserisciAllegatoOffertaLav, insertParams);
      });
    },
    saveAnonymousPdf: async (parent, args, context) => {
      const { idUtenteLav, pdfBase64 } = args;

      const { db } = context;

      const insertParams = {
        idLavoratore: idUtenteLav,
        nomeAllegato: 'CV_ANONIMO.pdf',
        byteMedia: pdfBase64,
      };

      await db.tx(async t => {
        await t.none(eliminaCv, { idLavoratore: idUtenteLav, nomeAllegato: 'CV_ANONIMO.pdf' });
        await t.none(inserisciAllegatoOffertaLav, insertParams);
      });
    },
    sendPromemoriaDisponibilita: async (parent, args, context) => {
      const { db } = context;

      const { idLavoratore } = args;

      return;
    },
    matchLavoratore: async (parent, args, context, info) => {
      const { db, user } = context;

      const { idRichiesta, idLavoratore } = args;

      return await db.tx(async transaction => {

        const statoAssociazioneDaAssociare = '5';


        const paramsInsertRichiesta = {
          idLavoratore,
          statoAssociazione: statoAssociazioneDaAssociare,
          idRichiesta,
          idUltimoOperatore: user.idUtente,
        };

        const risultatoSelect = await transaction.oneOrNone(findRichiestaAssociazione, paramsInsertRichiesta);

        if (!risultatoSelect) {
          await transaction.none(insertRMatchRicLav, paramsInsertRichiesta);
          context.logger.info(insertRMatchRicLav, paramsInsertRichiesta, info.fieldName, user);
        }
        else {
          await transaction.none(updateStatoAssociazioneLavoratore, paramsInsertRichiesta);
          context.logger.info(updateStatoAssociazioneLavoratore, paramsInsertRichiesta, info.fieldName, user);
        }

        return true;



      });
    },
    unmatchLavoratore: async (parent, args, context, info) => {
      const { db, user } = context;

      const { idRichiesta, idLavoratore } = args;

      return await db.tx(async transaction => {
        try {

          const statoAssociazioneDaAssociare = '4';



          const paramsUpdate = {
            idLavoratore,
            statoAssociazione: statoAssociazioneDaAssociare,
            idRichiesta,
          };

          await transaction.none(updateStatoAssociazioneLavoratore, paramsUpdate);
          context.logger.info(updateStatoAssociazioneLavoratore, paramsUpdate, info.fieldName, user);

          return true;

        }
        catch (error) {
          context.logger.error(error, 'Error unmatchLavoratore');
          throw new ApolloError('Errore', 1299);
        }


      });
    },
    InserisciChiusuraNegativa: async (parent, args, context) => {
      const data = {
        statoAnnullatoDaOperatore: '4',
        statiDisponibilita: ['5', '6'],
      };

      await context.db.tx(async t => {
        const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);
        await backofficeTcbDao.chiudiRichiestaNegativaTcb(data);
      });
    },
    InserisciChiusuraPositiva: async (parent, args, context) => {

      await context.db.tx(async t => {
        const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);
        await backofficeTcbDao.chiudiRichiestaPositivaTcb();
      });

    },
    DisassociaLavoratore: async (parent, args, context) => {
      await context.db.tx(async t => {
        const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);
        await backofficeTcbDao.disassociaLavoratoreTcb();
      });
    },
    AccettaOffertaLavoratore: async (parent, args, context) => {
      await context.db.tx(async t => {
        const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);
        await backofficeTcbDao.accettaOffertaLavoratoreTcb();
      });
    },
    AssociaLavoratoreDomanda: async (parent, args, context) => {
      const backofficeTcbDomain = new BackOfficeTcbDomain(context);
      await backofficeTcbDomain.associaLavoratoreDomandaTcb(args);
      return await backofficeTcbDomain.sendEmailForLavoratore(args.input.codiceRichiesta);
    },
    ConfermaAssociazioneLavoratoriDomande: async (parent, args, context) => {
      await context.db.tx(async t => {
        const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);
        await backofficeTcbDao.confermaAssociazioneLavoratoriDomandeTcb();
      });
    },
    DisassociaLavoratoriDomanda: async (parent, args, context) => {
      const data = {
        statoAnnullatoDaOperatore: '4',
        statiDisponibilita: ['4', '5', '6'],
      };

      await context.db.tx(async t => {
        const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);
        await backofficeTcbDao.disassociaLavoratoriDomandaTcb(data);
      });

    },
    AssociaLavoratoreStatoDomanda: async (parent, args, context) => {
      await context.db.tx(async t => {
        const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);
        await backofficeTcbDao.associaLavoratoreStatoDomandaTcb();
      });
    },
    InvioEmailValutazioneWemiCittadino: async (parent, args, context) => {
      await context.db.tx(async t => {
        const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);
        await backofficeTcbDao.inserisciAggiornaRecensioneEnteWemiTcb();
      });

      try {

      } catch (error) {
      }
    },
    InvioEmailValutazioneLavoratoreCittadino: async (parent, args, context) => {
      await context.db.tx(async t => {
        const backofficeTcbDao = new BackofficeTcbDAO(context, args, t);

        const result = await backofficeTcbDao.selezionaRecensioneServizioEnteTcb();
        const [firsRecServEnt] = result;

        if (firsRecServEnt.cd_stato_rec === null) {
          await backofficeTcbDao.inserisciAggiornaRecensioneEnteLavoratoreTcb(null);
        }
        else if (firsRecServEnt.cd_stato_rec === '1' || firsRecServEnt.cd_stato_rec === '2') {
          throw new ApolloError(WORKER_EVALUATION_REQUEST_BACKOFFICE_TCB.message, WORKER_EVALUATION_REQUEST_BACKOFFICE_TCB.code);
        }
        else if (firsRecServEnt.cd_stato_rec === '3') {
          const progressivo = firsRecServEnt.pg_rich_serv_rec + 1;
          await backofficeTcbDao.inserisciAggiornaRecensioneEnteLavoratoreTcb(progressivo);
        }
      });

      try {
      } catch (error) {
      }
    },
  },
};

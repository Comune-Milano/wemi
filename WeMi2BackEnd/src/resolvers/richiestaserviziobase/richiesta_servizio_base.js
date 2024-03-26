import { isNullOrUndefined } from 'util';
import { ApolloError } from 'apollo-server';
import CalcolatoreRichiestaBase from './calcolaStatoRichiestaBase';
import { calcolaNotifiche } from './calcolaNotifiche';
import { countRichiesteEnte } from './queries/query';
import { selectCountRichiesteBase } from 'sql/richiestabase/selectCountRichiesteBase';
import { selectListaRichiesteBase } from 'sql/richiestabase/selectListaRichiesteBase';
import { insertRichiestaBase } from 'sql/richiestabase/insertRichiestaBase';
import { insertRichiestaBaseStt } from 'sql/richiestabasestt/insertRichiestaBaseStt';
import { insertRichiestaEnte } from 'sql/richiestaente/insertRichiestaEnte';
import { insertRichiestaEnteStt } from 'sql/richiestaentestt/insertRichiestaEnteStt';
import { selectRichiestaTcbByIdRichiestaBase } from 'sql/richiestatcb/richiestatcbidcittadino';
import { EMAIL_TYPE } from 'constants/templates/type_email';
import { SingletonFactoryEmail } from 'utility/email/factoryemail';
import { TEMPLATE_RICHISTA_SERVIZIO_ENTE, TEMPLATE_NOTIFICA_ENTE_RICHIESTA_SERVIZIO } from 'constants/templates/database_template';
import { PAGE_REQUESTSINDEX_URL } from 'constants/router/url';

/** @format */
export default {
  Query: {
        /**
         * @param parent
         * @param args
         * @param context
         * @param info
         * @deprecated
         */
    getMaxServizioEnte: async (parent, args, context, info) => {
      const sql = `SELECT MAX(id_richiesta_servizio_ente) as max_servizio_ente
             FROM ${context.tabelle.richiesta_servizio_ente} `;
      context.logger.info(sql, args);
      return await context.db.many(sql);
    },
    EstraiListaRichiesteServizioEntePerIdRichiesta_Cittadino: async (parent, args, context, info) => {
      const { user: { idUtente } } = context;
      const sql = ` 
            SELECT 
                id_richiesta_servizio_ente,
                t.id_richiesta_servizio_base,
                id_servizio_erogato_ente,
                id_interno_trans_pag,
                im_costo_totale_calcolato,
                im_costo_totale_ente,
                js_dati_lavoratore,
                to_char(dt_periodo_proposto_dal,'DD/MM/YYYY') dt_periodo_proposto_dal,
                to_char(dt_periodo_proposto_al,'DD/MM/YYYY') dt_periodo_proposto_al,
                cd_fascia_oraria_proposta,
                ts_scadenza_acquisto,
                tx_note_ente,
                id_preventivo_ente,
                t.ts_creazione
            FROM ${context.tabelle.richiesta_servizio_base} as t
            INNER JOIN ${context.tabelle.utente} ON 
            t.id_utente_richiedente=${context.tabelle.utente}.id_utente
			INNER JOIN ${context.tabelle.richiesta_servizio_ente} ON 
            ${context.tabelle.richiesta_servizio_ente}.id_richiesta_servizio_base=t.id_richiesta_servizio_base
            where id_utente_richiedente =$[idUtente] 
            and ${context.tabelle.richiesta_servizio_ente}.id_richiesta_servizio_base =$[idRichiestaServizioBase] `;
      context.logger.info(sql, args);
      return await context.db.any(sql, { ...args, idUtente });
    },

    EstraiRichiestaTCBPerIdRichiesta_Cittadino: async (parent, args, context, info) => {
      const findRichiestaTcb = selectRichiestaTcbByIdRichiestaBase;
      return await context.db.oneOrNone(findRichiestaTcb, args);
    },

    CountRichiesteEnteByIdUtente: async (parent, args, context, info) => {
      const { user } = context;
      const { idUtente } = user;
      return context.db.one(countRichiesteEnte, { idUtente });
    },

    EstraiListaRichiesteServizio_Base: async (parent, args, context, info) => {

      const { user } = context;
      const { idUtente } = user;

      let sql, count, richiesteBase = [];

      await context.db.task('servizioBaseAddTxt', async t => {
        const calcolatoreStatoRichiesta = new CalcolatoreRichiestaBase(t, idUtente);
        await calcolatoreStatoRichiesta.calcolaStatoRichieste();

        const selectCountRichiesteBaseConst = selectCountRichiesteBase(args);

        context.logger.info(selectCountRichiesteBaseConst, args);
        const counterRichieste = await t.oneOrNone(selectCountRichiesteBaseConst, { ...args, idUtente });
        if (counterRichieste && counterRichieste.count === null) {
          throw new ApolloError('error counting....');
        }

        const counter = counterRichieste.count;
        context.logger.info(counterRichieste, counter);

        const selectListaRichiesteBaseConst = selectListaRichiesteBase(args);

        context.logger.info(selectListaRichiesteBaseConst, args);
        await t.any(selectListaRichiesteBaseConst, { ...args, idUtente }).then(contenuto => {
          richiesteBase = contenuto;
        });

        for (let i = 0; i < richiesteBase.length; i++) {
          const { messaggi, serviziAcquistabili, recensioni } = await calcolaNotifiche(t, richiesteBase[i].idRichiestaBase);
          richiesteBase[i].messaggi = messaggi;
          richiesteBase[i].serviziAcquistabili = serviziAcquistabili;
          richiesteBase[i].count = counter;
          richiesteBase[i].recensioni = recensioni;
        }
      });
      return richiesteBase;

    },

  },

  RichiestaServizioBase: {
    ultimoStato: async (parent, args, context, info) => {
      const sql = `
            select  id_richiesta_servizio, ts_variazione_stato, cd_stato_richiesta_servizio, id_utente
            from ${context.tabelle.richiesta_servizio_base_stt}
            where id_richiesta_servizio = $[idRichiestaBase] and ts_variazione_stato = (
            select MAX(ts_variazione_stato)
                from ${context.tabelle.richiesta_servizio_base_stt}
                where id_richiesta_servizio = $[idRichiestaBase]
            )
            `;
      context.logger.info(sql, parent);
      return await context.db.oneOrNone(sql, parent);

    },
    richiestaEnte: async (parent, args, context, info) => {
      const sql = `
                select  
                    id_richiesta_servizio_ente,
                    id_richiesta_servizio_base,
                    id_servizio_erogato_ente,
                    id_interno_trans_pag,
                    im_costo_totale_calcolato,
                    im_costo_totale_ente,
                    js_dati_lavoratore,
                    dt_periodo_proposto_dal::timestamp with time zone,
                    dt_periodo_proposto_al::timestamp with time zone,
                    cd_fascia_oraria_proposta,
                    ts_scadenza_acquisto,
                    tx_note_ente,
                    id_preventivo_ente,
                    ts_creazione
                from ${context.tabelle.richiesta_servizio_ente}
                where id_richiesta_servizio_base = $[idRichiestaBase]
            `;
      context.logger.info(sql, parent);
      return await context.db.any(sql, parent);

    },
    user: async (parent, args, context, info) => {
      const sql = `select id_utente,
            cd_profilo_utente,
            fg_accettazione_privacy_wemi,
            ptx_codice_fiscale,
            ptx_username,
            ptx_codana,
            ty_operatore_ente,
            fg_lavoratore,
            ts_creazione
            FROM  ${context.tabelle.utente}
            where id_utente = $[id_utente_richiedente] `;
      context.logger.info(sql, parent);
      return await context.db.one(sql, parent);

    },
    storiaStati: async (parent, args, context, info) => {
      const sql = `
            select id_richiesta_servizio,
            ts_variazione_stato,
            cd_stato_richiesta_servizio,
            id_utente
            FROM  ${context.tabelle.richiesta_servizio_base_stt}
            where id_richiesta_servizio = $[idRichiestaBase] and id_utente=$[id_utente_richiedente]
            group by id_richiesta_servizio,ts_variazione_stato
			      order by max(ts_variazione_stato) desc `;
      context.logger.info(sql, parent);
      return await context.db.any(sql, parent);

    },
    storiaStatiEnte: async (parent, args, context, info) => {
      const sql = `
          SELECT 
          rsestt.id_richiesta_servizio_ente,
          rsestt.ts_variazione_stato,
          rsestt.cd_stato_ric_serv_ente,
          rsestt.id_utente
          FROM ${context.tabelle.richiesta_servizio_ente_stt} rsestt
          WHERE rsestt.id_richiesta_servizio_ente = $[idRichiestaEnte]
          GROUP BY id_richiesta_servizio_ente, ts_variazione_stato
          ORDER BY MAX(ts_variazione_stato) DESC`;
      context.logger.info(sql, parent);
      return await context.db.any(sql, parent);
    },
  },

  Mutation: {
    InserisciModificaRichiestaServizioEnte: async (parent, args, context, info) => {
      const { user: { idUtente } } = context;
      let sql, rs, rsFinale, risultato1;
      const sequenceRichiestaBase = context.sequence.seq_richiesta_servizio_base;
      await context.db.tx('servizioBaseAddTxt', async t => {
        await t.batch([
          context.logger.info(insertRichiestaBase)
                    , await t.one(insertRichiestaBase, { ...args.input, id_utente_richiedente: idUtente, sequenceRichiestaBase: sequenceRichiestaBase }).then(async contenuto =>
                        risultato1 = contenuto),
        ]);
        await t.batch([
          context.logger.info(insertRichiestaBaseStt)
                    , await t.none(insertRichiestaBaseStt, {
                      id_richiesta_servizio_base: risultato1.id_richiesta_servizio_base,
                      id_utente_richiedente: idUtente,
                    }),
        ]);
        for (let i = 0; i < args.input.enti.length; i += 1) {
          const seqRichiestaEnte = context.sequence.seq_richiesta_servizio_ente;
          const {id_servizio_erogato_ente} = args.input.enti[i];
          const {im_costo_totale_calcolato} = args.input.enti[i];
          await t.batch([
            context.logger.info(insertRichiestaEnte)
                        , await t.one(insertRichiestaEnte, {
                          id_richiesta_servizio_base: risultato1.id_richiesta_servizio_base,
                          seqRichiestaEnte: seqRichiestaEnte,
                          id_servizio_erogato_ente: id_servizio_erogato_ente,
                          im_costo_totale_calcolato: im_costo_totale_calcolato,
                        }).then(contenuto =>
                            rsFinale = contenuto),
          ]);
          await t.batch([
            context.logger.info(insertRichiestaEnteStt)
                        , await t.one(insertRichiestaEnteStt, { id_richiesta_servizio_ente: rsFinale.id_richiesta_servizio_ente, id_utente: idUtente }).then(contenuto =>
                            rsFinale = contenuto),

          ]);
        }});
      return { ...rsFinale, enti: args.input.enti };
    },
  },
};



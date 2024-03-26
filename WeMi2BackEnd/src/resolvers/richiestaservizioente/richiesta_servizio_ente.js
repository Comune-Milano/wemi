import { isNullOrUndefined } from 'util';
import { ApolloError } from 'apollo-server';
import { TEMPLATE_CHIUS_RIC_ENTE, TEMPLATE_ACC_RIC_ENTE } from '../../constants/templates/database_template';
import CalcolatoreRichiestaBase from '../richiestaserviziobase/calcolaStatoRichiestaBase';
import { updateStatoChat as updateStatoChatQ } from 'sql/richiestaentestt/updateStatoChat';
import { selectRichiestaEnteOrdine, selectRichiestaEnteOrdineStato } from 'sql/richiestaente/selectrichiestaenteordine';
import { RICHIESTA_ENTE_PAGATA_ERROR } from 'errors/pagamento';
import { CHAT_TERMINATA } from 'constants/db/chatStatus';
import { SingletonFactoryEmail } from 'utility/email/factoryemail';
import { EMAIL_TYPE } from 'constants/templates/type_email';
import { estraiRichiestaEnte } from 'sql/richiestaente/estrairichiestaente';
import { estraiRichiesteEnteInfo, estraiRichiesteEnteCount } from 'sql/richiestaente/estrairichiesteenteadmin';
import { PAGE_REQUESTSINDEX_URL } from 'constants/router/url';
import GestioneRichiesteEnteDomain from 'domain/gestionerichiesteente/gestionerichiesteente';
import {insert as insertRichiestaServizioEnteStt } from 'sql/richiestaServizioEnteStt/insert';

export default {
  Query: {
    estraiRichiesteEnte: async (parent, args, context, info) => {
      const { input } = args;
      const nomeCognome = input?.richiedente && input?.richiedente !== '' ? `%${input?.richiedente}%` : undefined;
      let sql, result, count;

      await context.db.tx('TransazioneEstraiRichiesteEnte', async t => {
        const calcolatore = new CalcolatoreRichiestaBase(t);
        await calcolatore.calcolaStatoRichieste();
        sql = estraiRichiesteEnteCount(input, nomeCognome);

        context.logger.info(sql, args);
        await t.any(sql, { ...args.input, nomeCognome }).then(contenuto => {
          count = contenuto[0].count;
        });
        if (count){
          sql = estraiRichiesteEnteInfo(input, nomeCognome);
          context.logger.info(sql);
          result = await t.any(sql, { ...args.input, nomeCognome });
        }
       
      });

      context.logger.info('RISULTATO', result);
      return { count, result };

    },
    EstraiRichiesteServizioEntePerIdEnte: async (parent, args, context, info) => {
      const gestioneRichiesteDomain = new GestioneRichiesteEnteDomain(context);
      return await gestioneRichiesteDomain.findRichiesteLoggedEnte(args.input);
    },
    EstraiRichiestaEnte: async (parent, args, context, info) => {
      context.logger.info(estraiRichiestaEnte);
      return await context.db.oneOrNone(estraiRichiestaEnte, args);
    },
    EstraiCarrello: async (parent, args, context, info) => {
      const sql = `
      SELECT id_richiesta_servizio_ente, id_richiesta_servizio_base, id_servizio_erogato_ente, ${context.tabelle.richiesta_servizio_ente}.id_interno_trans_pag, im_costo_totale_calcolato, im_costo_totale_ente, js_dati_lavoratore, ts_scadenza_acquisto, ts_creazione
      FROM ${context.tabelle.richiesta_servizio_ente}
      INNER JOIN ${context.tabelle.pagamento_stt} ON 
      ${context.tabelle.pagamento_stt}.id_interno_trans_pag = ${context.tabelle.richiesta_servizio_ente}.id_interno_trans_pag
      WHERE cd_stato_pagamento='1' and id_utente = $[idUtente]
      `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },
    EstraiRichiestaServizioEntePerOrdine: async(parent, args, context, info) => {
      try{
        const result = await context.db.oneOrNone(selectRichiestaEnteOrdine, args);
        await context.db.one(selectRichiestaEnteOrdineStato, args);
        if (result && result.logoEnte) {
          result.logoEnte = result.logoEnte.toString();
        }
        return result;
      }
      catch (error) {
        context.logger.error(error, 'Errore EstraiRichiestaServizioEntePerOrdine');
        throw new ApolloError(RICHIESTA_ENTE_PAGATA_ERROR.message, RICHIESTA_ENTE_PAGATA_ERROR.code);
      }
    },
  },
  TabellaRichiestaServizioEnte: {
    servizioEnte: async (parent, args, context, info) => {
      let sql;
      sql = `select avg(qt_media_singola_recensione) as media_recensioni,count(qt_media_singola_recensione) as "numeroRecensioni", 
      id_servizio_ente, 
      id_servizio_riferimento, 
      id_ente_erogatore, 
      tl_descrizione_serv_erog_ente, 
      im_prezzo_minimo, 
      im_prezzo_minimo_offerta_calc, 
      dt_inizio_val_offerta_prezzo, 
      dt_fine_val_offerta_prezzo, 
      cd_tipo_offerta_srv, 
      id_sede_erogazione_srv, 
      tx_altre_mansioni, js_dati_prezzo, js_info_personale, cd_modalita_erogazione, 
      cd_tipo_servizio_erog, qt_min_pers, qt_max_pers, 
      dt_inizio_erog_serv, dt_fine_erog_serv, 
      js_note_adminwemi_su_servizio, fg_accetta_preventivo, 
      pg_versione,  
      ${context.tabelle.servizio_erogato_ente}.ts_creazione
          FROM  ${context.tabelle.servizio_erogato_ente} 
          left JOIN ${context.tabelle.richiesta_servizio_ente} ON 
          id_servizio_ente=id_servizio_erogato_ente
          left JOIN ${context.tabelle.recensione_ente} ON 
           id_richiesta_servizio_ente=id_rich_serv_rec
          where ${context.tabelle.servizio_erogato_ente}.id_servizio_ente=$[idServizioErogatoEnte]
          group by id_servizio_ente`;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, parent);
    },
  },
  RichiestaServizioEnte: {
    allegato: async (parent, args, context, info) => {

      const sql = `select *
      FROM  ${context.tabelle.media}
      where id_media = $[id_preventivo_ente]`;
      context.logger.info(sql, parent);
      let risultato = await context.db.oneOrNone(sql, parent);
      if (risultato !== null)
        risultato.oj_media = risultato.oj_media.toString();
      return risultato;
    },
    datiPagamento: async (parent, args, context, info) => {
      const sql = `select *
      FROM  ${context.tabelle.pagamento}
      where id_interno_transazione = $[id_interno_trans_pag]`;
      context.logger.info(sql, parent);
      return await context.db.oneOrNone(sql, parent);

    },
    richiestaServizioBase: async (parent, args, context, info) => {
      const sql = `select t.id_richiesta_servizio_base as "idRichiestaBase", 
        $[id_richiesta_servizio_ente] as "idRichiestaEnte",
        to_char(dt_periodo_richiesto_dal,'YYYY-MM-DD')dt_periodo_richiesto_dal,
        to_char(dt_periodo_richiesto_al,'YYYY-MM-DD')dt_periodo_richiesto_al,
         id_utente_richiedente, js_dati_richiesta, t.ts_creazione,
        tl_testo_1 as "serviceName",
        min(${context.tabelle.richiesta_servizio_ente}.im_costo_totale_ente) as costo
        FROM  ${context.tabelle.richiesta_servizio_base} as t
        inner join ${context.tabelle.richiesta_servizio_ente} ON ${context.tabelle.richiesta_servizio_ente}.id_richiesta_servizio_base = t.id_richiesta_servizio_base
                     inner join ${context.tabelle.servizio_erogato_ente} ON ${context.tabelle.servizio_erogato_ente}.id_servizio_ente = ${context.tabelle.richiesta_servizio_ente}.id_servizio_erogato_ente
					 inner join ${context.tabelle.servizio} ON ${context.tabelle.servizio}.id_servizio = ${context.tabelle.servizio_erogato_ente}.id_servizio_riferimento
					 inner join ${context.tabelle.contenuto} ON ${context.tabelle.contenuto}.id_contenuto = ${context.tabelle.servizio}.id_servizio
        where t.id_richiesta_servizio_base = $[id_richiesta_servizio_base] and id_richiesta_servizio_ente=$[id_richiesta_servizio_ente]
        group by t.id_richiesta_servizio_base, id_contenuto`;
      context.logger.info(sql, parent);
      return await context.db.one(sql, parent);

    },
    servizioEnte: async (parent, args, context, info) => {
      let sql;
      sql = `select avg(qt_media_singola_recensione) as media_recensioni,count(qt_media_singola_recensione) as "numeroRecensioni", 
        id_servizio_ente, 
        id_servizio_riferimento, 
        id_ente_erogatore, 
        tl_descrizione_serv_erog_ente, im_prezzo_minimo, 
        im_prezzo_minimo_offerta_calc, 
        dt_inizio_val_offerta_prezzo, 
        dt_fine_val_offerta_prezzo, cd_tipo_offerta_srv, 
        id_sede_erogazione_srv, 
        tx_altre_mansioni, 
        js_dati_prezzo, js_info_personale, 
        cd_modalita_erogazione, 
        cd_tipo_servizio_erog, qt_min_pers, qt_max_pers, dt_inizio_erog_serv, dt_fine_erog_serv, js_note_adminwemi_su_servizio, 
        fg_accetta_preventivo, pg_versione,  ${context.tabelle.servizio_erogato_ente}.ts_creazione
            FROM  ${context.tabelle.servizio_erogato_ente} 
            left JOIN ${context.tabelle.richiesta_servizio_ente} ON 
            id_servizio_ente=id_servizio_erogato_ente
            left JOIN ${context.tabelle.recensione_ente} ON 
             id_richiesta_servizio_ente=id_rich_serv_rec
            where ${context.tabelle.servizio_erogato_ente}.id_servizio_ente=$[id_servizio_erogato_ente]
            group by id_servizio_ente`;
      context.logger.info(sql, parent);
      return await context.db.oneOrNone(sql, parent);
    },
    recensione: async (parent, args, context, info) => {
      const sql = `
      SELECT id_rich_serv_rec, qt_media_singola_recensione, js_dati_recensione, js_dati_recensione_wemi, ts_creazione
      FROM ${context.tabelle.recensione_ente}
      WHERE id_rich_serv_rec =$[id_richiesta_servizio_ente]`;
      context.logger.info(sql, parent);
      return await context.db.oneOrNone(sql, parent);
    },
    ultimoStato: async (parent, args, context, info) => {
      const sql = `
      select  id_richiesta_servizio_ente, ts_variazione_stato, cd_stato_ric_serv_ente,cd_stato_chat, id_utente
      from ${context.tabelle.richiesta_servizio_ente_stt}
      where id_richiesta_servizio_ente = $[id_richiesta_servizio_ente] and ts_variazione_stato = (
      select MAX(ts_variazione_stato)
          from ${context.tabelle.richiesta_servizio_ente_stt}
          where id_richiesta_servizio_ente = $[id_richiesta_servizio_ente]
      )
      `;
      context.logger.info(sql, parent);
      return await context.db.oneOrNone(sql, parent);

    },
    storiaStati: async (parent, args, context, info) => {
      const sql = `
        select 
          a.id_richiesta_servizio_ente,
          a.ts_variazione_stato,
          a.cd_stato_ric_serv_ente,
          a.cd_stato_chat,
          a.id_utente,
          b.ts_scadenza_acquisto
        FROM   ${context.tabelle.richiesta_servizio_ente_stt} a
        inner join ${context.tabelle.richiesta_servizio_ente} b on a.id_richiesta_servizio_ente = b.id_richiesta_servizio_ente
        where  a.id_richiesta_servizio_ente=$[id_richiesta_servizio_ente]`;
      context.logger.info(sql, parent);
      let storiaStati;
      await context.db.any(sql, parent).then(result => {
        const lastStateIndex = result.length - 1;
        const lastState = result[lastStateIndex];
        if (lastState.cd_stato_ric_serv_ente === '2'
          && new Date() > new Date(lastState.ts_scadenza_acquisto)) {
          const newLastState = {
            id_richiesta_servizio_ente: lastState.id_richiesta_servizio_ente,
            ts_variazione_stato: new Date(),
            cd_stato_ric_serv_ente: '6',
            cd_stato_chat: CHAT_TERMINATA,
            id_utente: lastState.id_utente,
          };
          result.push(newLastState);
          let sql = `
              INSERT INTO ${context.tabelle.richiesta_servizio_ente_stt}(
                id_richiesta_servizio_ente,
                ts_variazione_stato,
                cd_stato_ric_serv_ente,
                cd_stato_chat,
                id_utente
              ) 
              VALUES (
                $[id_richiesta_servizio_ente],
                $[ts_variazione_stato],
                $[cd_stato_ric_serv_ente],
                $[cd_stato_chat],
                $[id_utente]
              )`;
          context.db.oneOrNone(sql, newLastState);
        }
        storiaStati = result;
      });
      return storiaStati;
    },
  },
  Mutation: {
    AllegaFileRichiestaServizioEnte: async (parent, args, context, info) => {
      let sql, risultato, risultatoFinale;
      await context.db.tx('AllegaFileTx', async t => {
        await t.batch([
          sql = `
      INSERT INTO ${context.tabelle.media} (
        id_media,
        ty_mime_type_media,
        nm_nome_media,
        oj_media,
        ts_creazione)
      VALUES (
        nextval('${context.sequence.seq_media}'), 
        $[ty_mime_type_media], 
        $[nm_nome_media],
        $[oj_media],
        localtimestamp
      ) RETURNING *;
      `,
          context.logger.info(sql, args),
          await t.oneOrNone(sql, args.media).then(result => risultato = result),
        ]);
        if (risultato)
          await t.batch([
            sql = `
        UPDATE ${context.tabelle.richiesta_servizio_ente}
        SET id_preventivo_ente=${risultato.id_media}, ts_creazione=localtimestamp
        WHERE id_richiesta_servizio_ente=$[idRichiestaEnte]
        RETURNING *;
        `,
            context.logger.info(sql, args),
            await t.oneOrNone(sql, args).then(result => risultatoFinale = result),
          ]);
      });
      if (risultatoFinale)
        return true;
      return false;
    },
    AccettaRichiestaServizioCittadino: async (parent, args, context, info) => {
      const { datiUpdate } = args;
      const { user: { idUtente }} = context;
      let jsonLavoratore = {};
      if (datiUpdate.nominativoOperatore) {
        jsonLavoratore.txNominativoOperatore = datiUpdate.nominativoOperatore;
      };

      jsonLavoratore = JSON.stringify(jsonLavoratore);
      let risultato, risultatoFinale, sql;
      return await context.db.tx('AccettaRichiestaEnteTx', async t => {
        await t.batch([
          sql = `UPDATE ${context.tabelle.richiesta_servizio_ente}
        SET ${datiUpdate.fasciaOraria ? datiUpdate.fasciaOraria !== 0 ? 'cd_fascia_oraria_proposta=$[fasciaOraria],' : '' : ''}
        ${datiUpdate.validita ? datiUpdate.validita !== '' ? 'ts_scadenza_acquisto=$[validita],' : '' : ''}
        ${datiUpdate.disponibilitaDa ? datiUpdate.disponibilitaDa !== '' ? 'dt_periodo_proposto_dal=$[disponibilitaDa],' : '' : ''}
        ${datiUpdate.disponibilitaA ? datiUpdate.disponibilitaA !== '' ? 'dt_periodo_proposto_al=$[disponibilitaA],' : '' : ''}
        ${!isNullOrUndefined(datiUpdate.importoTotale) ? 'im_costo_totale_ente=$[importoTotale],' : ''}
        js_dati_lavoratore='${jsonLavoratore}', 
        ${datiUpdate.infoAggiuntive ? datiUpdate.infoAggiuntive !== '' ? 'tx_note_ente=$[infoAggiuntive],' : '' : ''}
        fg_altra_modalita_pagamento = $[fgAltreModPagamento],
        ts_creazione=localtimestamp
        WHERE id_richiesta_servizio_ente=$[idRichiestaEnte]
        RETURNING *;`,
          context.logger.info(sql, args.datiUpdate),
          await t.oneOrNone(sql, args.datiUpdate).then(result => risultato = result),
        ]);


        await t.batch([
          sql = `select *
        from  ${context.tabelle.richiesta_servizio_ente_stt}
        where id_richiesta_servizio_ente= $[idRichiestaEnte] and ts_variazione_stato = 
        (select MAX(richiesta_servizio_ente_stt.ts_variazione_stato)
         from ${context.tabelle.richiesta_servizio_ente_stt}
         where id_richiesta_servizio_ente= $[idRichiestaEnte] 
        )
         ;`,
          context.logger.info(sql, args),
          await t.oneOrNone(sql, args.datiUpdate).then(result => risultato = result),
        ]);

        if (risultato) {
          // chat chiusa stato 3
          await t.batch([
            context.logger.info(insertRichiestaServizioEnteStt, args),
            await t.oneOrNone(insertRichiestaServizioEnteStt, { ...args.datiUpdate, id_utente: idUtente, CHAT_TERMINATA, stato: 2 }).then(result => risultatoFinale = result),
          ]);

        }
      });

    },
    ChiudiRichiestaServizioEnte: async (parent, args, context, info) => {
      let risultato, sql;
      
      const { user: { idUtente }} = context;

      return await context.db.tx('confermaChiusuraTx', async t => {

        await t.batch([
          sql = `UPDATE ${context.tabelle.richiesta_servizio_ente}
        SET tx_note_ente=$[txNote], ts_creazione=localtimestamp
        WHERE id_richiesta_servizio_ente=$[idRichiestaEnte] RETURNING *;`,
          context.logger.info(sql, args),
          await t.oneOrNone(sql, args).then(result => risultato = result),
        ]);

        await t.batch([
          sql = `select *
        from  ${context.tabelle.richiesta_servizio_ente_stt}
        where  id_richiesta_servizio_ente= $[idRichiestaEnte]  and ts_variazione_stato = 
        (select MAX(richiesta_servizio_ente_stt.ts_variazione_stato)
         from ${context.tabelle.richiesta_servizio_ente_stt}
         where id_richiesta_servizio_ente= $[idRichiestaEnte] 
        )
         ;`,
          context.logger.info(sql, args),
          await t.oneOrNone(sql, args).then(result => risultato = result),
        ]);
        if (risultato) {
          //chiudi chat stato 3
          await t.batch([
            context.logger.info(insertRichiestaServizioEnteStt, args),
            await t.oneOrNone(insertRichiestaServizioEnteStt, { ...args, id_utente: idUtente, CHAT_TERMINATA, stato: 5 }).then(result => risultato = result),
          ]);
        }

      });

    },
    DisattivaChatRichiestaServizioEnte: async (parent, args, context, info) => {

      let risultato, sql;
      sql = `INSERT INTO ${context.tabelle.richiesta_servizio_ente_stt}
      (id_richiesta_servizio_ente,cd_stato_ric_serv_ente,cd_stato_chat, ts_variazione_stato)
      VALUES ($[idRichiestaEnte],2,0,localtimestamp) RETURNING *;`;
      context.logger.info(sql, args);
      await context.db.oneOrNone(sql, args).then(result => risultato = result);
      if (risultato)
        return true;
      return false;
    },

    DisattivaChatRichiestaServizioEnte: async (parent, args, context, info) => {
      let risultato, sql;
      sql = `UPDATE ${context.tabelle.richiesta_servizio_ente_stt}
    SET cd_stato_chat=0, ts_variazione_stato=localtimestamp
    WHERE id_richiesta_servizio_ente=$[idRichiestaEnte] RETURNING *;`;
      context.logger.info(sql, args);
      await context.db.oneOrNone(sql, args).then(result => risultato = result);
      if (risultato)
        return true;
      return false;
    },


    updateStatoChat: async (parent, args, context, info) => {
      const { user } = context;
      const {idUtente} = user;
      let risultato;
      const updateStatoChatConst = updateStatoChatQ(args);

      context.logger.info('Faccio questo', updateStatoChatConst);
      await context.db.oneOrNone(updateStatoChatConst, { ...args, idUtente }).then(result => risultato = result);
      if (risultato)
        return true;
      return false;
    },
  },

};

import { PagamentoDAO } from '../../dao/pagamento/PagamentoDAO';

export default {
  Query: {
    pagamentoPK: async (parent, args, context, info) => {

      const sql = `
        SELECT
          id_interno_transazione,
          js_dati_fatturazione,
          js_dati_pagamento,
          ts_creazione
        FROM ${context.tabelle.pagamento}
        WHERE id_interno_transazione = $[id_interno_transazione]
      `;
      context.logger.info(sql, args);

      return await context.db.oneOrNone(sql, args);
    },
    latestSuccessfullPayment: async (parent, args, context) => {
      const { user: { idUtente: userId } } = context;
      const pagamentoDAO = new PagamentoDAO(context.db);

      return pagamentoDAO.selectLatestSuccessfullPayment(userId);
    },
  },
  Pagamento: {
    storiaStati: async (parent, args, context, info) => {

      const sql = `
        SELECT
          id_interno_trans_pag,
          ts_variazione_stato,
          cd_stato_pagamento,
          id_utente
        FROM ${context.tabelle.pagamento_stt}
        WHERE id_interno_trans_pag = $[id_interno_transazione]
      `;
      context.logger.info(sql, parent);

      return await context.db.oneOrNone(sql, parent);
    },
  },

  Mutation: {
    storePayment: async (parent, args, context, info) => {

      const sql = `
        INSERT INTO ${context.tabelle.pagamento} (
          id_interno_transazione,
          js_dati_fatturazione,
          js_dati_pagamento,
          ts_creazione
        )
        VALUES (
          nextval('${context.sequence.seq_pagamento}'),
          $[jsDatiFatturazione],
          $[jsDatiPagamento],
          localtimestamp
        )
        RETURNING *
      `;
      context.logger.info(sql, args);

      return await context.db.one(sql, args.input);
    },
    storeSttPayment: async(parent, args, context) => {
      const sql = `
        INSERT INTO ${context.tabelle.pagamento_stt} (
          id_interno_trans_pag,
          ts_variazione_stato,
          cd_stato_pagamento,
          id_utente
        )
        VALUES (
          $[idInternoTransazionePagamento],
          localtimestamp,
          $[cdStatoPagamento],
          $[idUtente],
        )
        RETURNING *
      `;
      context.logger.info(sql, args);

      return await context.db.one(sql, args.input);
    },
    updateStatoPagamento: async (parent, args, context, info) => {
      let sql, updateRisultato, pagamento;

      await context.db.tx('updatePagamentoTx', async t => {
        await t.batch([
          sql = `
            UPDATE ${context.tabelle.pagamento_stt}
            SET
              ts_variazione_stato= localtimestamp,
              cd_stato_pagamento=$[cdStatoPagamento]
            WHERE 
              id_interno_trans_pag = $[idPagamento] AND
              id_utente=$[idUtente] RETURNING * 
          `,
          context.logger.info(sql, args),
          await t.one(sql, args).then(contenuto => 
            updateRisultato=contenuto
          )
        ]);

        await t.batch([
          sql = `
            SELECT
              id_interno_transazione,
              js_dati_fatturazione,
              js_dati_pagamento,
              ts_creazione
            FROM ${context.tabelle.pagamento}
            WHERE id_interno_transazione = ${updateRisultato.id_interno_trans_pag}
          `,
          context.logger.info(sql, args),

          await t.one(sql, args).then( contenuto => 
            pagamento=contenuto
          )
        ]);
      });

      pagamento.storiaStati = updateRisultato;
      return pagamento;
    },
    updateDatiFatturazione:async (parent, args, context, info) => {
      let update;  
      let datiFatturazione = JSON.stringify(args.datiFatturazione);

      const sql = `
        UPDATE ${context.tabelle.pagamento}
        SET js_dati_fatturazione = '${datiFatturazione}'
        WHERE id_interno_transazione = $[idPagamento] 
        RETURNING *;
      `;
      context.logger.info(sql, args);

      await context.db.oneOrNone(sql, args).then(result => update = result);
      if(update)
        return true;
      return false;
    },
    updateDatiPagamento: async (parent, args, context, info) => {
      let update;  
      let datiPagamento = JSON.stringify(args.datiPagamento);

      const sql = `
        UPDATE ${context.tabelle.pagamento}
        SET js_dati_pagamento = '${datiPagamento}'
        WHERE id_interno_transazione = $[idPagamento] 
        RETURNING *;
      `;
      context.logger.info(sql, args);

      await context.db.oneOrNone(sql, args).then(result => update = result);
      if(update)
        return true;
      return false;
    },
  }
};

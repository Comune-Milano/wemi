/** @format */

export default {
  Query: {
    entePK: async (parent, args, context, info) => {
      const sql = `
        select  id_ente,
                id_partita_iva_ente,
                nm_ente,
                nm_ente_completo,
                pg_versione,
                dt_inizio_val,
                dt_fine_val,
                ts_creazione
        from    ${context.tabelle.ente}
        where   id_ente = $[id_ente];
        `;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, args);
    },

    enteAll: async (parent, args, context, info) => {
      const sql = `
        select  id_ente,
                id_partita_iva_ente,
                nm_ente,
                nm_ente_completo,
                pg_versione,
                dt_inizio_val,
                dt_fine_val,
                ts_creazione
        from    ${context.tabelle.ente};
        `;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    enteDatiPK: async (parent, args, context, info) => {
      const sql = `

        SELECT  id_ente_rif,
            tl_descrizione_ente,
            id_img_logo,
            js_referente,
            js_primo_contatto,
            tx_note_primo_contatto AS note_per_cittadino,
            js_altre_info,
            js_note_adminwemi,
            ts_creazione
        FROM    ${context.tabelle.datiPropriEnte}
        where   id_ente_rif = $[id_ente_rif];
        `;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, args);
    },

    StatoGestEnte: async (parent, args, context, info) => {
      const sql = `
        SELECT  
                e1.id_ente,
                id_partita_iva_ente,
                nm_ente,
                nm_ente_completo,
                pg_versione,
                ptx_email,
                u.id_utente,
                ts_variazione_stato,
                cd_stato_ente,
                CASE cd_stato_ente
                  when '1' then 'Bozza preliminare' 
                  when '2' then 'Accreditato'
                  when '4' then 'Disattivato'
                  when '21' then 'In compilazione' 
                  when '22' then 'Compilata'
                  when '31' then 'Validata'
                  when '30' then 'Da correggere'

                   ELSE cd_stato_ente::varchar
                   end AS cd_stato_ente_desc
                
        FROM    ${context.tabelle.ente} e1
        LEFT OUTER JOIN ${context.tabelle.ente_stt} e2
          ON e2.id_ente = e1.id_ente AND
             e2.ts_variazione_stato = (select max(ts_variazione_stato)
                                      from ${context.tabelle.ente_stt} ex where ex.id_ente = e1.id_ente)          
        LEFT OUTER JOIN ${context.tabelle.utente} u
                  ON e2.id_utente=u.id_utente
        WHERE   (cd_stato_ente=$[cd_stato_ente] OR $[cd_stato_ente] is null OR $[cd_stato_ente]='')
        ORDER BY
                e1.id_ente ASC,
                ts_variazione_stato DESC;`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    StatoGestEntePK: async (parent, args, context, info) => {
      const sql = `
        SELECT  
                e1.id_ente,
                id_partita_iva_ente,
                nm_ente,
                nm_ente_completo,
                ptx_email,
                cd_stato_ente,
                u.id_utente,
                ts_variazione_stato
        FROM    ${context.tabelle.ente} e1
        LEFT OUTER JOIN ${context.tabelle.ente_stt} e2
          ON e2.id_ente = e1.id_ente AND
             e2.ts_variazione_stato = (select max(ts_variazione_stato)
                                      from ${context.tabelle.ente_stt} ex where ex.id_ente = e1.id_ente)          
        LEFT OUTER JOIN ${context.tabelle.utente} u
          ON e2.id_utente=u.id_utente
        WHERE  e1.id_ente = $[id_ente];`;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, args);
    },

  },

  Mutation: {
    StatoGestEnteUpdPK: async (parent, args, context, info) => {
      // verificata non toccare
      const sql = `
      INSERT INTO ${context.tabelle.ente_stt} (
        id_ente,
        ts_variazione_stato,
        cd_stato_ente,
        id_utente)
        VALUES (
          $[id_ente], 
          localtimestamp, 
          $[cd_stato_ente],
          $[id_utente]
        )
        `;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, args.input);
    },

    enteAddTx: async (parent, args, context, info) => {
      let rs = {}, sql;

      await context.db.tx('txInsert', async t => {

        sql = `
        INSERT INTO ${context.tabelle.utente} (
          id_utente, cd_profilo_utente,
          fg_accettazione_privacy_wemi,
          ptx_codice_fiscale, ptx_username, ptx_codana,
          ty_operatore_ente, fg_lavoratore,
          js_anagrafica_residenza,
          ts_ultima_modifica, ts_creazione)
          VALUES (
          nextVal('wemi2.seq_utente'), 'A',
          null,
          null, null, null,
          null, null,
          null, $[ptx_email],
          null,
          null, localtimestamp
        )
        returning *`
        context.logger.info(sql, args);
        await t.one(sql, args.input)
        
        .then(async utente => {
            context.logger.info("Inserito utente", utente.id_utente)
            rs.id_utente = utente.id_utente;

            sql = `
            INSERT INTO ${context.tabelle.ente} (
              id_ente, id_partita_iva_ente,
              nm_ente, nm_ente_completo,
              id_utente_admin,
              pg_versione,
              dt_inizio_val, dt_fine_val,
              ts_creazione)
            VALUES (
              nextVal('wemi2.seq_ente'), $[id_partita_iva_ente],
              $[nm_ente], $[nm_ente_completo],
              ${utente.id_utente},
              1,
              current_date, null,
              localtimestamp)
              returning *`
            context.logger.info(sql, args);
            await t.one(sql, args.input)
            .then(async ente => {
              context.logger.info("Inserito ente", ente.id_ente)
              rs.id_ente = ente.id_ente;

              sql = `
              INSERT INTO ${context.tabelle.ente_stt} (
                id_ente, ts_variazione_stato,
                cd_stato_ente, cd_stato_dati_propri,
                id_utente)
                VALUES (
                  ${ente.id_ente}, localtimestamp,
                  2, null,
                  $[id_utente])
              `
              context.logger.info(sql, args);
              await t.none(sql, args.input)
            });
          })
      });

    context.logger.info("Sto tornando", rs);
    return rs;
    },
  }

};

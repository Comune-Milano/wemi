export default {
  Query: {

    contenutoAll: async (parent, args, context, info) => {
      const sql = `
          SELECT  
                id_contenuto,
                ty_contenuto,
                id_contenuto_rif,
                ty_sottotipo_contenuto,
                nr_ordine_visualizzazione,
                pg_versione,
                tl_testo_1,
                tl_testo_2,
                tl_testo_3,
                tl_testo_4,
                tl_testo_5,
                ln_link_1,
                ln_link_2,
                id_media1,
                id_media2,
                id_media3,
                dt_inizio_val,
                dt_fine_val,
                js_dati_contenuto,
                ts_creazione
          FROM    ${context.tabelle.contenuto}
          ORDER BY id_contenuto;
          `;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    contenutoPK: async (parent, args, context, info) => {
      const sql = `
        SELECT  
                id_contenuto,
                ty_contenuto,
                id_contenuto_rif,
                ty_sottotipo_contenuto,
                nr_ordine_visualizzazione,
                pg_versione,
                tl_testo_1,
                tl_testo_2,
                tl_testo_3,
                tl_testo_4,
                tl_testo_5,
                ln_link_1,
                ln_link_2,
                id_media1,
                id_media2,
                id_media3,
                dt_inizio_val,
                dt_fine_val,
                js_dati_contenuto,
                ts_creazione
        FROM    ${context.tabelle.contenuto}
        WHERE   id_contenuto = $[id_contenuto]`;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, args);
    },

    contenutoByTy: async (parent, args, context, info) => {
      const sql = `
        SELECT  
                id_contenuto,
                ty_contenuto,
                id_contenuto_rif,
                ty_sottotipo_contenuto,
                nr_ordine_visualizzazione,
                pg_versione,
                tl_testo_1,
                tl_testo_2,
                tl_testo_3,
                tl_testo_4,
                tl_testo_5,
                ln_link_1,
                ln_link_2,
                id_media1,
                id_media2,
                id_media3,
                dt_inizio_val,
                dt_fine_val,
                js_dati_contenuto,
                ts_creazione
        FROM    ${context.tabelle.contenuto}
        WHERE   ty_contenuto = $[ty_contenuto]
        ORDER BY nr_ordine_visualizzazione DESC`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    contenutoByTyS: async (parent, args, context, info) => {
      args.language = args.language || 'it';
      const sql = `
      SELECT
        id_contenuto AS "value",
        tl_testo_1,
        coalesce(tl_testo_1 ->> $[language], tl_testo_1 ->> 'it') AS "textValue"
      FROM    ${context.tabelle.contenuto}
      WHERE   ty_contenuto = $[ty_contenuto]`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    contenutoTy: async (parent, args, context, info) => {
      args.cd_stato_contenuto = args.cd_stato_contenuto || null;
      const sql = `
      SELECT
              c.id_contenuto,
              nr_ordine_visualizzazione,
              pg_versione,
              tl_testo_1,
              cd_stato_contenuto,
              CASE cd_stato_contenuto 
                 when 1 then 'Draft' 
                 when 2 then 'Pubblicato'
                 when 3 then 'Disattivato'
                   ELSE cd_stato_contenuto::varchar
                   END AS cd_stato_contenuto_desc      
        FROM ${context.tabelle.contenuto} c
        LEFT OUTER JOIN ${context.tabelle.contenuto_stt} cstt
            ON cstt.id_contenuto = c.id_contenuto
              AND cstt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                                             FROM ${context.tabelle.contenuto_stt}
                                             WHERE id_contenuto = c.id_contenuto)
        WHERE   ty_contenuto=$[ty_contenuto] 
            AND (cd_stato_contenuto=$[cd_stato_contenuto] OR $[cd_stato_contenuto] is null)
        ORDER BY c.id_contenuto;  
      `;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    contenutoMediaPK: async (parent, args, context, info) => {
      const sql = `
          SELECT
                c.id_contenuto,
                ty_contenuto,
                id_contenuto_rif,
                ty_sottotipo_contenuto,
                nr_ordine_visualizzazione,
                pg_versione,
                tl_testo_1,
                tl_testo_2,
                tl_testo_3,
                tl_testo_4,
                tl_testo_5,
                ln_link_1,
                ln_link_2,
                id_media1,
                id_media2,
                id_media3,
                dt_inizio_val,
                dt_fine_val,
                js_dati_contenuto,
                c.ts_creazione,

                id_contenuto_primario,
                id_contenuto_associato,
                nm_relazione,
                cass.ts_creazione AS "ts_creazioneASS",

                -- cstt.id_contenuto AS "id_contenutoSTT",
                ts_variazione_stato,
                cd_stato_contenuto,
                id_utente,

                -- m1.id_media AS "id_media1",
                m1.ty_mime_type_media AS "ty_mime_type_media1",
                m1.nm_nome_media AS "nm_nome_media1",
                convert_from(m1.oj_media, 'UTF-8') AS "oj_media1",
                -- m2.id_media AS "id_media2",
                m2.ty_mime_type_media AS "ty_mime_type_media2",
                m2.nm_nome_media AS "nm_nome_media2",
                convert_from(m2.oj_media, 'UTF-8') AS "oj_media2",
                -- m3.id_media AS "id_media3",
                m3.ty_mime_type_media AS "ty_mime_type_media3",
                m3.nm_nome_media AS "nm_nome_media3",
                convert_from(m3.oj_media, 'UTF-8') as "oj_media3"
          
          FROM ${context.tabelle.contenuto} c
          
           LEFT OUTER JOIN ${context.tabelle.contenuto_associato} cass
            ON (c.id_contenuto = id_contenuto_primario)
            
           LEFT OUTER JOIN ${context.tabelle.contenuto_stt} cstt
            ON (c.id_contenuto = cstt.id_contenuto)

           LEFT OUTER JOIN ${context.tabelle.media} m1
            ON (c.id_media1 = m1.id_media)

           LEFT OUTER JOIN ${context.tabelle.media} m2
            ON (c.id_media2 = m2.id_media)

           LEFT OUTER JOIN ${context.tabelle.media} m3
            ON (c.id_media3 = m3.id_media)

          WHERE c.id_contenuto=$[id_contenuto];
          `;
      context.logger.info(sql, args);
      let r = await context.db.oneOrNone(sql, args);
      context.logger.info("PSQL", r)
      return r
    },

  },

  Mutation: {
    statoContenutoUPD: async (parent, args, context, info) => {
      const sql = `
          INSERT INTO  ${context.tabelle.contenuto_stt} (
            id_contenuto, 
            ts_variazione_stato, 
            cd_stato_contenuto, 
            id_utente)
          VALUES (
            $[id_contenuto],
            localtimestamp,
            $[cd_stato_contenuto],
            $[id_utente])
         `;
      context.logger.info(sql, args);
      return await context.db.none(sql, args.input);
    },

    contenutoMediaADD: async (parent, args, context, info) => {
      context.logger.info("RESOLVER", args);
      // let rs;
      let idContenuto;
      let idMedia1 = args.input.id_media1;
      let idMedia2 = args.input.id_media2;
      let idMedia3 = args.input.id_media3;


      await context.db.tx('txInsert', async t => {

        if (args.input.oj_media1) {
          const sql = `
              INSERT INTO ${context.tabelle.media} (
                         id_media,
                         ty_mime_type_media,
                         nm_nome_media,
                         oj_media,
                         ts_creazione)
              VALUES (
                         nextval('wemi2.seq_media'), 
                         $[ty_mime_type_media1], 
                         $[nm_nome_media1],
                         $[oj_media1],
                         localtimestamp)
              returning *
              `
          context.logger.info(sql, args);
          await t.one(sql, args.input)

            .then(data => {
              context.logger.info("Inserito 1", data.id_media)
              idMedia1 = data.id_media
            })
        }

        if (args.input.oj_media2) {
          const sql = `
            INSERT INTO ${context.tabelle.media} (
                       id_media,
                       ty_mime_type_media,
                       nm_nome_media,
                       oj_media,
                       ts_creazione)
            VALUES (
                       nextval('wemi2.seq_media'), 
                       $[ty_mime_type_media2], 
                       $[nm_nome_media2],
                       $[oj_media2],
                       localtimestamp)
            returning *
            `
          context.logger.info(sql, args);
          await t.one(sql, args.input)

            .then(data => {
              context.logger.info("Inserito 2", data.id_media)
              idMedia2 = data.id_media
            })
        }

        if (args.input.oj_media3) {
          const sql = `
            INSERT INTO ${context.tabelle.media} (
                       id_media,
                       ty_mime_type_media,
                       nm_nome_media,
                       oj_media,
                       ts_creazione)
            VALUES (
                       nextval('wemi2.seq_media'), 
                       $[ty_mime_type_media3], 
                       $[nm_nome_media3],
                       $[oj_media3],
                       localtimestamp)
            returning *
            `
          context.logger.info(sql, args);
          await t.one(sql, args.input)

            .then(data => {
              context.logger.info("Inserito 3", data.id_media)
              idMedia3 = data.id_media
            })
        }

        await t.one(`SELECT nextval('wemi2.seq_contenuto') as id_contenuto;`)
          .then(async seq => {
            context.logger.info("Inserimento contenuto:", seq)
            idContenuto = seq.id_contenuto;

            await t.one(`
                        INSERT INTO ${context.tabelle.contenuto} (
                                    id_contenuto,
                                    ty_contenuto,
                                    id_contenuto_rif,
                                    ty_sottotipo_contenuto,
                                    nr_ordine_visualizzazione,
                                    pg_versione,
                                    tl_testo_1,
                                    tl_testo_2,
                                    tl_testo_3,
                                    tl_testo_4,
                                    tl_testo_5,
                                    ln_link_1,
                                    ln_link_2,
                                    id_media1,
                                    id_media2,
                                    id_media3,
                                    dt_inizio_val,
                                    dt_fine_val,
                                    js_dati_contenuto,
                                    ts_creazione)
                        VALUES (
                                  ${idContenuto},
                                  $[ty_contenuto], 
                                  ${idContenuto},
                                  $[ty_sottotipo_contenuto],
                                  $[nr_ordine_visualizzazione],
                                  1,
                                  $[tl_testo_1],
                                  $[tl_testo_2],
                                  $[tl_testo_3],
                                  $[tl_testo_4],
                                  $[tl_testo_5],
                                  $[ln_link_1],
                                  $[ln_link_2],
                                  $[idMedia1],
                                  $[idMedia2],
                                  $[idMedia3],
                                  localtimestamp,
                                  $[dt_fine_val],
                                  $[js_dati_contenuto],
                                  localtimestamp)
                        returning * 
                        `, { ...args.input, idMedia1, idMedia2, idMedia3 }
            )
          })

          .then(async () => {
            context.logger.info("<< Inserimento contenuto storico >>")

            await t.one(`
                        INSERT INTO ${context.tabelle.contenuto_stt} (
                                    id_contenuto,
                                    ts_variazione_stato,
                                    cd_stato_contenuto,
                                    id_utente)
                        VALUES (
                                  ${idContenuto},
                                  localtimestamp,
                                  $[cd_stato_contenuto],
                                  $[id_utente])
                        returning * 
                        `, { ...args.input, idContenuto }
            )
          })

        if (args.input.id_contenuto_associato) {
          const sql = `
              INSERT INTO ${context.tabelle.contenuto_associato} (
                id_contenuto_primario,
                id_contenuto_associato,
                nm_relazione,
                ts_creazione)
              VALUES (
                ${idContenuto}, 
                $[id_contenuto_associato], 
                $[nm_relazione],
                localtimestamp)
              returning *
              `
          context.logger.info(sql, args);
          await t.one(sql, { ...args.input, idContenuto })
        }

        context.logger.info("Fine TX");
      })
      return true;
    },
  }
};

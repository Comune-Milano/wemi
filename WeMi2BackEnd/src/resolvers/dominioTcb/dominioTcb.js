import { 
  estraiStatoOccupazionaleQuery, 
  estraiCorsiTataQuery, 
  estraiCorsiBadanteQuery, 
  estraiLingueParlateQuery, 
  estraiInteressiQuery, 
  estraiCarattereLavoratoreQuery, 
  estraiAltezzaQuery, 
  estraiCorporaturaQuery,
  estraiFasciaEtaQuery,
  estraiPatologieGenericheQuery,
  estraiPatologieQuery
 } from "./queries";

/** @format */

export default {
  Query: {
    dominioTcbAll: async (parent, args, context, info) => {
      const sql = `
            select  cd_dominio_tcb,
                    tl_valore_testuale,
                    ty_dominio_tcb,
                    pg_visualizzazione
            from    ${context.tabelle.dominio_tcb}`;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    dominioTcbByTipoTcb: async (parent, args, context, info) => {
      const sql = `
        select  cd_dominio_tcb as value,
                tl_valore_testuale ->> 'it' as "textValue",
                ty_dominio_tcb,
                pg_visualizzazione
        from    ${context.tabelle.dominio_tcb}
        where   ty_dominio_tcb = $[ty_dominio_tcb]
        ORDER BY pg_visualizzazione ASC`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    EstraiEtaLavoratore: async (parent, args, context, info) => {
      const sql = `
        SELECT ty_dominio_tcb as "tyDominioTcb", 
        cd_dominio_tcb as "cdDominioTcb", 
        pg_visualizzazione as "pgVisualizzazione", 
        tl_valore_testuale as "tlValoreTestuale", 
        nr_valore_min_rif as "minRif", 
        nr_valore_max_rif as "maxRif"
        FROM  ${context.tabelle.dominio_tcb}
        WHERE ty_dominio_tcb = 29 and fg_domanda = '1'
        ORDER BY pg_visualizzazione ASC
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiStatoOccupazionale: async (parent, args, context, info) => {
      return await context.db.any(estraiStatoOccupazionaleQuery, args);
    },

    EstraiEsperienzePregresse: async (parent, args, context, info) => {
      const sql = `
  SELECT ty_dominio_tcb as "tyDominioTcb", 
  cd_dominio_tcb as "cdDominioTcb", 
  pg_visualizzazione as "pgVisualizzazione", 
  tl_valore_testuale as "tlValoreTestuale", 
  nr_valore_min_rif as "minRif", 
  nr_valore_max_rif as "maxRif"
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 20
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiFasciaEtaCandidatura: async (parent, args, context, info) => {
      const sql = `
  SELECT ty_dominio_tcb as "tyDominioTcb", 
  cd_dominio_tcb as "cdDominioTcb", 
  pg_visualizzazione as "pgVisualizzazione", 
  tl_valore_testuale as "tlValoreTestuale", 
  nr_valore_min_rif as "minRif", 
  nr_valore_max_rif as "maxRif"
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 29
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiSessoBeneficiario: async (parent, args, context, info) => {
      const sql = `
  SELECT ty_dominio_tcb as "tyDominioTcb", 
  cd_dominio_tcb as "cdDominioTcb", 
  pg_visualizzazione as "pgVisualizzazione", 
  tl_valore_testuale as "tlValoreTestuale", 
  nr_valore_min_rif as "minRif", 
  nr_valore_max_rif as "maxRif"
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 9 and fg_domanda = '1'
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiFasciaEta: async (parent, args, context, info) => {
      return await context.db.any(estraiFasciaEtaQuery, args);
    },

    EstraiAltezza: async (parent, args, context, info) => {
      return await context.db.any(estraiAltezzaQuery, args);
    },

    EstraiCorporatura: async (parent, args, context, info) => {
      return await context.db.any(estraiCorporaturaQuery, args);
    },

    EstraiLingueParlate: async (parent, args, context, info) => {
      return await context.db.any(estraiLingueParlateQuery, args);
    },
    EstraiStatoNascita: async (parent, args, context, info) => {
      const sql = `
        SELECT ty_dominio_tcb as "tyDominioTcb", 
          cd_dominio_tcb as "cdDominioTcb", 
          pg_visualizzazione as "pgVisualizzazione", 
          tl_valore_testuale as "tlValoreTestuale", 
          nr_valore_min_rif as "minRif", 
          nr_valore_max_rif as "maxRif"
        FROM  ${context.tabelle.dominio_tcb}
        WHERE ty_dominio_tcb = 25
        ORDER BY pg_visualizzazione
      `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },


    EstraiPatologie: async (parent, args, context, info) => {
      return await context.db.any(estraiPatologieQuery, args);
    },

    EstraiPatologieBambino: async (parent, args, context, info) => {
      const sql = `
  SELECT ty_dominio_tcb as "tyDominioTcb", 
  cd_dominio_tcb as "cdDominioTcb", 
  pg_visualizzazione as "pgVisualizzazione", 
  tl_valore_testuale as "tlValoreTestuale", 
  nr_valore_min_rif as "minRif", 
  nr_valore_max_rif as "maxRif"
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 34
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },


    EstraiLivelloDeambulazione: async (parent, args, context, info) => {
      const sql = `
  SELECT ty_dominio_tcb as "tyDominioTcb", 
  cd_dominio_tcb as "cdDominioTcb", 
  pg_visualizzazione as "pgVisualizzazione", 
  tl_valore_testuale as "tlValoreTestuale", 
  nr_valore_min_rif as "minRif", 
  nr_valore_max_rif as "maxRif"
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 18
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },


    EstraiRelazioniConBeneficiario: async (parent, args, context, info) => {
      const sql = `
  SELECT ty_dominio_tcb as "tyDominioTcb", 
  cd_dominio_tcb as "cdDominioTcb", 
  pg_visualizzazione as "pgVisualizzazione", 
  tl_valore_testuale as "tlValoreTestuale", 
  nr_valore_min_rif as "minRif", 
  nr_valore_max_rif as "maxRif"
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 26
  `;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    },

    EstraiFasceStipendioConvivente: async (parent, args, context, info) => {
      const sql = `
  SELECT cd_dominio_tcb, 
  tl_valore_testuale
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 3
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiFasceStipendioNonConvivente: async (parent, args, context, info) => {
      const sql = `
  SELECT cd_dominio_tcb, 
  tl_valore_testuale
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 4
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiFasceStipendioConvivenzaRidotta: async (parent, args, context, info) => {
      const sql = `
  SELECT cd_dominio_tcb, 
  tl_valore_testuale
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 5
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiFasceStipendioWeekend: async (parent, args, context, info) => {
      const sql = `
  SELECT cd_dominio_tcb, 
  tl_valore_testuale
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 31
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiFasceStipendioAssistenzaNotturna: async (parent, args, context, info) => {
      const sql = `
  SELECT cd_dominio_tcb, 
  tl_valore_testuale
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 11
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiFasceStipendioPresenzaNotturna: async (parent, args, context, info) => {
      const sql = `
  SELECT cd_dominio_tcb, 
  tl_valore_testuale
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 12
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },
    EstraiGiorniSettimana: async (parent, args, context, info) => {
      const sql = `
  SELECT cd_dominio_tcb, 
  tl_valore_testuale
  FROM  ${context.tabelle.dominio_tcb} as dtcb
  WHERE dtcb.ty_dominio_tcb = 15 and dtcb.fg_domanda = '1'
  order by dtcb.pg_visualizzazione asc
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },
    EstraiSistemazione: async (parent, args, context, info) => {
      const sql = `
  SELECT cd_dominio_tcb, 
  tl_valore_testuale
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 30 and fg_domanda = '1'
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },
    EstraiTipologiaContratto: async (parent, args, context, info) => {
      const sql = `
        SELECT cd_dominio_tcb, 
        tl_valore_testuale
        FROM  ${context.tabelle.dominio_tcb}
        WHERE ty_dominio_tcb = 32 and fg_domanda = '1'
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },
    EstraiSpaziPrevisti: async (parent, args, context, info) => {
      const sql = `
  SELECT cd_dominio_tcb,
  tl_valore_testuale
  FROM  ${context.tabelle.dominio_tcb}
  WHERE ty_dominio_tcb = 30
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },
    EstraiMaxOre: async (parent, args, context, info) => {
      const sql = `
      SELECT * 
      FROM ${context.tabelle.dominio_tcb}
      WHERE ty_dominio_tcb = 19
  `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },
    EstraiFasciaOrariaSettimanale: async (parent, args, context, info) => {
      let sql = `
  select cd_dominio_tcb as "idOrario", 
  tl_valore_testuale as "txOrario"
  from ${context.tabelle.dominio_tcb}
  where ty_dominio_tcb = 47 and $[nrOreRichieste] >= nr_valore_min_rif AND $[nrOreRichieste] < nr_valore_max_rif 
  `;
      context.logger.info(sql, args);
      let result = await context.db.oneOrNone(sql, args);
      if (result === null) {
        sql = `
        select  cd_dominio_tcb as "idOrario", 
        tl_valore_testuale as "txOrario"
        from ${context.tabelle.dominio_tcb}
        where ty_dominio_tcb=47 and $[nrOreRichieste] >= nr_valore_max_rif and nr_valore_max_rif =
        (SELECT MAX(nr_valore_max_rif)
                 FROM ${context.tabelle.dominio_tcb}
                 WHERE ty_dominio_tcb = 47)
          `;
        context.logger.info(sql, args);
        result = await context.db.oneOrNone(sql, args);
      }
      return result;

    },


    EstraiSuperficieCasa: async (parent, args, context, info) => {
      const sql = `
        SELECT ty_dominio_tcb as "tyDominioTcb",
          cd_dominio_tcb as "cdDominioTcb",
          pg_visualizzazione as "pgVisualizzazione",
          tl_valore_testuale as "tlValoreTestuale",
          nr_valore_min_rif as "minRif",
          nr_valore_max_rif as "maxRif"
        FROM  ${ context.tabelle.dominio_tcb}
        WHERE ty_dominio_tcb = 13 and fg_domanda = '1'
        ORDER BY pg_visualizzazione ASC
          `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiPatologieGeneriche: async (parent, args, context, info) => {
      return await context.db.any(estraiPatologieGenericheQuery, args);
    },

    EstraiNumeroStanze: async (parent, args, context, info) => {
      const sql = `
        SELECT ty_dominio_tcb as "tyDominioTcb",
          cd_dominio_tcb as "cdDominioTcb",
          pg_visualizzazione as "pgVisualizzazione",
          tl_valore_testuale as "tlValoreTestuale",
          nr_valore_min_rif as "minRif",
          nr_valore_max_rif as "maxRif"
        FROM  ${ context.tabelle.dominio_tcb}
        WHERE ty_dominio_tcb = 27 and fg_domanda = '1'
          `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiCorsiTata: async (parent, args, context, info) => {
      return await context.db.any(estraiCorsiTataQuery, args);
    },
    EstraiCorsiBadante: async (parent, args, context, info) => {
      return await context.db.any(estraiCorsiBadanteQuery, args);
    },
    EstraiInteressi: async (parent, args, context, info) => {
      return await context.db.any(estraiInteressiQuery, args);
    },
    EstraiTitoloStudioLavoratore: async (parent, args, context, info) => {
      const sql = `
        SELECT ty_dominio_tcb as "tyDominioTcb",
          cd_dominio_tcb as "cdDominioTcb",
          pg_visualizzazione as "pgVisualizzazione",
          tl_valore_testuale as "tlValoreTestuale",
          nr_valore_min_rif as "minRif",
          nr_valore_max_rif as "maxRif"
        FROM  ${ context.tabelle.dominio_tcb}
        WHERE ty_dominio_tcb = 21 and fg_domanda = '1'
        ORDER by pg_visualizzazione;
          `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiLinguaItaliana: async (parent, args, context, info) => {
      const sql = `
        SELECT ty_dominio_tcb as "tyDominioTcb",
          cd_dominio_tcb as "cdDominioTcb",
          pg_visualizzazione as "pgVisualizzazione",
          tl_valore_testuale as "tlValoreTestuale",
          nr_valore_min_rif as "minRif",
          nr_valore_max_rif as "maxRif"
        FROM  ${ context.tabelle.dominio_tcb}
        WHERE ty_dominio_tcb = 34
          `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiCarattereLavoratore: async (parent, args, context, info) => {
      return await context.db.any(estraiCarattereLavoratoreQuery, args);
    },

    EstraiNumeroBagni: async (parent, args, context, info) => {
      const sql = `
        SELECT ty_dominio_tcb as "tyDominioTcb",
          cd_dominio_tcb as "cdDominioTcb",
          pg_visualizzazione as "pgVisualizzazione",
          tl_valore_testuale as "tlValoreTestuale",
          nr_valore_min_rif as "minRif",
          nr_valore_max_rif as "maxRif"
        FROM  ${ context.tabelle.dominio_tcb}
        WHERE ty_dominio_tcb = 28 and fg_domanda = '1'
          `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    EstraiCaratteristicheAbitazione: async (parent, args, context, info) => {
      const sql = `
        SELECT ty_dominio_tcb as "tyDominioTcb",
          cd_dominio_tcb as "cdDominioTcb",
          pg_visualizzazione as "pgVisualizzazione",
          tl_valore_testuale as "tlValoreTestuale",
          nr_valore_min_rif as "minRif",
          nr_valore_max_rif as "maxRif"
        FROM  ${ context.tabelle.dominio_tcb}
        WHERE ty_dominio_tcb = 33 and fg_domanda = '1'
        ORDER BY pg_visualizzazione
          `;
      context.logger.info(sql);
      return await context.db.any(sql, args);
    },

    TipologiaOrarioByServizioTCB: async (parent, args, context, info) => {
      const sql = `
      SELECT DISTINCT ON(a.cd_dominio_tcb)
        a.cd_dominio_tcb,
        a.tl_valore_testuale
      FROM wemi2.dominio_tcb a
        inner join wemi2.minimo_contrattuale_tcb b on b.cd_tipo_orario_lavoro = a.cd_dominio_tcb
        inner join wemi2.d_livello_contrattuale c on c.cd_livello_contrattuale = b.cd_livello_contrattuale
      WHERE c.id_servizio_riferimento = $[idServizio] and a.ty_dominio_tcb=19 and fg_domanda = '1';
      `;
      return await context.db.any(sql, args);
    },

    ModalitaAssunzioneByServizioTCB: async (parent, args, context, info) => {
      const sql = `
      SELECT DISTINCT ON(a.cd_dominio_tcb)
        a.cd_dominio_tcb,
        a.tl_valore_testuale
      FROM wemi2.dominio_tcb a
        inner join wemi2.minimo_contrattuale_tcb b on b.cd_tipo_orario_lavoro = a.cd_dominio_tcb
        inner join wemi2.d_livello_contrattuale c on c.cd_livello_contrattuale = b.cd_livello_contrattuale
      WHERE c.id_servizio_riferimento = $[idServizio] and a.ty_dominio_tcb=53 and fg_domanda = '1';
      `;
      return await context.db.any(sql, args);
    },

    tipoOrarioLavoroAll: async (parent, args, context, info) => {
      const sql = `
        select  cd_dominio_tcb,
          tl_valore_testuale,
          ty_dominio_tcb,
          pg_visualizzazione
        from    ${ context.tabelle.dominio_tcb}
        where ty_dominio_tcb = 19`;
      context.logger.info(sql, args);
      return await context.db.many(sql, args);
    },

    tipoServizioTcbAll: async (parent, args, context, info) => {
      const sql = `
        select  cd_dominio_tcb,
          tl_valore_testuale,
          ty_dominio_tcb,
          pg_visualizzazione
        from    ${ context.tabelle.dominio_tcb}
        where ty_dominio_tcb = 46`;
      context.logger.info(sql, args);
      return await context.db.many(sql, args);
    },

  }
};

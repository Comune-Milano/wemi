export const estraiEsperienzeLavoratoreValidate = `
    SELECT
    val.id_richiesta_servizio_tcb,
    ent.id_servizio_erogato_ente,
    ent.tx_note_ente,
    val.cd_attributo,
    val.cd_val_attributo,
    val.tx_val,
    bas.dt_periodo_richiesto_dal::TIMESTAMP WITH TIME ZONE,
    bas.dt_periodo_richiesto_al::TIMESTAMP WITH TIME ZONE
    FROM wemi2.val_attributo_domanda as val
    LEFT JOIN wemi2.richiesta_servizio_ente as ent
    ON (val.id_richiesta_servizio_tcb = ent.id_richiesta_servizio_ente)
    LEFT JOIN wemi2.richiesta_servizio_base as bas ON (
    bas.id_richiesta_servizio_base = ent.id_richiesta_servizio_base
    )
    WHERE val.id_richiesta_servizio_tcb IN (
    SELECT id_richiesta 
    FROM wemi2.r_match_ric_lav as rmrl
    INNER JOIN wemi2.richiesta_servizio_ente_stt entstt ON 
      entstt.id_richiesta_servizio_ente = id_richiesta
    INNER JOIN wemi2.recensione_servizio_ente ON
      id_rich_serv_rec = id_richiesta
    WHERE rmrl.id_lavoratore = $[idUtenteLav] and entstt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
    FROM wemi2.richiesta_servizio_ente_stt
    WHERE id_richiesta_servizio_ente = rmrl.id_richiesta
    ) 
    and recensione_servizio_ente.pg_rich_serv_rec =  (
        SELECT MAX(pg_rich_serv_rec)
        FROM wemi2.recensione_servizio_ente
        WHERE id_rich_serv_rec = rmrl.id_richiesta
    )
    and CAST(rmrl.cd_stato_associazione AS Int) = 1
    and CAST(cd_stato_ric_serv_ente AS Int) = 12
    and CAST(cd_stato_rec as Int) = 3
);

`;
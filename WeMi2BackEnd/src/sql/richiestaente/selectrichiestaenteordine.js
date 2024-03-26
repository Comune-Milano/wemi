import tabelle from 'tabelle';

export const selectRichiestaEnteOrdine = `
    SELECT
        ente.nm_ente AS "nomeEnte",
        ente.nm_ente_completo AS "nomeEnteCompleto",
        ente.id_ente AS "idEnte",
        ric_ser_ente.id_richiesta_servizio_ente AS "idRichiestaServizioEnte",
        ric_ser_ente.id_richiesta_servizio_base AS "idRichiestaServizioBase",
        ric_ser_ente.id_servizio_erogato_ente AS "idServizioErogatoEnte",
        ric_ser_ente.im_costo_totale_calcolato AS "costoTotaleCalcolato",
        ric_ser_ente.im_costo_totale_ente AS "costoTotaleEnte",
        CASE 
          WHEN fg_altra_modalita_pagamento IS NULL OR fg_altra_modalita_pagamento = '0' THEN false
		  WHEN fg_altra_modalita_pagamento = '1' THEN true
	    END AS "altraModalitaPagamento",
        TO_CHAR(ric_ser_ente.dt_periodo_proposto_dal, 'DD/MM/YYYY') AS "periodoPropostoDal",
        TO_CHAR(ric_ser_ente.dt_periodo_proposto_al, 'DD/MM/YYYY') AS "periodoPropostoAl",
        ric_ser_ente.ts_scadenza_acquisto AS "scadenzaAcquisto",
        ric_ser_ente.tx_note_ente AS "noteEnte",
        ric_ser_ente.js_dati_lavoratore AS "jsonDatiLavoratore",
        ser_er_ente.tl_descrizione_serv_erog_ente AS "descrizioneServizioErogatoEnte",
        media.oj_media AS "logoEnte",
        contenuto.tl_testo_1 AS "nomeServizioEnte",
        ric_ser_base.js_dati_richiesta as "jsonDatiRichiesta"
    FROM ${tabelle.richiesta_servizio_ente} AS ric_ser_ente
    INNER JOIN ${tabelle.servizio_erogato_ente} AS ser_er_ente ON
        ser_er_ente.id_servizio_ente = ric_ser_ente.id_servizio_erogato_ente
    INNER JOIN ${tabelle.ente} AS ente ON
        ser_er_ente.id_ente_erogatore = ente.id_ente
    INNER JOIN ${tabelle.datiPropriEnte} AS dati_propri_ente ON
        dati_propri_ente.id_ente_rif = ente.id_ente
    INNER JOIN ${tabelle.media} AS media ON
        media.id_media = dati_propri_ente.id_img_logo 
    INNER JOIN ${tabelle.servizio} AS servizio ON
        servizio.id_servizio = ser_er_ente.id_servizio_riferimento
    INNER JOIN ${tabelle.contenuto} AS contenuto ON
        contenuto.id_contenuto = servizio.id_servizio
    INNER JOIN ${tabelle.richiesta_servizio_base} AS ric_ser_base ON
	    ric_ser_base.id_richiesta_servizio_base = ric_ser_ente.id_richiesta_servizio_base    
    WHERE ric_ser_ente.id_richiesta_servizio_ente = $[idRichiestaServizioEnte]
`;

export const selectRichiestaEnteOrdineStato = `
        select *
        from ${tabelle.richiesta_servizio_ente_stt} 
        WHERE ts_variazione_stato =  (
            select MAX(ric_ser_ente_stt.ts_variazione_stato)
            from ${tabelle.richiesta_servizio_ente_stt} ric_ser_ente_stt
            where ric_ser_ente_stt.id_richiesta_servizio_ente = $[idRichiestaServizioEnte]
            )
        AND id_richiesta_servizio_ente = $[idRichiestaServizioEnte]
        AND cd_stato_ric_serv_ente = '2'
`;

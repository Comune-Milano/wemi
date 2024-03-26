import tabelle from 'tabelle';

export const insertRichiestaBase = `
    INSERT INTO ${tabelle.richiesta_servizio_base} (
        id_richiesta_servizio_base,
        dt_periodo_richiesto_dal,
        dt_periodo_richiesto_al,
        id_utente_richiedente,
        js_dati_richiesta,
        dt_inizio_val,
        dt_fine_val,
        ty_richiesta,
        ts_creazione )
    VALUES (
        setval($[sequenceRichiestaBase], 
        (SELECT COALESCE( CAST( MAX(id_richiesta_servizio_base) AS INT ), 199999 ) + 1 FROM wemi2.${tabelle.richiesta_servizio_base})),
        $[dt_periodo_proposto_dal],
        $[dt_periodo_proposto_al],
        $[id_utente_richiedente], 
        $[js_dati_richiesta],
        $[dt_inizio_val],
        $[dt_fine_val],
        $[ty_richiesta],
        localtimestamp) returning *;
        `;
export const selectRichiestaTcbByIdRichiestaBase = `
SELECT
    contenuto.tl_testo_1 ::json->'it' as "nomeServizio",
    richiesta_ente.id_richiesta_servizio_ente as "idRichiestaTCB",
    richiesta_ente_stt.cd_stato_ric_serv_ente as "statoRichiestaTCB",
    richiesta_ente.im_costo_totale_ente as prezzo,
    utente.id_utente as "idLavoratore",
    utente.tx_nome_utente as "nomeLavoratore",
    utente.tx_cognome_utente as "cognomeLavoratore",
    servizio_erogato.id_servizio_riferimento as "idServizio",
    (SELECT 
        dt_val::timestamp with time zone 
    FROM wemi2.val_attributo_domanda
    WHERE id_richiesta_servizio_tcb = richiesta_ente.id_richiesta_servizio_ente
    and cd_attributo = 31
    ) as "dataInizio",
    (SELECT 
        dt_val::timestamp with time zone
    FROM wemi2.val_attributo_domanda
    WHERE id_richiesta_servizio_tcb = richiesta_ente.id_richiesta_servizio_ente
    and cd_attributo = 30
    ) as "dataFine",
    (SELECT 
        count(*)
    FROM wemi2.r_match_ric_lav 
    WHERE id_richiesta = richiesta_ente.id_richiesta_servizio_ente
    ) as "conteggioLavoratoriAssociati",
    convert_from(allegato.oj_allegato_ric, 'UTF-8') as curriculum
FROM wemi2.richiesta_servizio_ente richiesta_ente
INNER JOIN wemi2.richiesta_servizio_ente_stt richiesta_ente_stt on
    richiesta_ente.id_richiesta_servizio_ente = richiesta_ente_stt.id_richiesta_servizio_ente
INNER JOIN wemi2.servizio_erogato_ente servizio_erogato on
    richiesta_ente.id_servizio_erogato_ente = servizio_erogato.id_servizio_ente
INNER JOIN wemi2.contenuto contenuto on
    contenuto.id_contenuto = servizio_erogato.id_servizio_riferimento
LEFT JOIN wemi2.r_match_ric_lav matching
    on matching.id_richiesta = richiesta_ente.id_richiesta_servizio_ente and matching.cd_stato_associazione = '1'
LEFT JOIN wemi2.utente utente
    on utente.id_utente = matching.id_lavoratore 
LEFT JOIN wemi2.allegato_richiesta allegato 
    on allegato.id_richiesta=richiesta_ente.id_richiesta_servizio_ente 
    and allegato.id_lavoratore=utente.id_utente
WHERE id_richiesta_servizio_base = $[idRichiestaServizioBase] 
    AND richiesta_ente_stt.ts_variazione_stato = (
        SELECT MAX(a.ts_variazione_stato)
        FROM wemi2.richiesta_servizio_ente_stt a 
        WHERE a.id_richiesta_servizio_ente = richiesta_ente_stt.id_richiesta_servizio_ente
    )`;
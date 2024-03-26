import tabelle from 'tabelle';

export const selectServizioErogatoEnte004 = `
    SELECT
        see.id_servizio_ente,
        see.id_servizio_riferimento,
        see.pg_versione,
        see.ts_creazione,
        e.nm_ente,
        uT.ptx_username,
        c.tl_testo_1 ->> 'it' AS cat_accreditamento,
        co.tl_testo_1 ->> 'it' AS serv_offerto,
        stt.ts_variazione_stato,
        stt.cd_stato_dati_servizio_ente,
        stt.id_utente,
        d.tl_valore_testuale
    FROM  ${tabelle.servizio_erogato_ente} see
    LEFT OUTER JOIN ${tabelle.servizio_erogato_ente_stt} stt
    ON see.id_servizio_ente=stt.id_servizio_ente
    AND stt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                                FROM ${tabelle.servizio_erogato_ente_stt}
                                WHERE id_servizio_ente=see.id_servizio_ente)

                                LEFT OUTER JOIN ${tabelle.utente} uT
                                ON stt.id_utente = uT.id_utente 

    LEFT OUTER JOIN ${tabelle.ente} e
        ON see.id_ente_erogatore=e.id_ente
    LEFT OUTER JOIN ${tabelle.servizio} s
        ON see.id_servizio_riferimento=s.id_servizio
    LEFT OUTER JOIN ${tabelle.contenuto} c
        ON s.id_categoria_accreditamento=c.id_contenuto
    LEFT OUTER JOIN wemi2.dominio d
        ON  cast (stt.cd_stato_dati_servizio_ente as int)= cast (d.cd_dominio as int) and d.ty_dominio='STATO_COMPILAZ_SRV'
    LEFT OUTER JOIN ${tabelle.contenuto} co
        ON s.id_servizio=co.id_contenuto
    WHERE (e.id_ente=$[id_ente] OR $[id_ente] IS NULL)
    ORDER BY see.id_servizio_ente;
`;



export const selectServizioErogatoEnte004Admin  = `
    SELECT
        see.id_servizio_ente,
        see.id_servizio_riferimento,
        see.pg_versione,
        see.ts_creazione,
        e.nm_ente,
        uT.ptx_username,
        c.tl_testo_1 ->> 'it' AS cat_accreditamento,
        co.tl_testo_1 ->> 'it' AS serv_offerto,
        stt.ts_variazione_stato,
        stt.cd_stato_dati_servizio_ente,
        stt.id_utente,
        d.tl_valore_testuale
    FROM  ${tabelle.servizio_erogato_ente} see
    LEFT OUTER JOIN ${tabelle.servizio_erogato_ente_stt} stt
    ON see.id_servizio_ente=stt.id_servizio_ente
    AND stt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                        FROM ${tabelle.servizio_erogato_ente_stt}
                        WHERE id_servizio_ente=see.id_servizio_ente)

                        LEFT OUTER JOIN ${tabelle.utente} uT
                        ON stt.id_utente = uT.id_utente 
    LEFT OUTER JOIN ${tabelle.ente} e
        ON see.id_ente_erogatore=e.id_ente
    LEFT OUTER JOIN ${tabelle.servizio} s
        ON see.id_servizio_riferimento=s.id_servizio
    LEFT OUTER JOIN ${tabelle.contenuto} c
        ON s.id_categoria_accreditamento=c.id_contenuto
    LEFT OUTER JOIN wemi2.dominio d
        ON  cast (stt.cd_stato_dati_servizio_ente as int)= cast (d.cd_dominio as int) and d.ty_dominio='STATO_COMPILAZ_SRV'
    LEFT OUTER JOIN ${tabelle.contenuto} co
        ON s.id_servizio=co.id_contenuto
    WHERE (e.id_ente=$[id_ente] OR $[id_ente] IS NULL)
    ORDER BY see.id_servizio_ente;
`;
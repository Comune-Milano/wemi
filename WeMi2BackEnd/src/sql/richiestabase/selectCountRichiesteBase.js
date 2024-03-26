import tabelle from 'tabelle';
import { TIPOLOGIA_SERVIZI } from 'constants/db/tipologia_servizio';

export const selectCountRichiesteBase = (args) => {
    let baseQuery = `
    SELECT
    count(distinct t.id_richiesta_servizio_base) AS count
    FROM ${tabelle.richiesta_servizio_base} t
    inner JOIN ${tabelle.utente} ON 
    t.id_utente_richiedente=${tabelle.utente}.id_utente
    inner join ${tabelle.richiesta_servizio_ente} AS rse ON rse.id_richiesta_servizio_base = t.id_richiesta_servizio_base
    inner join ${tabelle.servizio_erogato_ente} ON ${tabelle.servizio_erogato_ente}.id_servizio_ente = rse.id_servizio_erogato_ente
    inner join ${tabelle.servizio} ON ${tabelle.servizio}.id_servizio = ${tabelle.servizio_erogato_ente}.id_servizio_riferimento
    inner join ${tabelle.contenuto} ON ${tabelle.contenuto}.id_contenuto = ${tabelle.servizio}.id_servizio
    LEFT JOIN ${tabelle.recensione_ente} AS re on rse.id_richiesta_servizio_ente = re.id_rich_serv_rec
    INNER JOIN ${tabelle.richiesta_servizio_base_stt} as stt on 
    stt.id_richiesta_servizio = t.id_richiesta_servizio_base `;

    if(args.tipologia && args.tipologia === TIPOLOGIA_SERVIZI.INDIVIDUALE){
        baseQuery += `
            and (
                NOT (
                    CAST(js_dati_richiesta ->> 'qtPersone' AS Int) > 1   
               )
               or js_dati_richiesta IS NULL
            )
        `;
    }

    if (args.tipologia && args.tipologia === TIPOLOGIA_SERVIZI.CONDIVISO) {
        baseQuery += `
            and (
               CAST(js_dati_richiesta ->> 'qtPersone' AS Int) > 1   
            )
        `;
    }
    if (args.from && args.from !== '') {
        baseQuery += `and cast(t.ts_creazione as date)>=$[from] `;
    }
    if (args.to && args.to !== '') {
        baseQuery += `and cast(t.ts_creazione as date)<=$[to] `;
    }
    if (Array.isArray(args.statoRichiesta)) {
        baseQuery += ` and stt.cd_stato_richiesta_servizio IN ($[statoRichiesta:csv]) `
    }

    baseQuery += `and stt.cd_stato_richiesta_servizio <> '9' and  stt.ts_variazione_stato =  
    (SELECT MAX(ts_variazione_stato)
    FROM 
        ${tabelle.richiesta_servizio_base_stt}
    WHERE id_richiesta_servizio = t.id_richiesta_servizio_base
    )
WHERE id_utente_richiedente = $[idUtente]
and (re.pg_rich_serv_rec = (SELECT MAX(pg_rich_serv_rec)
                            FROM ${tabelle.recensione_ente}
                            WHERE id_rich_serv_rec = rse.id_richiesta_servizio_ente)
     or re.pg_rich_serv_rec is null);
`;

    return baseQuery;

}
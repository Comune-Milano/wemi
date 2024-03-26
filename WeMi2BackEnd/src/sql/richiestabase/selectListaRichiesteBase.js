import tabelle from 'tabelle';
import { TIPOLOGIA_SERVIZI } from 'constants/db/tipologia_servizio';
import { cdStatoDomandaTCB } from 'constants/db/cdStatoDomandaTCB';

export const selectListaRichiesteBase = (args) => {
  let baseQuery = `
    SELECT
        t.id_richiesta_servizio_base as "idRichiestaBase",
        dominioOrigineRichiesta.tl_valore_testuale ->> 'it' AS "tipologiaAssuzione",
        to_char(dt_periodo_richiesto_dal,'YYYY-MM-DD')dt_periodo_richiesto_dal, 
        to_char(dt_periodo_richiesto_al,'YYYY-MM-DD')dt_periodo_richiesto_al, 
        id_utente_richiedente, 
        js_dati_richiesta,
        to_char(t.dt_inizio_val,'YYYY-MM-DD')dt_inizio_val, 
        to_char(t.dt_fine_val,'YYYY-MM-DD')dt_fine_val,
        to_char(max(enteStt.ts_variazione_stato),'YYYY-MM-DD')ts_variazione_stato,
        tl_testo_1 as "serviceName",
        stt.cd_stato_richiesta_servizio as stato,
        min(rse.im_costo_totale_ente) as costo,
        coalesce(inoltro.ts_inoltro, t.ts_creazione) ts_creazione_inoltro,
        CASE max(id_ente_erogatore) WHEN 0 THEN 'TCB' ELSE 'Ente' END as "requestType",
        re.cd_stato_rec as "statoRecensione"
    FROM ${tabelle.richiesta_servizio_base} as t
    inner JOIN ${tabelle.utente} ON 
    t.id_utente_richiedente=${tabelle.utente}.id_utente
    inner join ${tabelle.richiesta_servizio_ente} AS rse ON rse.id_richiesta_servizio_base = t.id_richiesta_servizio_base
    inner join ${tabelle.servizio_erogato_ente} ON ${tabelle.servizio_erogato_ente}.id_servizio_ente = rse.id_servizio_erogato_ente
    inner join ${tabelle.servizio} ON ${tabelle.servizio}.id_servizio = ${tabelle.servizio_erogato_ente}.id_servizio_riferimento
    inner join ${tabelle.contenuto} ON ${tabelle.contenuto}.id_contenuto = ${tabelle.servizio}.id_servizio
    INNER JOIN ${tabelle.richiesta_servizio_base_stt} as stt on stt.id_richiesta_servizio = t.id_richiesta_servizio_base
    LEFT JOIN ${tabelle.recensione_ente} AS re on rse.id_richiesta_servizio_ente = re.id_rich_serv_rec
    LEFT JOIN wemi2.richiesta_servizio_ente_stt AS enteStt ON enteStt.id_richiesta_servizio_ente = rse.id_richiesta_servizio_ente
    LEFT JOIN wemi2.dominio AS dominioOrigineRichiesta ON dominioOrigineRichiesta.cd_dominio = CAST(t.ty_richiesta AS varchar)
    left outer join (select id_richiesta_servizio_ente, min(ts_variazione_stato) ts_inoltro from wemi2.richiesta_servizio_ente_stt
    where cd_stato_ric_serv_ente = '${cdStatoDomandaTCB}' group by id_richiesta_servizio_ente) AS inoltro on inoltro.id_richiesta_servizio_ente = rse.id_richiesta_servizio_ente
    where id_utente_richiedente = $[idUtente] `;

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
    baseQuery += 'and cast(t.ts_creazione as date)>=$[from] ';
  }
  if (args.to && args.to !== '') {
    baseQuery += 'and cast(t.ts_creazione as date)<=$[to] ';
  }
  if (Array.isArray(args.statoRichiesta)) {
    baseQuery += ' and stt.cd_stato_richiesta_servizio IN ($[statoRichiesta:csv]) ';
  }

  baseQuery += ` 
    and enteStt.ts_variazione_stato = (
        SELECT max(ts_variazione_stato)
        FROM wemi2.richiesta_servizio_ente_stt
        WHERE id_richiesta_servizio_ente = rse.id_richiesta_servizio_ente)
    and stt.cd_stato_richiesta_servizio <> '9'
    and  stt.ts_variazione_stato =  
        (SELECT MAX(ts_variazione_stato)
        FROM 
            ${tabelle.richiesta_servizio_base_stt}
        WHERE id_richiesta_servizio = t.id_richiesta_servizio_base
        )
    and (re.pg_rich_serv_rec = (SELECT MAX(pg_rich_serv_rec)
                                FROM ${tabelle.recensione_ente}
                                WHERE id_rich_serv_rec = rse.id_richiesta_servizio_ente)
        or re.pg_rich_serv_rec is null)
    AND (dominioOrigineRichiesta.ty_dominio = 'CD_ORIGINE_RICHIESTA' OR dominioOrigineRichiesta.ty_dominio IS NULL) 
    GROUP BY t.id_richiesta_servizio_base
       , dominioOrigineRichiesta.tl_valore_testuale ->> 'it'
	   , id_contenuto
	   , stt.cd_stato_richiesta_servizio
	   , re.cd_stato_rec
	   , coalesce(inoltro.ts_inoltro, t.ts_creazione)
    ORDER BY coalesce(inoltro.ts_inoltro, t.ts_creazione) DESC, t.id_richiesta_servizio_base DESC

    LIMIT 5  OFFSET $[numeroElementi]
    `;

  return baseQuery;
};


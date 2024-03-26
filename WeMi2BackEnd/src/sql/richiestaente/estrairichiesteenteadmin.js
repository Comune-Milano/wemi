import tabelle from "tabelle";

export const estraiRichiesteEnteInfo = (input, nomeCognome) => `
select  
rse.id_richiesta_servizio_ente as "idRichiestaServizioEnte",
rse.id_richiesta_servizio_base as "idRichiestaServizioBase",
richiesta_servizio_base.ts_creazione as "timestampCreazione", 
ultimoUtente.ptx_username as "username", 
richiedente.tx_nome_utente as "nomeUtente",
richiedente.tx_cognome_utente as "cognomeUtente",
js_dati_lavoratore, 
${tabelle.servizio_erogato_ente}.js_dati_prezzo as "DatiPrezzo",
tl_testo_1 as "nomeServizio",
id_servizio_ente as "idServizioErogatoEnte",
id_utente_richiedente as "idUtente",
nm_ente as "nmEnte",
id_ente as "idEnte",
${tabelle.richiesta_servizio_ente_stt}.cd_stato_chat as "statoChat",
${tabelle.richiesta_servizio_base}.js_dati_richiesta as "datiRichiesta",
${tabelle.richiesta_servizio_base}.dt_periodo_richiesto_dal::timestamp with time zone as "periodoRichiestoDal",
rse.im_costo_totale_calcolato as "prezzoProposto",
rse.im_costo_totale_ente as "prezzoFinale",
${tabelle.servizio_erogato_ente}.cd_tipo_offerta_srv as "tipoOfferta",
${tabelle.richiesta_servizio_tcb}.js_impersonificazione,
${tabelle.servizio_erogato_ente}.cd_tipo_servizio_erog as "TipoServizioErog",
${tabelle.servizio_erogato_ente}.im_prezzo_minimo as "PrezzoMinimo",
${tabelle.richiesta_servizio_base}.js_dati_richiesta as "jsDatiRichiesta",
${tabelle.servizio_erogato_ente}.dt_inizio_val_offerta_prezzo as "inizioValOffertaPrezzo", 
${tabelle.servizio_erogato_ente}.dt_fine_val_offerta_prezzo as "fineValOffertaPrezzo",
${tabelle.richiesta_servizio_base}.dt_periodo_richiesto_al::timestamp with time zone as "periodoRichiestoAl",
${tabelle.recensione_ente_stt}.cd_stato_recensione as "statoRecensione",
${tabelle.richiesta_servizio_ente_stt}.cd_stato_ric_serv_ente as "statoRichiestaEnte", 
${tabelle.richiesta_servizio_base_stt}.cd_stato_richiesta_servizio as "statoRichiestaBase",
${tabelle.richiesta_servizio_base_stt}.ts_variazione_stato  as "tsRichiestaBase",
${tabelle.richiesta_servizio_ente_stt}.ts_variazione_stato as "tsRichiestaServizio",
rse.dt_periodo_proposto_dal::timestamp with time zone AS "periodoPropostoDal",
rse.dt_periodo_proposto_al::timestamp with time zone AS "periodoPropostoAl"
from ${tabelle.richiesta_servizio_ente} as rse
left join ${tabelle.richiesta_servizio_tcb} ON ${tabelle.richiesta_servizio_tcb}.id_richiesta_servizio_tcb = rse.id_richiesta_servizio_ente
inner join ${tabelle.richiesta_servizio_base} ON ${tabelle.richiesta_servizio_base}.id_richiesta_servizio_base = rse.id_richiesta_servizio_base
inner join ${tabelle.richiesta_servizio_base_stt} ON ${tabelle.richiesta_servizio_base_stt}.id_richiesta_servizio = ${tabelle.richiesta_servizio_base}.id_richiesta_servizio_base
inner join ${tabelle.richiesta_servizio_ente_stt} ON ${tabelle.richiesta_servizio_ente_stt}.id_richiesta_servizio_ente = rse.id_richiesta_servizio_ente
inner join ${tabelle.utente} as ultimoUtente ON ultimoUtente.id_utente = ${ tabelle.richiesta_servizio_ente_stt}.id_utente
inner join ${tabelle.utente} as richiedente ON richiedente.id_utente = ${ tabelle.richiesta_servizio_base}.id_utente_richiedente
inner join ${tabelle.servizio_erogato_ente} ON ${tabelle.servizio_erogato_ente}.id_servizio_ente = rse.id_servizio_erogato_ente
inner join ${tabelle.servizio} ON ${tabelle.servizio}.id_servizio = ${tabelle.servizio_erogato_ente}.id_servizio_riferimento
inner join ${tabelle.contenuto} ON ${tabelle.contenuto}.id_contenuto = ${tabelle.servizio}.id_servizio
inner join ${tabelle.ente} ON id_ente = id_ente_erogatore
left join ${tabelle.recensione_ente} ON ${tabelle.recensione_ente}.id_rich_serv_rec = rse.id_richiesta_servizio_ente
left join ${tabelle.recensione_ente_stt} ON ${tabelle.recensione_ente_stt}.id_rich_serv_rec = ${tabelle.recensione_ente}.id_rich_serv_rec
where id_ente_erogatore <> 0 
and ${tabelle.richiesta_servizio_ente_stt}.ts_variazione_stato = (Select MAX(ts_variazione_stato) from  ${tabelle.richiesta_servizio_ente_stt} where id_richiesta_servizio_ente=rse.id_richiesta_servizio_ente)
and  ${tabelle.richiesta_servizio_base_stt}.ts_variazione_stato = (Select MAX(ts_variazione_stato) from  ${tabelle.richiesta_servizio_base_stt} as stt_base where stt_base.id_richiesta_servizio=rse.id_richiesta_servizio_base ) 
and ( ${tabelle.recensione_ente_stt}.ts_variazione_stato = (Select MAX(ts_variazione_stato) from  ${tabelle.recensione_ente_stt} where id_rich_serv_rec=rse.id_richiesta_servizio_ente) or  ${tabelle.recensione_ente_stt}.ts_variazione_stato   IS NULL)

${input? ` ${input.tipoServizio? input.tipoServizio !==0 ? 
  `and cd_modalita_erogazione= $[tipoServizio]` :` `:` `}
${input.statoRichiestaBase? input.statoRichiestaBase!=='0'? `and ${tabelle.richiesta_servizio_ente_stt}.cd_stato_ric_serv_ente= $[statoRichiestaBase]` :` `:` `}
${input.statoFeedback && input.statoFeedback === '4' ? ` and cd_stato_recensione is null`
  :
  input.statoFeedback && input.statoFeedback !== '0'? ` and cd_stato_recensione= $[statoFeedback] ` : ``}      ${input.statoChat? input.statoChat!==''? `and cd_stato_chat = $[statoChat]` :` `:` `}
${input.dataRichiesta? input.dataRichiesta!==''? `and CAST(rse.ts_creazione AS DATE) >= $[dataRichiesta]` :` `:` `}
${nomeCognome ? `
and LOWER(CONCAT(richiedente.tx_nome_utente, richiedente.tx_cognome_utente)) LIKE LOWER($[nomeCognome])`
: ` `}
${input.nomeEnte ? `${input.nomeEnte !== '' ? `and public.similarity(nm_ente,$[nomeEnte]) >= 0.3` : ``}` : ``}
`: ` `}
ORDER BY rse.id_richiesta_servizio_ente DESC
LIMIT 10  OFFSET $[numeroElementi];

`;

export const estraiRichiesteEnteCount = (input, nomeCognome) => ` select  count(*)
from ${tabelle.richiesta_servizio_ente} as rse
left join ${tabelle.richiesta_servizio_tcb} ON ${tabelle.richiesta_servizio_tcb}.id_richiesta_servizio_tcb = rse.id_richiesta_servizio_ente
inner join ${tabelle.richiesta_servizio_base} ON ${tabelle.richiesta_servizio_base}.id_richiesta_servizio_base = rse.id_richiesta_servizio_base
inner join ${tabelle.richiesta_servizio_base_stt} ON ${tabelle.richiesta_servizio_base_stt}.id_richiesta_servizio = ${tabelle.richiesta_servizio_base}.id_richiesta_servizio_base
inner join ${tabelle.richiesta_servizio_ente_stt} ON ${tabelle.richiesta_servizio_ente_stt}.id_richiesta_servizio_ente = rse.id_richiesta_servizio_ente
inner join ${tabelle.utente} as ultimoUtente ON ultimoUtente.id_utente = ${ tabelle.richiesta_servizio_ente_stt}.id_utente
inner join ${tabelle.utente} as richiedente ON richiedente.id_utente = ${ tabelle.richiesta_servizio_base}.id_utente_richiedente
inner join ${tabelle.servizio_erogato_ente} ON ${tabelle.servizio_erogato_ente}.id_servizio_ente = rse.id_servizio_erogato_ente
inner join ${tabelle.servizio} ON ${tabelle.servizio}.id_servizio = ${tabelle.servizio_erogato_ente}.id_servizio_riferimento
inner join ${tabelle.contenuto} ON ${tabelle.contenuto}.id_contenuto = ${tabelle.servizio}.id_servizio
inner join ${tabelle.ente} ON id_ente = id_ente_erogatore
left join ${tabelle.recensione_ente} ON ${tabelle.recensione_ente}.id_rich_serv_rec = rse.id_richiesta_servizio_ente
left join ${tabelle.recensione_ente_stt} ON ${tabelle.recensione_ente_stt}.id_rich_serv_rec = ${tabelle.recensione_ente}.id_rich_serv_rec
and ( ${tabelle.recensione_ente_stt}.ts_variazione_stato = (Select MAX(ts_variazione_stato) from  ${tabelle.recensione_ente_stt} where id_rich_serv_rec=rse.id_richiesta_servizio_ente) or  ${tabelle.recensione_ente_stt}.ts_variazione_stato   IS NULL)
where id_ente_erogatore <> 0
and ${tabelle.richiesta_servizio_ente_stt}.ts_variazione_stato = (Select MAX(ts_variazione_stato) from  ${tabelle.richiesta_servizio_ente_stt} where id_richiesta_servizio_ente=rse.id_richiesta_servizio_ente)
and  ${tabelle.richiesta_servizio_base_stt}.ts_variazione_stato = (Select MAX(ts_variazione_stato) from  ${tabelle.richiesta_servizio_base_stt} as stt_base where stt_base.id_richiesta_servizio=rse.id_richiesta_servizio_base) 
${input? ` ${input.tipoServizio? input.tipoServizio!==0? `and cd_modalita_erogazione= $[tipoServizio]` :` `:` `}
${input.statoRichiestaBase? input.statoRichiestaBase!=='0'? `and ${tabelle.richiesta_servizio_ente_stt}.cd_stato_ric_serv_ente= $[statoRichiestaBase]` :` `:` `}
${input.statoFeedback && input.statoFeedback === '4' ? ` and cd_stato_recensione is null`
:
input.statoFeedback && input.statoFeedback !== '0'? ` and cd_stato_recensione= $[statoFeedback] ` : ``}
${input.statoChat? input.statoChat!==''? `and cd_stato_chat = $[statoChat]` :` `:` `}
${input.statoImp? `and js_impersonificazione IS NOT NULL` :` `}
${input.dataRichiesta? input.dataRichiesta!==''? `and CAST(rse.ts_creazione AS DATE) >= $[dataRichiesta]` :` `:` `}
${ nomeCognome ? `
and LOWER(CONCAT(richiedente.tx_nome_utente, richiedente.tx_cognome_utente)) LIKE LOWER($[nomeCognome])`
: ` `}
${input.nomeEnte ? `${input.nomeEnte !== '' ? `and public.similarity(nm_ente, $[nomeEnte]) >= 0.3` : ``}` : ``}
`
    : ` `}        
`;
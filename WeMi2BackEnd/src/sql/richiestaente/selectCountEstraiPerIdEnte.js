import tabelle from 'tabelle';

export const selectCountEstraiPerIdEnte = (input, nome, cognome) => {
    let baseQuery = `SELECT distinct count(*)
from ${tabelle.richiesta_servizio_ente} as rse
inner join ${ tabelle.richiesta_servizio_base} ON ${ tabelle.richiesta_servizio_base}.id_richiesta_servizio_base = rse.id_richiesta_servizio_base
inner join ${ tabelle.richiesta_servizio_base_stt} ON ${ tabelle.richiesta_servizio_base_stt}.id_richiesta_servizio = ${ tabelle.richiesta_servizio_base}.id_richiesta_servizio_base
inner join ${ tabelle.richiesta_servizio_ente_stt} ON ${ tabelle.richiesta_servizio_ente_stt}.id_richiesta_servizio_ente = rse.id_richiesta_servizio_ente
inner join ${ tabelle.utente} as ultimoUtente ON ultimoUtente.id_utente = ${ tabelle.richiesta_servizio_ente_stt}.id_utente
inner join ${ tabelle.utente} as richiedente ON richiedente.id_utente = ${ tabelle.richiesta_servizio_base}.id_utente_richiedente
inner join ${ tabelle.servizio_erogato_ente} ON ${ tabelle.servizio_erogato_ente}.id_servizio_ente = rse.id_servizio_erogato_ente
inner join ${ tabelle.servizio} ON ${ tabelle.servizio}.id_servizio = ${ tabelle.servizio_erogato_ente}.id_servizio_riferimento
inner join ${ tabelle.contenuto} ON ${ tabelle.contenuto}.id_contenuto = ${ tabelle.servizio}.id_servizio
left join ${ tabelle.recensione_ente} ON ${ tabelle.recensione_ente}.id_rich_serv_rec = rse.id_richiesta_servizio_ente
left join ${ tabelle.recensione_ente_stt} ON ${ tabelle.recensione_ente_stt}.id_rich_serv_rec = ${ tabelle.recensione_ente}.id_rich_serv_rec
where id_ente_erogatore = $[idEnteErogatore]
and ${ tabelle.richiesta_servizio_ente_stt}.ts_variazione_stato = (Select MAX(ts_variazione_stato) from  ${tabelle.richiesta_servizio_ente_stt} where id_richiesta_servizio_ente=rse.id_richiesta_servizio_ente)
and  (${ tabelle.recensione_ente_stt}.ts_variazione_stato = (Select MAX(ts_variazione_stato) from  ${tabelle.recensione_ente_stt} where id_rich_serv_rec=rse.id_richiesta_servizio_ente)
      OR ${tabelle.recensione_ente_stt}.ts_variazione_stato is null)
and  ${ tabelle.richiesta_servizio_base_stt}.ts_variazione_stato = (Select MAX(ts_variazione_stato) from  ${tabelle.richiesta_servizio_base_stt} as stt_base where stt_base.id_richiesta_servizio=rse.id_richiesta_servizio_base) `;

    if (input.tipoServizio && input.tipoServizio !== 0) {
        baseQuery += ` and cd_modalita_erogazione= $[tipoServizio] `;
    }
    if (input.statoRichiestaBase && input.statoRichiestaBase !== '0') {
        baseQuery += ` and ${tabelle.richiesta_servizio_ente_stt}.cd_stato_ric_serv_ente = $[statoRichiestaBase] `;
    }
    if (input.statoFeedback && input.statoFeedback === '4') {
        baseQuery += ` and cd_stato_recensione is null`;
    }
    else if (input.statoFeedback && input.statoFeedback !== '0') {
        baseQuery += ` and cd_stato_recensione = $[statoFeedback] `;
    }
    if (input.statoChat && input.statoChat !== '') {
        baseQuery += ` and cd_stato_chat = $[statoChat] `;
    }
    if (input.dataRichiesta && input.dataRichiesta !== '') {
        baseQuery += ` and CAST(rse.ts_creazione AS DATE) >= $[dataRichiesta] `
    }
    if ((nome || cognome) && (nome !== '' || cognome !== '')) {
        baseQuery += ` and LOWER(richiedente.tx_nome_utente)= LOWER($[nome]) `;
    }
    if (cognome && cognome !== '') {
        baseQuery += ` and LOWER(richiedente.tx_cognome_utente)= LOWER($[cognome])`;
    }
    return baseQuery;

}
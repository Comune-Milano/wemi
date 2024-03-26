import tabelle from 'tabelle';

export const updateStatoChat = (args) => {
let baseQuery='';
if (parseInt(args.previousState) === 0) {
    baseQuery += `INSERT INTO ${tabelle.richiesta_servizio_ente_stt}
    (id_richiesta_servizio_ente,cd_stato_ric_serv_ente,cd_stato_chat, ts_variazione_stato, id_utente)
    VALUES ($[idRichiestaEnte],'3', '1' ,localtimestamp, $[idUtente]) RETURNING *;`
}
else if (parseInt(args.statoChat) === 0 && (parseInt(args.previousState) === 1 || parseInt(args.previousState) === 2)){
    baseQuery += `INSERT INTO ${tabelle.richiesta_servizio_ente_stt}
    (id_richiesta_servizio_ente,cd_stato_ric_serv_ente,cd_stato_chat, ts_variazione_stato, id_utente)
    VALUES ($[idRichiestaEnte],'1', '0' , localtimestamp, $[idUtente]) RETURNING *;`;
}
else 
baseQuery += `UPDATE ${tabelle.richiesta_servizio_ente_stt}
  SET cd_stato_chat='$[statoChat]', ts_variazione_stato = localtimestamp, id_utente = $[idUtente]
  WHERE id_richiesta_servizio_ente=$[idRichiestaEnte] and ts_variazione_stato = 
  (SELECT MAX(ts_variazione_stato) from ${tabelle.richiesta_servizio_ente_stt}  
  WHERE id_richiesta_servizio_ente=$[idRichiestaEnte] ) RETURNING *;`;

  return baseQuery;
};
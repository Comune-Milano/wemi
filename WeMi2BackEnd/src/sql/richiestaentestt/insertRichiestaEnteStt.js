import tabelle from 'tabelle';

export const insertRichiestaEnteStt = `
INSERT INTO ${tabelle.richiesta_servizio_ente_stt}(
    id_richiesta_servizio_ente, ts_variazione_stato, cd_stato_ric_serv_ente, cd_stato_chat, id_utente)
    VALUES ($[id_richiesta_servizio_ente], localtimestamp , 1, 0, $[id_utente]) RETURNING id_richiesta_servizio_ente, id_utente ;
    `
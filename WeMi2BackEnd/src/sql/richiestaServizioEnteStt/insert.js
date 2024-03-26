export const insert = `
INSERT INTO wemi2.richiesta_servizio_ente_stt
        (id_richiesta_servizio_ente,cd_stato_ric_serv_ente,cd_stato_chat,id_utente, ts_variazione_stato)
        VALUES ($[idRichiestaEnte], $[stato],$[CHAT_TERMINATA],$[id_utente],localtimestamp) RETURNING *;
`;
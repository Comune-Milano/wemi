export const inserisciStatoBozza = `
INSERT INTO wemi2.richiesta_servizio_ente_stt(
id_richiesta_servizio_ente, ts_variazione_stato, cd_stato_ric_serv_ente, cd_stato_chat, id_utente)
VALUES ($[idRichiesta], localtimestamp, '1', $[cdStatoChat], $[idLavoratore]);
`;
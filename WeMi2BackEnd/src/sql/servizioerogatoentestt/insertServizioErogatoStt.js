import tabelle from 'tabelle';

export const insertServizioErogatoStt = `INSERT INTO ${tabelle.servizio_erogato_ente_stt}
(id_servizio_ente,ts_variazione_stato,cd_stato_dati_servizio_ente,id_utente)
VALUES ($[id_servizio_ente],localtimestamp,$[cd_stato_dati_servizio_ente],$[id_utente]) RETURNING *;`;
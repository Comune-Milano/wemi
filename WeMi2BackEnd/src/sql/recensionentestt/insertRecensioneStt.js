import tabelle from 'tabelle';

export const insertRecensioneStt = `
INSERT INTO ${tabelle.recensione_ente_stt}(
  id_rich_serv_rec,
  ts_variazione_stato,
  cd_stato_recensione,
  id_utente
)
VALUES(
  $[id_richiesta_servizio_ente],
  localtimestamp,
  0,
  $[id_utente_richiedente]
);`;
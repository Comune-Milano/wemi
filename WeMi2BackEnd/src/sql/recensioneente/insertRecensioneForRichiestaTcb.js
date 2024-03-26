import tabelle from 'tabelle';

export const insertRecensioneForRichiestaTcb = `
INSERT INTO ${tabelle.recensione_ente}(
  id_rich_serv_rec, ts_creazione
)
VALUES(
  $[id_richiesta_servizio_ente],
  localtimestamp
);`;
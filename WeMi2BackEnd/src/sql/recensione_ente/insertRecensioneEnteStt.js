import tabelle from 'tabelle';

export const insertRecensioneEnteStt = `
INSERT INTO ${tabelle.recensione_ente_stt}
  (id_rich_serv_rec, ts_variazione_stato, cd_stato_recensione, id_utente)
VALUES 
  ($[idRichiestaEnte], localtimestamp, $[cdStatoRecensione], $[idUtente]) RETURNING *;`;
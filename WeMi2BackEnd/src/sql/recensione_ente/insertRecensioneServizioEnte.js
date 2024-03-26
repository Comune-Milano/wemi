
export const insertRecensioneServizioEnte = `
INSERT INTO wemi2.recensione_servizio_ente
  (id_rich_serv_rec, qt_media_singola_recensione, js_dati_recensione, ts_creazione)
VALUES 
  ($[id_rich_serv_rec], $[qt_media_singola_recensione], $[js_dati_recensione], localtimestamp);`;
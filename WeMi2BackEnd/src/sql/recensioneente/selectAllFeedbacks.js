import tabelle from 'tabelle';

export const selectAllFeedbacks = `
SELECT ts_creazione, pg_rich_serv_rec, (SELECT MAX(pg_rich_serv_rec)
FROM ${tabelle.recensione_ente}
WHERE id_rich_serv_rec = $[id_rich_serv_rec]) as "maxProgressivo"
FROM ${tabelle.recensione_ente}
WHERE id_rich_serv_rec = $[id_rich_serv_rec]`;
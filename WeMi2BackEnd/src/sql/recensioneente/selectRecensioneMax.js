import tabelle from 'tabelle';

export const selectRecensioneMax =  `
  SELECT *
  FROM ${tabelle.recensione_ente}
  WHERE id_rich_serv_rec = $[id_rich_serv_rec] and pg_rich_serv_rec = (
      SELECT MAX(pg_rich_serv_rec)
      FROM ${tabelle.recensione_ente}
      WHERE id_rich_serv_rec = $[id_rich_serv_rec]
    )`;
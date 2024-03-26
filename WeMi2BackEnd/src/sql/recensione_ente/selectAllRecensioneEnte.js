import tabelle from 'tabelle';

export const selectAllRecensioneEnte = `
SELECT *
FROM ${tabelle.recensione_ente}
WHERE id_rich_serv_rec=$[id_rich_serv_rec]`;
import tabelle from 'tabelle';

export const insertRSostEconServErogEnte = `INSERT INTO ${tabelle.r_sost_econ_serv_erog_ente}
(id_contenuto_sostegno_econ,id_servizio_ente)
VALUES ($[id_contenuto_sostegno_econ],$[id_servizio_ente]) RETURNING *;`
import tabelle from 'tabelle';

export const deleteRMansioneServErogEnte = `DELETE FROM ${tabelle.r_mansione_serv_erog_ente}
WHERE id_servizio_ente = $[id_servizio_ente] `;
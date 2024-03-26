import tabelle from 'tabelle';

export const deleteRSostEconServErogEnte = `DELETE FROM ${tabelle.r_sost_econ_serv_erog_ente}
WHERE id_servizio_ente = $[id_servizio_ente] `;
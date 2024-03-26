import tabelle from 'tabelle';

export const deleteRMunicipioServEnte = `DELETE FROM ${tabelle.r_municipio_servito_serv_ente}
WHERE id_servizio_ente = $[id_servizio_ente] `;
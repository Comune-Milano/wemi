import tabelle from 'tabelle';

export const deleteRFasciaOrariaErogSrvEnte = `DELETE FROM ${tabelle.r_fascia_oraria_erog_srv_ente}
WHERE id_servizio_ente = $[id_servizio_ente] `;
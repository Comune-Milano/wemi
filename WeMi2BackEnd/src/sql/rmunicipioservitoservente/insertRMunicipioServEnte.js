import tabelle from 'tabelle';

export const insertRMunicipioServEnte = ` INSERT INTO ${tabelle.r_municipio_servito_serv_ente}(
    id_servizio_ente, cd_municipio_servito)
    VALUES ( $[id_servizio_ente],$[cd_municipio_servito]) RETURNING *;`;
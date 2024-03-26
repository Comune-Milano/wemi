import tabelle from 'tabelle';

export const insertRMansioneServErogEnte = ` INSERT INTO ${tabelle.r_mansione_serv_erog_ente}(
    id_servizio_ente,id_mansione, pg_mansione_servizio)
       VALUES ( $[id_servizio_ente] ,$[id_mansione], $[order]) RETURNING *;`;
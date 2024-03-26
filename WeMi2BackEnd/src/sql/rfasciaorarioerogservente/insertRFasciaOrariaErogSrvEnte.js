import tabelle from 'tabelle';

export const insertRFasciaOrariaErogSrvEnte = `INSERT INTO ${tabelle.r_fascia_oraria_erog_srv_ente}(
    cd_fascia_oraria_erog_srv_ente,id_servizio_ente)
    VALUES ($[cd_fascia_oraria_erog_srv_ente], $[id_servizio_ente]) RETURNING *;`
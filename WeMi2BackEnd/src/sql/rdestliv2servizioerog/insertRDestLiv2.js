import tabelle from 'tabelle';

export const insertRDestLiv2 = ` INSERT INTO ${tabelle.r_dest_liv2_servizio_erog}(
  id_destinatario_liv2, id_servizio_ente)
    VALUES ($[id_destinatario_liv2], $[id_servizio_ente]) RETURNING *;
  `
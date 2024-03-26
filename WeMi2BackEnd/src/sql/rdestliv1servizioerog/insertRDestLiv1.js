import tabelle from 'tabelle';

export const insertRDestLiv1 = ` INSERT INTO ${tabelle.r_dest_liv1_servizio_erog}(
  id_destinatario_liv1, id_servizio_ente)
    VALUES ($[id_destinatario_liv1], $[id_servizio_ente]) RETURNING *;
  `
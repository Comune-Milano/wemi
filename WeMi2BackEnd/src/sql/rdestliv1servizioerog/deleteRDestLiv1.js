import tabelle from 'tabelle';

export const deleteRDestLiv1 = `DELETE FROM ${tabelle.r_dest_liv1_servizio_erog}
    WHERE id_servizio_ente = $[id_servizio_ente] `;

import tabelle from 'tabelle';

export const deleteRDestLiv2 = `DELETE FROM ${tabelle.r_dest_liv2_servizio_erog}
    WHERE id_servizio_ente = $[id_servizio_ente] `;

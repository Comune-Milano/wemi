import tabelle from 'tabelle';

export const updateForEliminaBenef = `UPDATE ${tabelle.val_attributo_rel_dom_serv_lav}
SET  pg_beneficiario_richiesta_tcb = $[pgBen] + $[i] - 1
WHERE id_richiesta_servizio_tcb = $[idRichiestaTcb] AND
pg_beneficiario_richiesta_tcb = $[pgBen] + $[i];
`;
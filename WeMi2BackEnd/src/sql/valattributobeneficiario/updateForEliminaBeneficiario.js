import tabelle from 'tabelle';

export const updateForEliminaBeneficiario = `UPDATE ${tabelle.val_attributo_beneficiario}
SET  pg_beneficiario_richiesta_tcb = $[pgBen] + $[i] - 1
WHERE id_richiesta_servizio_tcb =$[idRichiestaTcb] AND
pg_beneficiario_richiesta_tcb = $[pgBen] + $[i];
`;
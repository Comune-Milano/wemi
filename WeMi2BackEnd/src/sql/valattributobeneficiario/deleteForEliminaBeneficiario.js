import tabelle from 'tabelle';

export const deleteForEliminaBeneficiario = `DELETE FROM ${tabelle.val_attributo_beneficiario}
                                WHERE 
                                id_richiesta_servizio_tcb = $[idRichiestaTcb] AND
                                pg_beneficiario_richiesta_tcb = $[pgBen];`;
import tabelle from 'tabelle';

export const selectPgBeneficiario =` SELECT pg_beneficiario_richiesta_tcb FROM ${tabelle.beneficiario_ric_serv_tcb}
WHERE 
id_richiesta_servizio_tcb = $[idRichiestaTcb] AND
pg_beneficiario_richiesta_tcb > $[pgBen]
ORDER BY pg_beneficiario_richiesta_tcb;`;
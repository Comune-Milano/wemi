import tabelle from 'tabelle';

export const selectByIdRichiesta = `SELECT  pg_beneficiario_richiesta_tcb FROM ${tabelle.beneficiario_ric_serv_tcb} 
WHERE id_richiesta_servizio_tcb = $[idRichiestaTcb]`;
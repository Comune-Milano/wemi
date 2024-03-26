import tabelle from 'tabelle';

export const selectForEstraiDati002 =  `SELECT DISTINCT pg_beneficiario_richiesta_tcb
from ${tabelle.beneficiario_ric_serv_tcb} 
where id_richiesta_servizio_tcb = $[idRichiestaTcb];`
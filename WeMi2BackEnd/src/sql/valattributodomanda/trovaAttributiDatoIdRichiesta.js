import tabelle from 'tabelle';

export const trovaAttributiDatoIdRichiesta =  `
SELECT cd_attributo
FROM ${tabelle.val_attributo_domanda}
     WHERE 
     id_richiesta_servizio_tcb =$[idRichiestaTcb];
    `;
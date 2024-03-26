import tabelle from 'tabelle';

export const eliminaValAttributoDomandaDatoIdRichiesta = `
DELETE FROM ${tabelle.val_attributo_domanda}
where id_richiesta_servizio_tcb = $[idRichiestaTcb] AND cd_attributo = $[ls];`
;
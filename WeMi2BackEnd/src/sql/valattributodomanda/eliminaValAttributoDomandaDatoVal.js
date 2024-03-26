import tabelle from 'tabelle';
 export const eliminaValAttributoDomandaDatoVal =  `
 DELETE FROM ${tabelle.val_attributo_domanda}
      WHERE 
      id_richiesta_servizio_tcb =$[idRichiestaTcb] and cd_attributo =$[val.cd_attributo];`
      ;
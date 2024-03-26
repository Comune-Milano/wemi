/**
  * It deletes the idRichiesta associated to the idLavoratore from val_attributo_domanda
  */
 export const deleteFromAttributoDomanda = `DELETE FROM wemi2.val_attributo_domanda WHERE id_richiesta_servizio_tcb IN ($[idRichiesteEsperienze:csv])`;
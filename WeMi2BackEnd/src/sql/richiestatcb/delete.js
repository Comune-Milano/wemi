/**
 * It deletes the idRichiesta associated to the idLavoratore from richiesta_servizio_tcb
 */
export const deleteFromRichiestaTcb = `DELETE FROM wemi2.richiesta_servizio_tcb WHERE id_richiesta_servizio_tcb IN ($[idRichiesteEsperienze:csv])`;
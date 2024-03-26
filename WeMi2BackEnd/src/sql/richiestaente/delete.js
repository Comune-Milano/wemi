/**
* It deletes the idRichiesta associated to the idLavoratore from richiesta_servizio_ente
*/
export const deleteFromRichiestaEnte = `DELETE FROM wemi2.richiesta_servizio_ente WHERE id_richiesta_servizio_ente IN ($[idRichiesteEsperienze:csv])`;
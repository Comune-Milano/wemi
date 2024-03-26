/**
* It deletes the idRichiesta associated to the idLavoratore from richiesta_servizio_ente_stt
*/
export const deleteFromRichiestaEnteStt = `DELETE FROM wemi2.richiesta_servizio_ente_stt WHERE id_richiesta_servizio_ente IN ($[idRichiesteEsperienze:csv])`;
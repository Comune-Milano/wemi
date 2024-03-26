
/**
 * It deletes the idRichiesta associated to the idLavoratore from richiesta_servizio_base_stt
 */
export const deleteFromRichiestaBaseStt = `DELETE FROM wemi2.richiesta_servizio_base_stt WHERE id_richiesta_servizio IN ($[idRichiesteBaseEsperienze:csv])`;
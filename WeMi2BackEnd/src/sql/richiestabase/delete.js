

/**
 * It deletes the idRichiesta associated to the idLavoratore from richiesta_servizio_base
 */
export const deleteFromRichiestaBase = `DELETE FROM wemi2.richiesta_servizio_base WHERE id_richiesta_servizio_base IN ($[idRichiesteBaseEsperienze:csv])`;
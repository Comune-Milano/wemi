

/**
 * It deletes the idRichiesta associated to the idLavoratore from recensione_servizio_ente_stt
 */
export const deleteFromRecensioneServizioStt = 
`DELETE FROM wemi2.recensione_servizio_ente_stt 
WHERE id_rich_serv_rec IN ($[idRichiesteEsperienze:csv])`;

export const deleteFromRecensioneServizio = 
`DELETE FROM wemi2.recensione_servizio_ente 
WHERE id_rich_serv_rec IN ($[idRichiesteEsperienze:csv])`;
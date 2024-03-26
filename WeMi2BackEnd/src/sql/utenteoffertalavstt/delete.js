
/**
 * It deletes the attributes associated to the idLavoratore from utente_offerta_lav_stt
 */
export const deleteFromUtenteOffertaStt = `DELETE FROM wemi2.utente_offerta_lav_stt WHERE id_utente_lav = $[idLavoratore]`;
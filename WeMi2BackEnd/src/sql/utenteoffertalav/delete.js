/**
 * It deletes the attributes associated to the idLavoratore from utente_offerta_lav
 */
export const deleteFromUtenteLav = `DELETE FROM wemi2.utente_offerta_lav WHERE id_utente_lav = $[idLavoratore]`;

/**
* It deletes the attributes associated to the idLavoratore from val_attributo_offerta_ut
*/
export const deleteFromAttributoOfferta = `DELETE FROM wemi2.val_attributo_offerta_ut WHERE id_utente_offerta_lav = $[idLavoratore]`;
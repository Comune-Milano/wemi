/**
* It deletes the attributes associated to the idLavoratore from val_attributo_ut
*/
export const deleteFromValAttributo = `DELETE FROM wemi2.val_attributo_ut WHERE id_utente = $[idLavoratore]`;
/**
* It deletes the idRichiesta associated to the idLavoratore from r_match_ric_lav
*/
export const deleteFromRMatchLav = `DELETE FROM wemi2.r_match_ric_lav WHERE id_lavoratore = $[idLavoratore]`;
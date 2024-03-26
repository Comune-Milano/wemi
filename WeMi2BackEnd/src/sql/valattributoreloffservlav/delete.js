/**
 * It deletes the attributes associated to the idLavoratore from val_attributo_rel_off_serv_lav
 */
export const deleteFromAttributoRelOff = `DELETE FROM wemi2.val_attributo_rel_off_serv_lav WHERE id_utente_lav = $[idLavoratore]`;

/**
* It deletes all the attributes associated to the idLavoratore and idServizioRiferimento 
* from val_attributo_rel_off_serv_lav
*/
export const deleteFromAttributoRelOffertaServizioByIdServizio = () => {
  return `
  DELETE FROM wemi2.val_attributo_rel_off_serv_lav
  WHERE id_utente_lav = $[idLavoratore]
  AND id_servizio_riferimento = $[idServizioRiferimento]
  `;
}
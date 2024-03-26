    
/**
 * It deletes the attributes associated to the idLavoratore from utente_offerta_servizio
 */
export const deleteFromUtenteOfferta = `DELETE FROM wemi2.utente_offerta_servizio WHERE id_utente_lav = $[idLavoratore]`;

/**
 * It deletes the attributes associated to the idLavoratore and idServizioRiferimento from utente_offerta_servizio
 */
export const deleteFromUtenteOffertaByIdServizio = () => {
  return `
  DELETE FROM wemi2.utente_offerta_servizio 
  WHERE id_utente_lav = $[idLavoratore]
  AND id_servizio_riferimento = $[idServizioRiferimento]
  `;
};

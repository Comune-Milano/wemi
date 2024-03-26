import { attributo } from "constants/db/attributo";

/**
* It deletes the attributes associated to the idLavoratore from val_attributo_offerta_servizio
*/
export const deleteFromOffertaServizio = `DELETE FROM wemi2.val_attributo_offerta_servizio WHERE id_utente_lav = $[idLavoratore]`;


/**
* It deletes all the attributes associated to the idLavoratore and idServizioRiferimento 
* from val_attributo_offerta_servizio
*/
export const deleteFromOffertaServizioByIdServizio = () => {
  return `
  DELETE FROM wemi2.val_attributo_offerta_servizio
  WHERE id_utente_lav = $[idLavoratore]
  AND id_servizio_riferimento = $[idServizioRiferimento]
  `;
}

/**
* It deletes the attributes associated to the idLavoratore, idServizioRiferimento, codiceAttributo 
* from val_attributo_offerta_servizio
*/
export const deleteFromOffertaServizioByIdServizioAndCodiceAttributo = (codiceAttributo) => {
  return `
  DELETE FROM wemi2.val_attributo_offerta_servizio
  WHERE id_utente_lav = $[idLavoratore]
  AND id_servizio_riferimento = $[idServizioRiferimento]
  AND cd_attributo = ${codiceAttributo};
  `;
}

/**
* It deletes the attribute LS_ORARIO_LAVORO associated to the idLavoratore, idServizioRiferimento
* and codiceValAttributo from val_attributo_offerta_servizio
*/
export const deleteTipologiaOrarioFromOffertaServizio = (codiceValAttributo) => {
  return `
  DELETE FROM wemi2.val_attributo_offerta_servizio
  WHERE id_utente_lav = $[idLavoratore]
  AND id_servizio_riferimento = $[idServizioRiferimento]
  AND cd_attributo = ${attributo.LS_ORARIO_LAVORO.cd_attributo}
  AND cd_val_attributo = ${codiceValAttributo};
  `;
}
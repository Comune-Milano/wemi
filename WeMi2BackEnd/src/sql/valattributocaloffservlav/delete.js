import { attributo } from "constants/db/attributo";

/**
 * It deletes the attributes associated to the idLavoratore from val_attributo_cal_off_serv_lav
 */
export const deleteFromAttributoCalOff = `DELETE FROM wemi2.val_attributo_cal_off_serv_lav WHERE id_utente_lav = $[idLavoratore]`;

/**
* It deletes all the attributes associated to the idLavoratore and idServizioRiferimento 
* from val_attributo_cal_off_serv_lav
*/
export const deleteFromAttributoCalendarioOffertaServizioByIdServizio = () => {
  return `
  DELETE FROM wemi2.val_attributo_cal_off_serv_lav
  WHERE id_utente_lav = $[idLavoratore]
  AND id_servizio_riferimento = $[idServizioRiferimento]
  `;
}

/**
* It deletes the calendar record associated to the idLavoratore, idServizioRiferimento, codiceAttributo 
* from val_attributo_cal_off_serv_lav
*/
export const deleteFromAttributoCalendarioOffertaServizioByIdServizioAndCodiceValoreAttributo = (codiceValoreAttributo) => {
  return `
  DELETE FROM wemi2.val_attributo_cal_off_serv_lav
  WHERE id_utente_lav = $[idLavoratore]
  AND id_servizio_riferimento = $[idServizioRiferimento]
  AND cd_attributo_orario_lav = ${attributo.LS_ORARIO_LAVORO.cd_attributo}
  AND cd_val_attributo_orario_lav = ${codiceValoreAttributo};
  `;
}

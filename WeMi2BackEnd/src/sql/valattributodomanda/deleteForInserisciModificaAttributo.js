import tabelle from 'tabelle';
import { isNullOrUndefined, isString, isNumber } from "util";

/**
 * delete x InserisciModificaAttributo
 * @param {object} val
 * 
 */
export const deleteForInserisciModificaAttributo = `DELETE FROM ${tabelle.val_attributo_domanda} WHERE 
   id_richiesta_servizio_tcb =$[idRichiestaTcb] and cd_attributo = $[cdAttr];`;

//    const sql = `DELETE FROM ${context.tabelle.val_attributo_domanda}
//    WHERE 
//    id_richiesta_servizio_tcb =${args.input.idRichiestaTcb} and cd_attributo = ${cdAttr};`
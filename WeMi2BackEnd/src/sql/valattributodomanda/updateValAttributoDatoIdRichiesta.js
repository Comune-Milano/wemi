import tabelle from 'tabelle';
import { isNullOrUndefined, isString, isNumber } from "util";

/**
 * Function per mutation update cdValAttributo
 * @param {object} val
 * 
 */
export const updateValAttributoDatoIdRichiesta = (val) => {
    let baseQuery = `UPDATE ${tabelle.val_attributo_domanda} SET cd_attributo = $[val.cd_attributo],`;
    if (isNumber(val.cd_val_attributo)) {
        baseQuery += `cd_val_attributo =  $[val.cd_val_attributo],`
    }
    if (isString(val.tx_val)) {
        baseQuery += `tx_val = $[val.tx_val],`;
    }
    if (isString(val.tx_nota)) {
        baseQuery += `tx_nota = $[val.tx_nota],`;
    }
    if (isString(val.tx_nota_op)) {
        baseQuery += `tx_nota_op = $[val.tx_nota_op],`;
    }
    if (!isNullOrUndefined(val.nr_val)) {
        baseQuery += `nr_val = $[val.nr_val],`;
    } else {
        baseQuery += `nr_val = 0,`;
    }
    if (val.fg_val) {
        baseQuery += `fg_val = $[val.fg_val],`;
    } 
    if (val.dt_val) {
      val.dt_val = val.dt_val.toJSON().split('T')[0];
        baseQuery += `dt_val = $[val.dt_val],`;
    } 
    if (val.fg_mansione_svolta) {
        baseQuery+= `fg_mansione_svolta = $[val.fg_mansione_svolta],`;
    } 

    if( isNumber( val.dc_val)){
        baseQuery+= `dc_val = $[val.dc_val],`;
    } 
    
    baseQuery += ` ts_modifica = localtimestamp
    WHERE 
    id_richiesta_servizio_tcb =$[idRichiestaTcb] and 
        cd_attributo =$[val.cd_attributo];`

    return baseQuery;
}

import tabelle from 'tabelle';
import { isNullOrUndefined, isString, isNumber } from "util";

/**
 * Function per mutation update valAttributoBeneficiario InserisciModificaAttributoBenef
 * @param {object} val
 * 
 */

export const updateForInserisciModificaAttrBeneficiarioTCB = (val) => {
    let baseQuery = `UPDATE ${tabelle.val_attributo_beneficiario} SET cd_attributo = $[val.cd_attributo],`;

    if (!isNullOrUndefined(val.cd_val_attributo)) {
        baseQuery += `cd_val_attributo =  $[val.cd_val_attributo],`
    }

    if (val.tx_val) {
        baseQuery += `tx_val = $[val.tx_val],`
    }
    if (val.dt_val) {
        baseQuery += `dt_value = $[val.dt_val],`
    }
    if (val.tx_nota) {
        baseQuery += `tx_nota = $[val.tx_nota],`
    }
    if (val.tx_nota_op) {
        baseQuery += `tx_nota_op = $[val.tx_nota_op],`
    }
    if(val.fg_val){
        baseQuery += `fg_val = $[val.fg_val],`
    } 
    if(!isNullOrUndefined(val.nr_val)){
        baseQuery += `nr_val = $[val.nr_val],`
    } 

    baseQuery += `ts_ult_modifica = localtimestamp
        WHERE 
            id_richiesta_servizio_tcb =$[idRichiestaTcb] and 
            cd_attributo =$[val.cd_attributo]    
        AND
            pg_beneficiario_richiesta_tcb = $[arrBen.pgBen];
        `
        return baseQuery;
}
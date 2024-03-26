import tabelle from 'tabelle';
import { isNull, isObject, isNullOrUndefined, isNumber, isString } from 'util';

export const updateValAttributoUt = (val) => {
    let baseQuery = `
    UPDATE ${tabelle.val_attributo_ut}
    SET cd_attributo = $[val.cd_attributo], `;

    if (isNumber(val.cd_val_attributo)) {
        baseQuery += `cd_val_attributo =  $[val.cd_val_attributo], `;
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

    if(val.dt_val){
        val.dt_val = val.dt_val.toJSON().split('T')[0];
        baseQuery += `dt_val = $[val.dt_val],`;
    } else {
        baseQuery += `dt_val = null,`;
    }

    if (val.fg_mansione_svolta) {
        baseQuery+= `fg_mansione_svolta = $[val.fg_mansione_svolta],`
    } 

    baseQuery += ` ts_modifica = localtimestamp
        WHERE 
            id_utente =$[idUtente] and 
            cd_attributo =$[val.cd_attributo];
    `;

    return baseQuery;
}

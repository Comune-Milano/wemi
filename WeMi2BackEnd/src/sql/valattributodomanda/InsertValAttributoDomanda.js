import tabelle from 'tabelle';
import { isNullOrUndefined, isString, isNumber } from "util";

/**
 * Function per insert senza txNotaOp in val_attributo_domanda
 * @param {object} val
 * 
 */

export const InsertValAttributoDomanda = (val) => {
    let baseQuery = `INSERT INTO ${tabelle.val_attributo_domanda}(
        id_richiesta_servizio_tcb, 
        cd_attributo,`;

    if (val.tx_val) {
        baseQuery += `tx_val,`;
    }

    if (!isNullOrUndefined(val.nr_val)) {
        baseQuery += `nr_val,`;
    }

    baseQuery += `cd_val_attributo,`;

    if (val.fg_val) {
        baseQuery += `fg_val,`;
    }

    if (val.tx_nota) {
        baseQuery += `tx_nota,`;
    }

    baseQuery += ` ts_modifica, 
        ts_creazione) VALUES ($[idRichiestaTcb],$[val.cd_attributo],`;

    if (val.tx_val) {
        baseQuery += `$[val.tx_val],`;
    }

    if (!isNullOrUndefined(val.nr_val)) {
        baseQuery += `$[val.nr_val],`;
    }

    if (!isNullOrUndefined(val.cd_val_attributo)) {
        baseQuery += `$[val.cd_val_attributo],`;
    } else {
        baseQuery += `1,`;
    }

    if (val.fg_val) {
        baseQuery += `$[val.fg_val],`;
    }

    if (val.tx_nota) {
        baseQuery += `$[val.tx_nota],`;
    }

    baseQuery += ` localtimestamp, 
        localtimestamp 
                  );`

    return baseQuery
}
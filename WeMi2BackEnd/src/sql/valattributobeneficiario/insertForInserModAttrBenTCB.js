import tabelle from 'tabelle';
import { isNullOrUndefined, isString, isNumber } from "util";

/**
 * Function per insert per InserisciModificaAttributoBeneficiarioTCB
 * @param {object} val
 * 
 */

export const insertForInserModAttrBenTCB = (val) => {
    let baseQuery = `INSERT INTO ${tabelle.val_attributo_beneficiario}(
    id_richiesta_servizio_tcb,
    pg_beneficiario_richiesta_tcb, 
    cd_attributo, 
    cd_val_attributo,`;

    if (val.tx_val) {
        baseQuery += `tx_val,`
    }
    if (val.dt_val) {
        baseQuery += `dt_val,`
    }
    if (val.tx_nota) {
        baseQuery += `tx_nota,`
    }
    if (val.tx_nota_op) {
        baseQuery += `tx_nota_op,`
    }
    if (val.fg_val) {
        baseQuery += `fg_val,`
    }
    if (!isNullOrUndefined(val.nr_val)) {
        baseQuery += `nr_val,`
    }

    baseQuery += `ts_ult_modifica, 
    ts_creazione)
    VALUES ($[idRichiestaTcb], 
                $[arrBen.pgBen],
                $[val.cd_attributo],`;

    if (!isNullOrUndefined(val.cd_val_attributo)) {
        baseQuery += `$[val.cd_val_attributo],`
    } else {
        baseQuery += `1,`
    }
    if (val.tx_val) {
        baseQuery += `$[val.tx_val],`
    }
    if (val.dt_val) {
        baseQuery += `$[val.dt_val],`
    }
    if (val.tx_nota) {
        baseQuery += `$[val.tx_nota],`
    }
    if (val.tx_nota_op) {
        baseQuery += `$[val.tx_nota_op],`
    }
    if (val.fg_val) {
        baseQuery += `$[val.fg_val],`
    }
    if (!isNullOrUndefined(val.nr_val)) {
        baseQuery += `$[val.nr_val],`
    }

    baseQuery += ` localtimestamp, 
    localtimestamp 
    );`;

    return baseQuery;
}
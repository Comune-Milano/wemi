import tabelle from 'tabelle';
import { isNullOrUndefined, isString, isNumber } from "util";

export const insertValAttributoUt = (val, exist) => {
    let baseQuery = `
    INSERT INTO ${tabelle.val_attributo_ut}(
        id_utente, 
        cd_attributo,`;

    if (val.tx_val) {
        baseQuery += 'tx_val,';
    }

    if (!isNullOrUndefined(val.nr_val)) {
        baseQuery += 'nr_val,';
    }

    baseQuery += 'cd_val_attributo,';

    if (val.dt_val && exist) {
        baseQuery += `dt_val,`;
    }
    if (val.fg_val) {
        baseQuery += `fg_val,`;
    }
    if (val.tx_nota) {
        baseQuery += `tx_nota,`;
    }
    if (val.tx_nota_op && exist) {
        baseQuery += `tx_nota_op,`;
    }
    if (val.fg_mansione_svolta && exist) {
        baseQuery += 'fg_mansione_svolta,';
    }

    baseQuery += 'ts_modifica, ts_creazione) VALUES ( $[idUtente], $[val.cd_attributo], ';

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
    if (val.dt_val && exist) {
        val.dt_val = val.dt_val.toJSON().split('T')[0];
        baseQuery += `$[val.dt_val],`;
    }
    if (val.fg_val) {
        baseQuery += `$[val.fg_val],`;
    }
    if (val.tx_nota) {
        baseQuery += `$[val.tx_nota],`;
    }
    if (val.tx_nota_op && exist) {
        baseQuery += `$[val.tx_nota_op],`;
    }
    if (val.fg_mansione_svolta && exist) {
        baseQuery += `$[val.fg_mansione_svolta],`;
    }

    baseQuery += `localtimestamp, 
        localtimestamp 
                  );`

    return baseQuery;

}

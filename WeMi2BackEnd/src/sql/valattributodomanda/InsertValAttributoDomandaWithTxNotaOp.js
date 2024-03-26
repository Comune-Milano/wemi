import tabelle from 'tabelle';
import { isNullOrUndefined, isString, isNumber } from "util";

/**
 * Function per insert con txNotaOp in val_attributo_domanda
 * @param {object} val
 * 
 */

 export const InsertValAttributoDomandaWithTxNotaOp = (val) => {
    let baseQuery = `INSERT INTO ${tabelle.val_attributo_domanda}(
        id_richiesta_servizio_tcb, 
        cd_attributo,`;
        
        if (val.tx_val) {
            baseQuery += `tx_val,`; 
        }

        if(!isNullOrUndefined(val.nr_val)){
            baseQuery+= `nr_val,`;
        }

        baseQuery+= `cd_val_attributo,`;

        if (val.dt_val) {
            baseQuery += `dt_val,`;
        }

        if (val.fg_val) {
            baseQuery += `fg_val,`;
        }

        if(val.tx_nota){
            baseQuery += `tx_nota,`;
        }

        if(val.tx_nota_op){
            baseQuery += `tx_nota_op,`;
        }

        if(val.fg_mansione_svolta){
            baseQuery += `fg_mansione_svolta,`;
        }

        if(isNumber( val.dc_val)){
            baseQuery += `dc_val,`;
        }

        baseQuery += ` ts_modifica, 
        ts_creazione) VALUES ($[idRichiestaTcb],$[val.cd_attributo],`;

        if (val.tx_val) {
            baseQuery += `$[val.tx_val],`;
        }

        if(!isNullOrUndefined(val.nr_val)){
            baseQuery +=  `$[val.nr_val],`
        }

        if(!isNullOrUndefined(val.cd_val_attributo)){
            baseQuery +=  `$[val.cd_val_attributo],`
        } else {
            baseQuery +=  `1,`
        }

        if(val.dt_val){
            val.dt_val = val.dt_val.toJSON().split('T')[0];
            baseQuery += `$[val.dt_val],`
        }

        if (val.fg_val) {
            baseQuery += `$[val.fg_val],`
        }

        if (val.tx_nota) {
            baseQuery += `$[val.tx_nota],`
        }

        if (val.tx_nota_op) {
            baseQuery += `$[val.tx_nota_op],`
        }

        if(val.fg_mansione_svolta){
            baseQuery += `$[val.fg_mansione_svolta],`
        }

        if (isNumber(val.dc_val)) {
            baseQuery += `$[val.dc_val],`
        }

        baseQuery += ` localtimestamp, 
        localtimestamp 
                  );`
                  
        return baseQuery;        
 }
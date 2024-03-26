import tabelle from 'tabelle';

export const insertValForRichiestaTcb = (val) => {
    let baseQuery = `
    INSERT INTO ${tabelle.val_attributo_domanda}(
        id_richiesta_servizio_tcb, 
        cd_attributo, 
        cd_val_attributo,`;

    if (val.fg_val) {
        baseQuery += 'fg_val,';
    }
    baseQuery += `ts_modifica, 
         ts_creazione)
         VALUES ($[id_richiesta_servizio_ente], 
                     $[cd_attributo],`;

    if (val.cd_val_attributo) {
        baseQuery += `$[cd_val_attributo],`;
    } else {
        baseQuery += `1,`;
    }
    if (val.fg_val) {
        baseQuery += `$[fg_val],`;
    }

    baseQuery += ` localtimestamp, 
                     localtimestamp 
                     );
           `
           return baseQuery;
}
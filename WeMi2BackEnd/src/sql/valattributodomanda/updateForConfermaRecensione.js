import tabelle from 'tabelle';

export const updateForConfermaRecensione = (boolean, args,i) => {
    let baseQuery = ` UPDATE ${tabelle.val_attributo_domanda}`;
    if (boolean) {
        baseQuery += ` SET fg_mansione_svolta = 1`;
        if (args.JsonFiltro[i].nota) {
            baseQuery += `,tx_nota = $[nota]`;
        } else {
            baseQuery += `,tx_nota = null`
        }
        baseQuery += ` WHERE id_richiesta_servizio_tcb = $[id_richiesta_servizio_tcb] AND cd_attributo = $[cd_attributo]
    AND cd_val_attributo = $[cd_val_attributo] `
    } else {
        baseQuery += ` SET fg_mansione_svolta = null`;
        if (args.JsonFiltro[i].nota) {
            baseQuery += `,tx_nota = $[nota]`;
        } else {
            baseQuery += `,tx_nota = null`
        }
        baseQuery += ` WHERE id_richiesta_servizio_tcb = $[id_richiesta_servizio_tcb]
        AND cd_attributo = $[cd_attributo]
        AND cd_val_attributo = $[cd_val_attributo] `
    }

    return baseQuery;
}
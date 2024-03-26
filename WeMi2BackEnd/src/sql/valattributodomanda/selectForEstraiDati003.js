import tabelle from 'tabelle';

export const selectForEstraiDati003 = `
SELECT 
 val.id_richiesta_servizio_tcb AS "idRichiestaTcb", 
 val.cd_attributo AS "cdAttributo",
 dom.tl_valore_testuale AS "tlValoreTestuale", 
 val.tx_val AS "txVal",
 val.tx_nota AS "txNota",
 attr.ty_dominio_tcb AS "dominioTcb", 
 val.cd_val_attributo AS "cdValAttributo", 
 fg_val AS flag, 
 val.ts_modifica AS "tsModifica", 
 rtcb.ts_creazione AS "tsCreazione"
    FROM ${tabelle.val_attributo_domanda} val
    LEFT JOIN ${tabelle.attributo} attr on (attr.cd_attributo = val.cd_attributo)
    LEFT JOIN ${tabelle.richiesta_servizio_tcb} rtcb on (rtcb.id_richiesta_servizio_tcb = val.id_richiesta_servizio_tcb)
    LEFT JOIN ${tabelle.dominio_tcb} dom on (attr.ty_dominio_tcb = dom.ty_dominio_tcb and val.cd_val_attributo = dom.cd_dominio_tcb)
    WHERE val.id_richiesta_servizio_tcb = $[idRichiestaTcb] and val.cd_attributo = 60
    ORDER BY dom.pg_visualizzazione ASC, dom.cd_dominio_tcb ASC
`;
import tabelle from 'tabelle';

export const selectValAttributiUtente = `
SELECT 
val.id_utente as "idUtente",
val.cd_attributo as "cdAttributo",
val.cd_val_attributo as "cdValAttributo",
val.tx_val as "txVal",
val.dt_val::TIMESTAMP WITH TIME ZONE as "dtVal",
val.tx_nota as "txNota",
val.tx_nota_op as "txNotaOp",
val.nr_val as "nrVal",
val.fg_val as "fgVal",
val.ts_modifica as "tsModifica",
val.ts_creazione as "tsCreazione"
FROM ${tabelle.val_attributo_ut} val
LEFT JOIN ${tabelle.attributo} attr on (attr.cd_attributo = val.cd_attributo)
LEFT JOIN ${tabelle.dominio_tcb} dom on (attr.ty_dominio_tcb = dom.ty_dominio_tcb and val.cd_val_attributo = dom.cd_dominio_tcb)
WHERE val.id_utente = $[idUtente] AND 
val.cd_attributo IN ($[arrayCdAttr:csv])
`;
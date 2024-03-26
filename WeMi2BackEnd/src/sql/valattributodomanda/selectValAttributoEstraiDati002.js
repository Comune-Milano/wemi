import tabelle from 'tabelle';

export const selectValAttributoEstraiDati002 = `
SELECT 
  valDom.cd_attributo AS "cdAttributo",
  valDom.cd_val_attributo AS "cdValAttributo", 
  valDom.fg_val AS flag, 
  valDom.tx_nota AS "txNota",
  valDom.ts_modifica AS "tsModifica", 
  attr.ty_dominio_tcb AS "dominioTcb"
FROM  ${tabelle.val_attributo_domanda} valDom
LEFT JOIN  ${tabelle.attributo} attr on (attr.cd_attributo = valDom.cd_attributo)
WHERE valDom.id_richiesta_servizio_tcb =  $[idRichiestaTcb] AND
  (valDom.cd_attributo = 46 or valDom.cd_attributo = 47 or valDom.cd_attributo = 51)
ORDER BY valDom.cd_attributo`;
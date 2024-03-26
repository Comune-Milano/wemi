import tabelle from 'tabelle';

export const selectForEstraiDatiConfig002 = `
SELECT 
  pg_beneficiario_richiesta_tcb AS "pgBen",
  valBen.cd_attributo AS "cdAttributo",
  valBen.cd_val_attributo AS "cdValAttributo", 
  valBen.nr_val AS "nrVal",
  valBen.tx_val AS "txVal",
  valBen.dt_val::timestamp with time zone AS "dtVal" ,
  valBen.fg_val AS flag, 
  valBen.tx_nota AS "txNota",
  valBen.tx_nota_op AS "txNotaOp",
  valBen.ts_ult_modifica AS "tsModifica", 
  dom.tl_valore_testuale AS "tlValoreTestuale", 
  attr.ty_dominio_tcb AS "dominioTcb", 
  rtcb.ts_creazione AS "tsCreazione"
FROM  ${tabelle.val_attributo_beneficiario} valBen
LEFT JOIN  ${tabelle.attributo} attr on (attr.cd_attributo = valBen.cd_attributo)
LEFT JOIN  ${tabelle.richiesta_servizio_tcb} rtcb 
on (rtcb.id_richiesta_servizio_tcb = valBen.id_richiesta_servizio_tcb)
LEFT JOIN  ${tabelle.dominio_tcb} dom 
on (attr.ty_dominio_tcb = dom.ty_dominio_tcb 
  and valBen.cd_val_attributo = dom.cd_dominio_tcb)
WHERE valBen.id_richiesta_servizio_tcb =  $[idRichiestaTcb] 
ORDER BY valBen.pg_beneficiario_richiesta_tcb, valBen.cd_attributo`;
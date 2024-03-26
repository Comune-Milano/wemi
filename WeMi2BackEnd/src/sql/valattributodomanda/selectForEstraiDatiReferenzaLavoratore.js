import tabelle from 'tabelle';

export const selectForEstraiDatiReferenzaLavoratore = `
SELECT 
val.tx_val ,
val.id_richiesta_servizio_tcb , 
val.cd_attributo ,
 dom.tl_valore_testuale , 
 val.tx_nota ,
 val.nr_val ,
 rtcb.qt_beneficiari ,
 attr.ty_dominio_tcb , 
 val.cd_val_attributo , 
 fg_val , 
 val.ts_modifica , 
 rtcb.ts_creazione 
  FROM ${tabelle.val_attributo_domanda} val
    LEFT JOIN ${tabelle.attributo} attr on (attr.cd_attributo = val.cd_attributo)
    LEFT JOIN ${tabelle.richiesta_servizio_tcb} rtcb on (rtcb.id_richiesta_servizio_tcb = val.id_richiesta_servizio_tcb)
    LEFT JOIN ${tabelle.dominio_tcb} dom on (attr.ty_dominio_tcb = dom.ty_dominio_tcb and val.cd_val_attributo = dom.cd_dominio_tcb)
  WHERE val.id_richiesta_servizio_tcb = $[idRichiestaTcb] AND 
        val.cd_attributo IN ($[arrayConfig:csv])
  `;
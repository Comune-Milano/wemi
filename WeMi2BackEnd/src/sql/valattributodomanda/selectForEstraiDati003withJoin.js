import tabelle from 'tabelle';
import { attributo } from 'constants/db/attributo';

export const selectForEstraiDati003withJoin = `
( 
  SELECT 
    val.id_richiesta_servizio_tcb AS "idRichiestaTcb", 
    attr.ty_dominio_tcb AS "dominioTcb", 
    val.cd_attributo AS "cdAttributo",
    val.cd_val_attributo AS "cdValAttributo", 
    dom.tl_valore_testuale  AS "tlValoreTestuale",
    val.tx_nota AS "txNota",
    attr2.ty_dominio_tcb AS "dominioTcb2", 
    relDom.pg_beneficiario_richiesta_tcb AS "pgBen",
    val.ts_modifica AS "tsModifica", 
    rtcb.ts_creazione AS "tsCreazione"
  FROM ${tabelle.val_attributo_domanda} AS val
  INNER JOIN ${tabelle.attributo} AS attr 
    ON (attr.cd_attributo = val.cd_attributo)
  INNER JOIN ${tabelle.val_attributo_rel_dom_serv_lav} AS relDom 
    ON (
      relDom.cd_attributo_1 = ${attributo.LS_MANSIONI_RICHIESTE_TATA} 
      and relDom.id_richiesta_servizio_tcb = val.id_richiesta_servizio_tcb
      and relDom.cd_val_attributo_1 = val.cd_val_attributo
    )
  INNER JOIN ${tabelle.dominio_tcb} AS dom 
    ON (
        attr.ty_dominio_tcb = dom.ty_dominio_tcb 
        and val.cd_val_attributo = dom.cd_dominio_tcb
    )
  INNER JOIN ${tabelle.attributo} AS attr2 
    ON (
      attr2.cd_attributo = relDom.cd_attributo_2
    )
  INNER JOIN ${tabelle.dominio_tcb} AS dom2 
    ON (
      attr2.ty_dominio_tcb = dom2.ty_dominio_tcb 
      and relDom.cd_val_attributo_2 = dom2.cd_dominio_tcb
    )
  INNER JOIN ${tabelle.richiesta_servizio_tcb} AS rtcb 
    ON (
      rtcb.id_richiesta_servizio_tcb = val.id_richiesta_servizio_tcb
    )
  WHERE val.id_richiesta_servizio_tcb = $[idRichiestaTcb] 
    and val.cd_attributo = ${attributo.LS_MANSIONI_RICHIESTE_TATA}  
)
  UNION ALL 
(
  SELECT 
    val.id_richiesta_servizio_tcb AS "idRichiestaTcb", 
    attr.ty_dominio_tcb AS "dominioTcb", 
    val.cd_attributo AS "cdAttributo",
    val.cd_val_attributo AS "cdValAttributo", 
    dom.tl_valore_testuale  AS "tlValoreTestuale",
    val.tx_nota AS "txNota",
    null as "dominioTcb2",  
    null as "pgBen",
    val.ts_modifica AS "tsModifica", 
    rtcb.ts_creazione AS "tsCreazione"
  FROM ${tabelle.val_attributo_domanda} AS val
  INNER JOIN ${tabelle.attributo} AS attr 
    ON (
      attr.cd_attributo = val.cd_attributo
    )
  INNER JOIN ${tabelle.richiesta_servizio_tcb} AS rtcb 
    ON (
      rtcb.id_richiesta_servizio_tcb = val.id_richiesta_servizio_tcb
    )
  INNER JOIN ${tabelle.dominio_tcb} AS dom 
    ON (
      attr.ty_dominio_tcb = dom.ty_dominio_tcb 
      and val.cd_val_attributo = dom.cd_dominio_tcb
    )
   WHERE val.id_richiesta_servizio_tcb = $[idRichiestaTcb] 
     and val.cd_attributo = ${attributo.LS_MANSIONI_RICHIESTE_TATA} 
     and val.cd_attributo NOT IN (
      SELECT relDom.cd_attributo_1
	    FROM ${tabelle.val_attributo_rel_dom_serv_lav} AS relDom 
	    WHERE (
        relDom.cd_attributo_1 = ${attributo.LS_MANSIONI_RICHIESTE_TATA} 
        and relDom.id_richiesta_servizio_tcb = val.id_richiesta_servizio_tcb
        and relDom.cd_val_attributo_1 = val.cd_val_attributo
        )
      )
)
`;
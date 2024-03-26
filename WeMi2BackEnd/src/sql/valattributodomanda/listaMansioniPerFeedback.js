export const listaMansioniPerFeedback = `
SELECT 
  tl_valore_testuale,
  val_attributo_domanda.tx_nota,
  cd_val_attributo,fg_mansione_svolta,
  val_attributo_domanda.cd_attributo,
  cd_dominio_tcb
FROM wemi2.val_attributo_domanda
INNER JOIN wemi2.attributo ON wemi2.attributo.cd_attributo = wemi2.val_attributo_domanda.cd_attributo 
      and wemi2.attributo.ty_dominio_tcb in (40, 41, 43)
INNER join wemi2.dominio_tcb ON wemi2.dominio_tcb.ty_dominio_tcb = attributo.ty_dominio_tcb
      and wemi2.dominio_tcb.cd_dominio_tcb = wemi2.val_attributo_domanda.cd_val_attributo
WHERE wemi2.val_attributo_domanda.id_richiesta_servizio_tcb =  $[id_richiesta_servizio_tcb]
ORDER BY val_attributo_domanda.cd_attributo`;
export const selectEtaBeneficiari =` 
SELECT 
  valBen.nr_val AS "nrVal"
FROM  wemi2.val_attributo_beneficiario valBen
LEFT JOIN  wemi2.attributo attr on (attr.cd_attributo = valBen.cd_attributo)
LEFT JOIN  wemi2.richiesta_servizio_tcb rtcb 
on (rtcb.id_richiesta_servizio_tcb = valBen.id_richiesta_servizio_tcb)
LEFT JOIN  wemi2.dominio_tcb dom 
on (attr.ty_dominio_tcb = dom.ty_dominio_tcb 
  and valBen.cd_val_attributo = dom.cd_dominio_tcb)
WHERE valBen.id_richiesta_servizio_tcb = $[idRichiestaTcb]`;
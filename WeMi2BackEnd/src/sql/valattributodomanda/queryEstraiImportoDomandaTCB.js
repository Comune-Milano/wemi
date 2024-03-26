export const queryEstraiImportoDomandaTCB= `
SELECT *
FROM wemi2.val_attributo_domanda val
WHERE val.id_richiesta_servizio_tcb = $[idRichiestaTcb] AND cd_attributo IN ($[arrCdAttributi:csv]) ;
`
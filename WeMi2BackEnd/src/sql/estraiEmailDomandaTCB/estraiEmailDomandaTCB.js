export const estraiEmailDomandaTCB = `
  SELECT tx_val
  FROM wemi2.val_attributo_domanda
  WHERE id_richiesta_servizio_tcb= $[idDomandaTCB] AND cd_attributo= $[cdAttributo];
`;
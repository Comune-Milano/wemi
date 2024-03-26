export const estraiByAttributiEidRichiesta = `
      SELECT CAST(cd_attributo as Int) as cd_attributo
      FROM wemi2.val_attributo_domanda
      WHERE cd_attributo IN ($[attributi:csv]) and id_richiesta_servizio_tcb = $[idRicTcb];
`;
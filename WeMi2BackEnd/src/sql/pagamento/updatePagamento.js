
export const updatePagamento = `
  UPDATE wemi2.pagamento
  SET
    js_dati_fatturazione = $[jsDatiFatturazione],
    js_dati_pagamento = $[jsDatiPagamento]
  WHERE id_interno_transazione = $[idInternoTransazione]
  RETURNING
    id_interno_transazione AS "idInternoTransazionePagamento",
    js_dati_fatturazione AS "jsDatiFatturazione",
    js_dati_pagamento AS "jsDatiPagamento";
`;
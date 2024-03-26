
export const insertPagamento = `
  INSERT INTO pagamento (
    id_interno_transazione,
    js_dati_fatturazione,
    js_dati_pagamento,
    ts_creazione
  )
  VALUES (
    $[idInternoTrans],
    $[jsDatiFatturazione],
    $[jsDatiPagamento],
    localtimestamp
  )
  RETURNING
    id_interno_transazione AS "idInternoTransazionePagamento",
    js_dati_fatturazione AS "jsDatiFatturazione",
    js_dati_pagamento AS "jsDatiPagamento"
`;

export const insertPagamentoFree = `
INSERT INTO pagamento (
  id_interno_transazione,
  js_dati_fatturazione,
  js_dati_pagamento,
  ts_creazione
)
VALUES (
  nextval('seq_pagamento'),
  $[jsDatiFatturazione],
  $[jsDatiPagamento],
  localtimestamp
)
RETURNING
  id_interno_transazione AS "idInternoTransazionePagamento",
  js_dati_fatturazione AS "jsDatiFatturazione",
  js_dati_pagamento AS "jsDatiPagamento"
`;

        
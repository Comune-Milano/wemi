
export const insertStatoPagamento = `
  INSERT INTO pagamento_stt (
    id_interno_trans_pag,
    ts_variazione_stato,
    cd_stato_pagamento,
    id_utente
  )
  VALUES (
    $[idInternoTransazionePagamento],
    localtimestamp,
    $[cdStatoPagamento],
    $[idUtente]
  )
`;

export const selectLatestSuccessfullPayment = `
  SELECT
    pagamento.id_interno_transazione as "idInternoTransazione",
    pagamento.js_dati_fatturazione as "jsDatiFatturazione",
    pagamento.js_dati_pagamento as "jsDatiPagamento",
    ts_creazione as "tsCreazione"
  FROM wemi2.pagamento_stt pagamento_stt
  INNER JOIN wemi2.pagamento pagamento ON 
    pagamento.id_interno_transazione = pagamento_stt.id_interno_trans_pag 
  WHERE pagamento_stt.id_utente = $[userId] AND
    pagamento_stt.cd_stato_pagamento = '1'
  ORDER BY pagamento_stt.ts_variazione_stato DESC
  LIMIT 1;
`;
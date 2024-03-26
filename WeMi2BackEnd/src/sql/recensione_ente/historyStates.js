import tabelle from 'tabelle';

export const historyStates = `
SELECT 
  id_rich_serv_rec, ts_variazione_stato, 
  cd_stato_recensione, 
  id_utente
FROM ${tabelle.recensione_ente_stt}
WHERE id_rich_serv_rec =$[id_rich_serv_rec]`;
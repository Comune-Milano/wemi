import tabelle from 'tabelle';

 export const insertStt = `
 INSERT INTO ${tabelle.ente_stt} (
   id_ente,
   ts_variazione_stato,
   cd_stato_ente,
   id_utente)
   VALUES (
     $[id_ente_rif], 
     localtimestamp, 
     $[cd_stato_ente],
     $[id_utente]
   )`;
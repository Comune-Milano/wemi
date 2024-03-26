import tabelle from 'tabelle';

export const insertForStatoContenutoUPD = `
INSERT INTO  ${tabelle.contenuto_stt} (
  id_contenuto, 
  ts_variazione_stato, 
  cd_stato_contenuto, 
  id_utente)
VALUES (
  $[id_contenuto],
  localtimestamp,
  $[cd_stato_contenuto],
  $[id_utente])
`;
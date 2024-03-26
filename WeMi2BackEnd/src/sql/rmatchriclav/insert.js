export const insertRMatchRicLav = `
INSERT INTO 
wemi2.r_match_ric_lav(
  id_richiesta, 
  id_lavoratore, 
  id_ult_operatore, 
  cd_stato_associazione, 
  tx_nota, 
  ts_ultima_modifica, 
  ts_creazione)
  VALUES 
( $[idRichiesta], 
  $[idLavoratore], 
  $[idUltimoOperatore], 
  $[statoAssociazione], 
  null, 
  localtimestamp, 
  localtimestamp);
`;
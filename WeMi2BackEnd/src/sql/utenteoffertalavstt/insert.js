export const insertStateUtenteOffertaLav =  `
INSERT INTO wemi2.utente_offerta_lav_stt 
(
  id_utente_lav,
  ts_variazione_stato,
  cd_stato_dati_lav,
  id_utente
) VALUES (
  $[idLavoratore],
  localtimestamp,
  $[offerState],
  $[idLavoratore]
 )`;
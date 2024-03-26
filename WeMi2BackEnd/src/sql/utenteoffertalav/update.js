export const changeStateUtenteOffertaLav =  `
UPDATE wemi2.utente_offerta_lav 
SET cd_ultimo_stato_offerta = $[offerState],
  ts_ultima_modifica = localtimestamp
 WHERE id_utente_lav = $[idLavoratore]`;
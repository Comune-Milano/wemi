
export const aggiornaUltimaModifica= `
  UPDATE wemi2.utente_offerta_lav
  SET id_ult_operatore= $[id_utente_mod], ts_ultima_modifica= localtimestamp
   WHERE id_utente_lav= $[id_lavoratore];`;
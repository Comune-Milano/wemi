export const inserisciAllegatoRichiestaCv = `
INSERT INTO wemi2.allegato_richiesta (
  id_allegato,
  id_richiesta,
  id_lavoratore,
  nm_nome_allegato_ric,
  oj_allegato_ric,
  ts_creazione
)

VALUES (
  nextval('wemi2.seq_allegato_offerta_lav'),
  $[idRichiesta],
  $[idLavoratore],
  $[nomeAllegato],
  $[byteMedia],
  localtimestamp
);
`;

export const inserisciAllegatoOffertaLav = `
INSERT INTO wemi2.allegato_offerta_lav (
  id_allegato, 
  id_utente_lav, 
  nm_nome_allegato_off, 
  oj_allegato_off,
  ts_creazione
)

VALUES (
  nextval('wemi2.seq_allegato_offerta_lav'),
  $[idLavoratore],
  $[nomeAllegato],
  $[byteMedia],
  localtimestamp
);
`;
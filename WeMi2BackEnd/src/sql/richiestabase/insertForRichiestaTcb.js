import tabelle from 'tabelle';

export const insertForRichiestaTcb = `
INSERT INTO ${tabelle.richiesta_servizio_base}(
  id_richiesta_servizio_base, 
  id_utente_richiedente, 
  ts_creazione,
  ty_richiesta
)
VALUES(
  setval($[sequenceRichiestaBase], 
  (SELECT COALESCE( CAST( MAX(id_richiesta_servizio_base) AS INT ), 199999 ) + 1 FROM wemi2.${tabelle.richiesta_servizio_base})), 
  $[id_utente_richiedente], 
  localtimestamp,
  $[ty_richiesta]
) 
returning *;`
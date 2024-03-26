import tabelle from 'tabelle';

export const insertRichiestaEnteTcb = `
INSERT INTO ${tabelle.richiesta_servizio_ente}(
  id_richiesta_servizio_ente,
  id_richiesta_servizio_base, 
  id_servizio_erogato_ente,
  ts_creazione)
VALUES (
  setval($[sequenceRichiestaEnte], 
  (SELECT COALESCE( CAST( MAX(id_richiesta_servizio_ente) AS INT ), 199999 ) + 1 FROM ${tabelle.richiesta_servizio_ente})),
  $[id_richiesta_servizio_base],
  $[id_servizio_erogato_ente],                       
  localtimestamp) 
RETURNING *;`;
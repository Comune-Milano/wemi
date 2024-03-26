import tabelle from 'tabelle';

export const insertDatiPropriEnte = `
INSERT INTO ${tabelle.datiPropriEnte} (
  id_ente_rif,
  ts_creazione
  ) 
VALUES (
 $[id_ente],
 localtimestamp
 )`;
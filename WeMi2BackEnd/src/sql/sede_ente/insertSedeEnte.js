import tabelle from 'tabelle';

export const insertSedeEnte =  `
INSERT INTO ${tabelle.sede_ente}(
  id_sede, 
  id_ente_rif, 
  ty_sede, 
  js_sede, 
  ts_creazione
  )
  VALUES (
  nextval($[nextval]),
  $[id_ente_rif], 
  $[ty_sede], 
  $[js_sede:json], 
  localtimestamp
  );
`;

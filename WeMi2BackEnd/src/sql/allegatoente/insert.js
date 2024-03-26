export const inserisciAllegatoEnteSql = `
INSERT INTO wemi2.allegato_ente (
  id_ente, 
  id_media, 
  ty_allegato
)
VALUES (
  $[id_ente],
  $[id_media],
  $[cd_dominio]
);
`;
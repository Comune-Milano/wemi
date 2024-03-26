export const inserisciMediaEnteSql = `
INSERT INTO wemi2.media (
  id_media,
  ty_mime_type_media,
  nm_nome_media,
  iw_path,
  oj_media,
  ty_visib_media,
  ts_creazione
)
VALUES (
  nextval('wemi2.seq_media'),
  $[ty_mime_type_media],
  $[nm_nome_media_new],
  CONCAT('media/', currval('wemi2.seq_media'), '_', $[nm_nome_media_new]),
  $[base64],
  null,
  LOCALTIMESTAMP
)
RETURNING id_media;
`;


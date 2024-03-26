import tabelle from 'tabelle';

export const insertMediaForModificaContenuto = `
  INSERT INTO ${tabelle.media} (
    id_media,
    ty_mime_type_media,
    nm_nome_media,
    oj_media,
    ts_creazione,
    iw_path
  )
  VALUES (
    nextval($[nextvalMedia]),
    $[ty_mime_type_media],
    $[nm_nome_media],
    $[oj_media],
    localtimestamp,
    CASE $[build_iw_path] WHEN true 
      THEN CONCAT('media/', currval($[nextvalMedia]), '_', $[nm_nome_media])
      ELSE null
    END
  )
  returning *;
`;
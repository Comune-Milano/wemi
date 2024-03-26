import tabelle from 'tabelle';

export const insertForContenutoMediaAdd = `
  INSERT INTO ${tabelle.media} (
    id_media,
    ty_mime_type_media,
    nm_nome_media,
    oj_media,
    iw_path,
    ts_creazione
  )
  VALUES (
    nextval('wemi2.seq_media'), 
    $[ty_mime_type_media], 
    $[nm_nome_media],
    $[oj_media],
    CASE $[build_iw_path] WHEN true 
      THEN CONCAT('media/', currval('wemi2.seq_media'), '_', $[nm_nome_media])
      ELSE null
    END
    ,
    localtimestamp
  )
  returning *;
`;
import tabelle from 'tabelle';

export const updateMediaForModificaContenuto = `
  UPDATE ${tabelle.media} 
  SET 
    ty_mime_type_media = $[ty_mime_type_media],
    nm_nome_media = $[nm_nome_media],
    oj_media = $[oj_media],
    iw_path = CONCAT('media/', $[id_media], '_', $[nm_nome_media]),
    ts_creazione= localtimestamp
  WHERE id_media = $[id_media]
  returning *;
`;
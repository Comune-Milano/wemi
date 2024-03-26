import { STORAGE_ABS_PATH } from 'environment';

export const selectMediaById = 'SELECT * FROM media WHERE id_media=$[id_media]';

export const selectById = `
SELECT 
  m.id_media as "id",
  m.nm_nome_media as "name", 
  m.ty_mime_type_media as "type",
  convert_from(m.oj_media, 'UTF-8') as "blob", 
  CASE WHEN m.iw_path IS NOT NULL
    THEN CONCAT('${STORAGE_ABS_PATH}', '/', m.iw_path)
  END as "storagePath"
FROM media m
WHERE m.id_media=$[id]`;

export const estraiLogoEnte = `
SELECT 
    medialogo.id_media as "id",
    medialogo.nm_nome_media as "name", 
    medialogo.ty_mime_type_media as "type",
    convert_from(medialogo.oj_media, 'UTF-8') as "blob", 
    CASE WHEN medialogo.iw_path IS NOT NULL
      THEN CONCAT('${STORAGE_ABS_PATH}', '/', medialogo.iw_path)
    END as "storagePath"
FROM wemi2.media as medialogo
INNER JOIN wemi2.dati_propri_ente as dpe 
  ON medialogo.id_media = dpe.id_img_logo
WHERE dpe.id_ente_rif = $[institutionId];
`;
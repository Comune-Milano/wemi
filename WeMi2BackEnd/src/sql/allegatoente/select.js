import { STORAGE_ABS_PATH } from 'environment';

export const estraiAllegatoEnteSql = `
SELECT 
convert_from(oj_media, 'UTF-8') as oj_media
FROM wemi2.media
WHERE id_media = $[id_media];
`;

export const estraiInformazioniAllegatoSql =  `
SELECT 
  attachment.id_media as "id",
  attachment.nm_nome_media as "name", 
  attachment.ty_mime_type_media as "mimetype",
  convert_from(attachment.oj_media, 'UTF-8') as "blob", 
  CASE WHEN attachment.iw_path IS NOT NULL
    THEN CONCAT('${STORAGE_ABS_PATH}', '/', attachment.iw_path)
  END as "storagePath"
FROM wemi2.media as attachment
INNER JOIN wemi2.allegato_ente as allegato 
  ON attachment.id_media =  allegato.id_media
  and allegato.ty_allegato = $[tipo] 
WHERE allegato.id_ente = $[institutionId];
`;

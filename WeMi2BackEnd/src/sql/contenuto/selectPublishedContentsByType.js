import { STORAGE_ABS_PATH } from "environment";

export const selectPublishedContentsByType = `
SELECT 
  COUNT(*) OVER() AS count,
  c.id_contenuto as "id",
  c.tl_testo_1 ->> '$[locale:value]' as "title",
  c.tl_testo_2 ->> '$[locale:value]' as "description",
  c.js_dati_contenuto as "data",
  c.nr_ordine_visualizzazione as "progressive",
  c.ln_link_1 as "link",
  json_build_object(
    'id',
    m.id_media,
    'path',
    CONCAT('${STORAGE_ABS_PATH}', '/', m.iw_path)
  ) as "image"
FROM wemi2.contenuto c
LEFT OUTER JOIN wemi2.contenuto_stt cstt
  ON cstt.id_contenuto = c.id_contenuto
    AND cstt.ts_variazione_stato = (
          SELECT MAX(ts_variazione_stato)
          FROM wemi2.contenuto_stt 
          WHERE id_contenuto = c.id_contenuto
        )
LEFT JOIN wemi2.dominio d 
  ON d.ty_dominio = 'STATO_CONTENUTO' 
    AND CAST(d.cd_dominio AS Int) = CAST(cstt.cd_stato_contenuto AS Int)
INNER JOIN wemi2.media m on c.id_media1 = m.id_media
WHERE c.ty_contenuto = $[typeContent] AND cstt.cd_stato_contenuto = $[state]
ORDER BY c.nr_ordine_visualizzazione ASC
`;

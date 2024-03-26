import { STORAGE_ABS_PATH } from 'environment';

export const whereClauseTypeContent = 'c.ty_contenuto = $[typeContent]';

export const limitClauseContent = 'LIMIT $[elementsPerPage] OFFSET $[offset]';

export const whereClauseSearchDescriptionContent = 'AND (LOWER(c.tl_testo_1 ->> \'$[locale:value]\') LIKE LOWER($[description]) OR $[description] is null)';

export const whereClauseSearchStateContent = 'AND cstt.cd_stato_contenuto = $[state]';

export const whereClauseSearchCodeContent = 'AND (LOWER(c.cd_contenuto) LIKE LOWER($[code]) OR $[code] is null)';

export const orderClauseIdentifierContent = 'c.id_contenuto DESC';

export const orderClauseVisualizationOrderContent = 'c.nr_ordine_visualizzazione ASC';

export const orderClauseAlphabeticContent = `
  c.tl_testo_1 ->> '$[locale:value]' ASC
`;

export const selectListContent = `
SELECT 
  COUNT(*) OVER() AS count,
  c.id_contenuto as "id",
  c.tl_testo_1 ->> '$[locale:value]' as "title",
  c.pg_versione as "version",
  c.nr_ordine_visualizzazione as "progressive",
  TRIM(c.cd_contenuto) as "code",
  json_build_object(
    'id',
    cstt.cd_stato_contenuto,
    'description',
    d.tl_valore_testuale ->> '$[locale:value]'
  ) as "state"
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
  `;

export const selectListServiceContent = `
SELECT 
  COUNT(*) OVER() AS count,
  c.id_contenuto as "id",
  c.tl_testo_1 ->> '$[locale:value]' as "title",
  c.pg_versione as "version",
  c.nr_ordine_visualizzazione as "progressive",
  contenuto.tl_testo_1 ->> '$[locale:value]' as "catAccreditamento",
  TRIM(c.cd_contenuto) as "code",
  json_build_object(
    'id',
    cstt.cd_stato_contenuto,
    'description',
    d.tl_valore_testuale ->> '$[locale:value]'
  ) as "state"
FROM wemi2.contenuto c
LEFT OUTER JOIN wemi2.contenuto_stt cstt
  ON cstt.id_contenuto = c.id_contenuto
    AND cstt.ts_variazione_stato = (
          SELECT MAX(ts_variazione_stato)
          FROM wemi2.contenuto_stt 
          WHERE id_contenuto = c.id_contenuto
        )
        LEFT OUTER JOIN wemi2.servizio servizio
        ON servizio.id_servizio=c.id_contenuto
       LEFT OUTER JOIN wemi2.contenuto contenuto
        ON contenuto.id_contenuto=servizio.id_categoria_accreditamento 

      
LEFT JOIN wemi2.dominio d 
  ON d.ty_dominio = 'STATO_CONTENUTO' 
    AND CAST(d.cd_dominio AS Int) = CAST(cstt.cd_stato_contenuto AS Int)
  `;

export const selectContentList = `
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
`;

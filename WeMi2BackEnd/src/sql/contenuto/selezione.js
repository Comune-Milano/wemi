import { STORAGE_ABS_PATH } from 'environment';
import tabelle from 'tabelle';
import { cdContenuto018 } from 'constants/db/cdContenuto018';

export const findContentWithState = `SELECT
c.id_contenuto,
id_contenuto_rif,
pg_versione,
nr_ordine_visualizzazione,
ty_sottotipo_contenuto,
pg_versione,
tl_testo_1,
tl_testo_2,
tl_testo_3,
tl_testo_4,
tl_testo_5,
cd_stato_contenuto,
js_dati_contenuto,
CASE cd_stato_contenuto 
   when 1 then 'Draft' 
   when 2 then 'Pubblicato'
   when 3 then 'Disattivato'
     ELSE cd_stato_contenuto::varchar
     END AS cd_stato_contenuto_desc      
FROM wemi2.contenuto c
LEFT OUTER JOIN wemi2.contenuto_stt cstt
ON cstt.id_contenuto = c.id_contenuto
AND cstt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                               FROM wemi2.contenuto_stt
                               WHERE id_contenuto = c.id_contenuto)
WHERE   ty_contenuto=$[ty_contenuto] 
AND (cd_stato_contenuto=$[cd_stato_contenuto] OR $[cd_stato_contenuto] is null)
AND
(LOWER(tl_testo_1 ->> 'it') LIKE LOWER($[ricerca]) OR $[ricerca] is null)

ORDER BY c.id_contenuto DESC
LIMIT 20 OFFSET $[offset]; 
`;

export const findCountOfContentWithState = `SELECT COUNT(distinct c.id_contenuto)
FROM wemi2.contenuto c
LEFT OUTER JOIN wemi2.contenuto_stt cstt
    ON cstt.id_contenuto = c.id_contenuto
      AND cstt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
                                     FROM wemi2.contenuto_stt
                                     WHERE id_contenuto = c.id_contenuto)
WHERE   ty_contenuto=$[ty_contenuto] 
    AND (cd_stato_contenuto=$[cd_stato_contenuto] OR $[cd_stato_contenuto] is null)
    AND
    (LOWER(tl_testo_1 ->> 'it') LIKE LOWER($[ricerca]) OR $[ricerca] is null);`;

export const selectPublishedContentsByType = `
  SELECT  
    contenuto.id_contenuto,
    ty_contenuto,
    id_contenuto_rif,
    ty_sottotipo_contenuto,
    nr_ordine_visualizzazione,
    pg_versione,
    tl_testo_1,
    tl_testo_2,
    tl_testo_3,
    tl_testo_4,
    tl_testo_5,
    ln_link_1,
    ln_link_2,
    id_media1,
    id_media2,
    id_media3,
    dt_inizio_val,
    dt_fine_val,
    js_dati_contenuto,
    ts_creazione
  FROM ${tabelle.contenuto} AS contenuto
    LEFT JOIN ${tabelle.contenuto_stt} AS contenuto_stt
    ON contenuto_stt.id_contenuto = contenuto.id_contenuto
  WHERE
    ty_contenuto = $[tyContenuto] AND
    contenuto_stt.cd_stato_contenuto = 2 AND
    ts_variazione_stato = (
      SELECT MAX(ts_variazione_stato)
      FROM ${tabelle.contenuto_stt}
      WHERE contenuto_stt.id_contenuto = contenuto.id_contenuto
    )
  ORDER BY nr_ordine_visualizzazione ASC;
`;

export const selectPublishedPrivacyContent = `
  SELECT  
    contenuto.id_contenuto,
    ty_contenuto,
    id_contenuto_rif,
    ty_sottotipo_contenuto,
    nr_ordine_visualizzazione,
    pg_versione,
    tl_testo_1,
    tl_testo_2,
    tl_testo_3,
    tl_testo_4,
    tl_testo_5,
    ln_link_1,
    ln_link_2,
    id_media1,
    id_media2,
    id_media3,
    dt_inizio_val,
    dt_fine_val,
    js_dati_contenuto,
    ts_creazione
  FROM ${tabelle.contenuto} AS contenuto
    LEFT JOIN ${tabelle.contenuto_stt} AS contenuto_stt
    ON contenuto_stt.id_contenuto = contenuto.id_contenuto
  WHERE
    ty_contenuto = 11 AND
    contenuto_stt.cd_stato_contenuto = 2 AND
    CAST(contenuto.tl_testo_1->>'it' AS text) = 'template_privacy' AND
    ts_variazione_stato = (
      SELECT MAX(ts_variazione_stato)
      FROM ${tabelle.contenuto_stt}
      WHERE contenuto_stt.id_contenuto = contenuto.id_contenuto
    );
`;

export const selectById = `
  SELECT 
    contenuto_principale.id_contenuto,
    contenuto_principale.ty_contenuto, 
    contenuto_principale.id_contenuto_rif,
    contenuto_principale.ty_sottotipo_contenuto, 
    TRIM(contenuto_principale.cd_contenuto) as "code", 
    contenuto_principale.nr_ordine_visualizzazione, 
    contenuto_principale.pg_versione, 
    contenuto_principale.tl_testo_1, 
    contenuto_principale.tl_testo_2, 
    contenuto_principale.tl_testo_3, 
    contenuto_principale.tl_testo_4, 
    contenuto_principale.tl_testo_5, 
    contenuto_principale.ln_link_1, 
    contenuto_principale.ln_link_2, 
    contenuto_principale.id_media1, 
    contenuto_principale.id_media2, 
    contenuto_principale.id_media3, 
    contenuto_principale.dt_inizio_val::timestamp with time zone, 
    contenuto_principale.dt_fine_val::timestamp with time zone,
    contenuto_principale.js_dati_contenuto, 
    contenuto_principale.ts_creazione,
    associato.id_contenuto as associato_id_contenuto,
    associato.ty_contenuto as associato_ty_contenuto, 
    associato.id_contenuto_rif as associato_id_contenuto_rif,
    associato.ty_sottotipo_contenuto as associato_ty_sottotipo, 
    associato.nr_ordine_visualizzazione as associato_ordine_visualizzazione, 
    associato.pg_versione as associato_pg_versione, 
    associato.tl_testo_1 as associato_tl_testo_1, 
    associato.tl_testo_2 as associato_tl_testo_2, 
    associato.tl_testo_3 as associato_tl_testo_3, 
    associato.tl_testo_4 as associato_tl_testo_4, 
    associato.tl_testo_5 as associato_tl_testo_5, 
    associato.ln_link_1 as associato_ln_link_1, 
    associato.ln_link_2 as associato_ln_link_2, 
    associato.id_media1 as associato_id_media_1, 
    associato.id_media2 as associato_id_media_2, 
    associato.id_media3 as associato_id_media_3, 
    associato.dt_inizio_val as associato_dt_inizio_val, 
    associato.dt_fine_val as associato_dt_fine_val,
    associato.js_dati_contenuto as associato_js_dati_contenuto, 
    associato.ts_creazione as associato_ts_creazione,
    media1.id_media as media1_id_media,
    media1.ty_mime_type_media as media1_ty_mime,
    media1.nm_nome_media as media1_nm_nome_media,
    CONCAT('${STORAGE_ABS_PATH}', '/', media1.iw_path) as path1,
    media1.ts_creazione as media1_ts_creazione,
    media2.id_media as media2_id_media,
    media2.ty_mime_type_media as media2_ty_mime,
    media2.nm_nome_media as media2_nm_nome_media,
    CONCAT('${STORAGE_ABS_PATH}', '/', media2.iw_path) as path2,
    media2.ts_creazione as media2_ts_creazione,
    media3.id_media as media3_id_media,
    media3.ty_mime_type_media as media3_ty_mime,
    media3.nm_nome_media as media3_nm_nome_media,
    CONCAT('${STORAGE_ABS_PATH}', '/', media3.iw_path) as path3,
    media3.ts_creazione as media3_ts_creazione,
    servizio.cd_unita_prezzo,
    servizio.tx_tags_ricerca,
    servizio.id_categoria_accreditamento
  FROM wemi2.contenuto as contenuto_principale
    LEFT JOIN wemi2.media as media1 ON media1.id_media = contenuto_principale.id_media1
    LEFT JOIN wemi2.media as media2 ON media2.id_media = contenuto_principale.id_media2
    LEFT JOIN wemi2.media as media3 ON media3.id_media = contenuto_principale.id_media3
    LEFT JOIN wemi2.contenuto_associato ON id_contenuto_primario = contenuto_principale.id_contenuto
    LEFT JOIN wemi2.servizio ON contenuto_principale.id_contenuto = id_servizio
    LEFT OUTER JOIN wemi2.contenuto as associato ON associato.id_contenuto = id_contenuto_associato
  WHERE contenuto_principale.id_contenuto = $[idContent]
  ORDER BY contenuto_principale.nr_ordine_visualizzazione ASC;
`;

export const selectMaxOrder = `
  SELECT MAX(nr_ordine_visualizzazione) as "order"
  FROM wemi2.contenuto c
  WHERE c.ty_contenuto = $[type];
`;

export const selectCdContenutoFromServizioErogatoEnte = `
  select DISTINCT TRIM(c.cd_contenuto) as cd_contenuto
  from wemi2.servizio_erogato_ente see
  inner join wemi2.contenuto_associato ca1 on see.id_servizio_riferimento = ca1.id_contenuto_primario and ca1.nm_relazione = 'CL2'
  inner join wemi2.contenuto_associato ca2 on ca1.id_contenuto_associato = ca2.id_contenuto_primario and ca2.nm_relazione = 'CL1'
  inner join wemi2.contenuto_associato ca3 on ca2.id_contenuto_associato = ca3.id_contenuto_primario and ca3.nm_relazione = 'SEZ'
  inner join wemi2.contenuto c on ca3.id_contenuto_associato = c.id_contenuto
  where 
    c.cd_contenuto = '${cdContenuto018}' and 
    see.id_servizio_ente = $[id_servizio_ente];
    `;

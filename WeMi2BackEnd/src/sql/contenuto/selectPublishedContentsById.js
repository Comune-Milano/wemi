export const selectPublishedContentsById = `
SELECT
c.id_contenuto,
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
      c.ts_creazione,
      id_contenuto_primario,
      id_contenuto_associato,
      nm_relazione,
      cass.ts_creazione AS "ts_creazioneASS",
      ts_variazione_stato,
      cd_stato_contenuto,
      id_utente,
      m1.ty_mime_type_media AS "ty_mime_type_media1",
      m1.nm_nome_media AS "nm_nome_media1",
      convert_from(m1.oj_media, 'UTF-8') AS "oj_media1",
      m2.ty_mime_type_media AS "ty_mime_type_media2",
      m2.nm_nome_media AS "nm_nome_media2",
      convert_from(m2.oj_media, 'UTF-8') AS "oj_media2",
      m3.ty_mime_type_media AS "ty_mime_type_media3",
      m3.nm_nome_media AS "nm_nome_media3",
      convert_from(m3.oj_media, 'UTF-8') as "oj_media3"
FROM wemi2.contenuto c
LEFT OUTER JOIN wemi2.contenuto_associato cass
  ON (c.id_contenuto = id_contenuto_primario)

LEFT OUTER JOIN wemi2.media m1
  ON (c.id_media1 = m1.id_media)

LEFT OUTER JOIN wemi2.media m2
  ON (c.id_media2 = m2.id_media)

LEFT OUTER JOIN wemi2.media m3
  ON (c.id_media3 = m3.id_media)

LEFT OUTER JOIN wemi2.contenuto_stt cstt
  ON cstt.id_contenuto = c.id_contenuto
  AND cstt.ts_variazione_stato = (
        SELECT MAX(ts_variazione_stato)
        FROM wemi2.contenuto_stt 
        WHERE id_contenuto = c.id_contenuto
      )
WHERE c.id_contenuto = $[idContenuto] AND cstt.cd_stato_contenuto = 2;`;
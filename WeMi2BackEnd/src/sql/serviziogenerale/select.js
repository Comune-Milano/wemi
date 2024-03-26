
export const selectTagsByServizio = `
  SELECT
    id_servizio,
    tx_tag_ricerca
  FROM
    wemi2.servizio_tag
  WHERE
    id_servizio = $[idServizio]
`;

export const selectTagsByFilter = `
  SELECT
    DISTINCT st.tx_tag_ricerca
  FROM
    wemi2.servizio_tag st
  INNER JOIN wemi2.servizio_erogato_ente see ON 
    see.id_servizio_riferimento = st.id_servizio
  INNER JOIN wemi2.contenuto c ON 
  	c.id_contenuto = st.id_servizio 
  INNER JOIN wemi2.contenuto_stt cs ON 
    cs.id_contenuto = c.id_contenuto 
  INNER JOIN wemi2.srv_prezzo sp ON 
    sp.id_servizio_ente = see.id_servizio_ente
  INNER JOIN wemi2.ente e ON 
    e.id_ente = see.id_ente_erogatore
  INNER JOIN wemi2.servizio_erogato_ente_stt stt ON 
    stt.id_servizio_ente = see.id_servizio_ente
  INNER JOIN wemi2.ente_stt estt ON 
    estt.id_ente = e.id_ente
  WHERE
    tx_tag_ricerca LIKE \'%$1#%\' 
    AND cd_stato_contenuto >= 2 
    AND CURRENT_DATE >= sp.dt_inizio
    AND (CURRENT_DATE <= sp.dt_fine OR sp.dt_fine IS NULL)
    AND stt.ts_variazione_stato = (
      SELECT MAX(istt.ts_variazione_stato)
      FROM wemi2.servizio_erogato_ente_stt istt 
      WHERE istt.id_servizio_ente = see.id_servizio_ente
    )
    AND estt.ts_variazione_stato = (
      SELECT MAX(istt.ts_variazione_stato)
      FROM wemi2.ente_stt istt 
      WHERE istt.id_ente = e.id_ente
    )
    AND stt.cd_stato_dati_servizio_ente = 31
    AND estt.cd_stato_ente = '31'
`;

export const selectServices = `
  SELECT
    contenuto.id_contenuto,
    tl_testo_1
  FROM 
  wemi2.contenuto contenuto
  inner join wemi2.servizio servizio on contenuto.id_contenuto = servizio.id_servizio
  inner join wemi2.contenuto_associato contenuto_associato on contenuto.id_contenuto = contenuto_associato.id_contenuto_primario
  inner join wemi2.contenuto_stt contenuto_stt ON contenuto_stt.id_contenuto = contenuto.id_contenuto
  inner join wemi2.servizio_erogato_ente see ON see.id_servizio_riferimento = contenuto_associato.id_contenuto_primario
  inner join wemi2.ente e ON e.id_ente = see.id_ente_erogatore
  inner join wemi2.servizio_erogato_ente_stt seestt ON seestt.id_servizio_ente = see.id_servizio_ente
  inner join wemi2.ente_stt estt ON estt.id_ente = e.id_ente
  inner join wemi2.srv_prezzo sp ON sp.id_servizio_ente = see.id_servizio_ente
`;

export const selectServicesTag = `
  SELECT
    contenuto.id_contenuto,
    tl_testo_1,
    servizio_tag.tx_tag_ricerca
  FROM 
  wemi2.contenuto contenuto
  inner join wemi2.servizio servizio on contenuto.id_contenuto = servizio.id_servizio
  inner join wemi2.contenuto_associato contenuto_associato on contenuto.id_contenuto = contenuto_associato.id_contenuto_primario
  inner join wemi2.contenuto_stt contenuto_stt ON contenuto_stt.id_contenuto = contenuto.id_contenuto
  inner join wemi2.servizio_erogato_ente see ON see.id_servizio_riferimento = contenuto_associato.id_contenuto_primario
  inner join wemi2.ente e ON e.id_ente = see.id_ente_erogatore
  inner join wemi2.servizio_erogato_ente_stt seestt ON seestt.id_servizio_ente = see.id_servizio_ente
  inner join wemi2.ente_stt estt ON estt.id_ente = e.id_ente
  inner join wemi2.srv_prezzo sp ON sp.id_servizio_ente = see.id_servizio_ente
  inner join wemi2.servizio_tag servizio_tag on servizio.id_servizio = servizio_tag.id_servizio
`;

export const conditionHelper = `
  WHERE TRUE
`;

export const conditionCategory = `
  AND contenuto_associato.id_contenuto_associato = $1 and contenuto_associato.nm_relazione = 'CL2'
`;

export const conditionServices = `
  AND contenuto_stt.cd_stato_contenuto= 2
  AND contenuto_stt.ts_variazione_stato = (
    select MAX(ts_variazione_stato)
    from wemi2.contenuto_stt
    where id_contenuto =  contenuto.id_contenuto
  )
  AND seestt.ts_variazione_stato = (
    SELECT MAX(istt.ts_variazione_stato)
    FROM wemi2.servizio_erogato_ente_stt istt 
    WHERE istt.id_servizio_ente = see.id_servizio_ente
  )
  AND estt.ts_variazione_stato = (
    SELECT MAX(istt.ts_variazione_stato)
    FROM wemi2.ente_stt istt 
    WHERE istt.id_ente = e.id_ente
  )
  AND seestt.cd_stato_dati_servizio_ente = 31
  AND estt.cd_stato_ente = '31'
  AND CURRENT_DATE >= sp.dt_inizio
  AND (CURRENT_DATE <= sp.dt_fine OR sp.dt_fine IS NULL)
`;

export const conditionServicesCategory = `
  GROUP BY contenuto.id_contenuto
  HAVING count(distinct e.id_ente) > 0
`;

export const conditionTag = `
  AND servizio_tag.tx_tag_ricerca = $1
  GROUP BY contenuto.id_contenuto,servizio_tag.tx_tag_ricerca
  HAVING count(distinct e.id_ente) > 0
`;


export const selectCategory = `
  SELECT
    id_media,
    convert_from(oj_media, 'UTF-8') as oj_media, 
    cnt.id_contenuto as "idCategoria",
    cnt.tl_testo_1 as "txTitoloCategoria",
    cnt.tl_testo_2 as "txDescrizioneCategoria"
  FROM wemi2.contenuto as cnt
    LEFT JOIN wemi2.media ON cnt.id_media1= id_media
    INNER JOIN wemi2.contenuto_stt on wemi2.contenuto_stt.id_contenuto= $[idCategoria]
  WHERE cnt.id_contenuto=$[idCategoria] 
    AND 
    wemi2.contenuto_stt.cd_stato_contenuto=2 
    AND ts_variazione_stato = (
      SELECT MAX(ts_variazione_stato)
      FROM wemi2.contenuto_stt
      WHERE id_contenuto =  $[idCategoria] 
  )
`;

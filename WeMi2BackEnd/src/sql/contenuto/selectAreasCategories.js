import { CD_CONTENUTO_AREA } from 'constants/db/cdContenuto';
import { RELATION_NAME } from 'constants/db/relazioni';
import { CONTENT_STATE } from 'constants/db/contentstate';
import { STATO_SCHEDA_ENTE } from 'constants/db/statoschedaente';
import { tyContenuto } from 'constants/db/ty_contenuto';
import { STORAGE_ABS_PATH } from 'environment';

export const selectCategoriesAll = `
SELECT
  contenutosezione.id_contenuto AS "idSezione",
  contenutosezione.tl_testo_1 AS "txTitoloSezione",
  contenutosezione.nr_ordine_visualizzazione AS "ordineVisualizzazioneSezione",
  contenutoarea.id_contenuto AS "idArea",
  contenutoarea.tl_testo_1 AS "txTitoloArea",
  contenutoarea.nr_ordine_visualizzazione AS "ordineVisualizzazioneArea",
  contenutocategoria.id_contenuto AS "idCategoria",
  contenutocategoria.nr_ordine_visualizzazione AS "ordineVisualizzazioneCategoria",
  contenutocategoria.tl_testo_1 AS "txTitoloCategoria",
  contenutocategoria.tl_testo_2 AS "description",
  contenutocategoria.ty_sottotipo_contenuto AS "sottotipo",
  id_media,
  ty_mime_type_media,
  nm_nome_media,
  CONCAT('${STORAGE_ABS_PATH}', '/', iw_path) AS "iw_path",
  convert_from(oj_media, 'UTF-8') AS "oj_media"
FROM wemi2.contenuto contenutocategoria
INNER JOIN wemi2.contenuto_stt sa ON sa.id_contenuto= contenutocategoria.id_contenuto
and sa.cd_stato_contenuto=${CONTENT_STATE.PUBLISHED}
and sa.ts_variazione_stato = (select MAX(ts_variazione_stato)
                              from wemi2.contenuto_stt
                              where id_contenuto =  contenutocategoria.id_contenuto)	
							  
INNER JOIN wemi2.contenuto_associato associatoarea ON associatoarea.id_contenuto_primario = contenutocategoria.id_contenuto
INNER JOIN wemi2.contenuto contenutoarea ON contenutoarea.id_contenuto = associatoarea.id_contenuto_associato and contenutoarea.ty_contenuto = ${tyContenuto.AREA}
INNER JOIN wemi2.contenuto_stt sx ON sx.id_contenuto= contenutoarea.id_contenuto
and sx.cd_stato_contenuto=${CONTENT_STATE.PUBLISHED}
and sx.ts_variazione_stato = (select MAX(ts_variazione_stato)
                              from wemi2.contenuto_stt
                              where id_contenuto =  contenutoarea.id_contenuto)							  

INNER JOIN wemi2.contenuto_associato associatosezione on associatosezione.id_contenuto_primario = contenutoarea.id_contenuto and associatosezione.nm_relazione = '${RELATION_NAME.SEZIONE}'
INNER JOIN wemi2.contenuto contenutosezione on contenutosezione.id_contenuto = associatosezione.id_contenuto_associato and contenutosezione.cd_contenuto = $[cdContenutoSez] and contenutosezione.ty_contenuto = ${tyContenuto.SEZIONI}
INNER JOIN wemi2.contenuto_stt ss ON ss.id_contenuto= contenutosezione.id_contenuto
and ss.cd_stato_contenuto=${CONTENT_STATE.PUBLISHED}
and ss.ts_variazione_stato = (select MAX(ts_variazione_stato)
                              from wemi2.contenuto_stt
                              where id_contenuto =  contenutosezione.id_contenuto)	
							  						  
LEFT JOIN  wemi2.media ON contenutocategoria.id_media1 = id_media
`;

export const selectCategoriesWithServices = `
SELECT
  contenutosezione.id_contenuto AS "idSezione",
  contenutosezione.tl_testo_1 AS "txTitoloSezione",
  contenutosezione.nr_ordine_visualizzazione AS "ordineVisualizzazioneSezione",
  contenutoarea.id_contenuto AS "idArea",
  contenutoarea.tl_testo_1 AS "txTitoloArea",
  contenutoarea.nr_ordine_visualizzazione AS "ordineVisualizzazioneArea",
  contenutocategoria.id_contenuto AS "idCategoria",
  contenutocategoria.nr_ordine_visualizzazione AS "ordineVisualizzazioneCategoria",
  contenutocategoria.tl_testo_1 AS "txTitoloCategoria",
  contenutocategoria.tl_testo_2 AS "description",
  contenutocategoria.ty_sottotipo_contenuto AS "sottotipo",
  contenutoservizio.id_contenuto as "idServizio",
  id_media,
  ty_mime_type_media,
  nm_nome_media,
  CONCAT('${STORAGE_ABS_PATH}', '/', iw_path) AS "iw_path",
  convert_from(oj_media, 'UTF-8') AS "oj_media"
FROM wemi2.contenuto contenutocategoria
INNER JOIN wemi2.contenuto_stt sa ON sa.id_contenuto= contenutocategoria.id_contenuto
and sa.cd_stato_contenuto=${CONTENT_STATE.PUBLISHED}
and sa.ts_variazione_stato = (select MAX(ts_variazione_stato)
                              from wemi2.contenuto_stt
                              where id_contenuto =  contenutocategoria.id_contenuto)	
							  
INNER JOIN  wemi2.contenuto_associato associatoarea ON associatoarea.id_contenuto_primario = contenutocategoria.id_contenuto
INNER JOIN  wemi2.contenuto contenutoarea ON contenutoarea.id_contenuto = associatoarea.id_contenuto_associato and contenutoarea.ty_contenuto = ${tyContenuto.AREA}
INNER JOIN wemi2.contenuto_stt sx ON sx.id_contenuto= contenutoarea.id_contenuto
and sx.cd_stato_contenuto=${CONTENT_STATE.PUBLISHED}
and sx.ts_variazione_stato = (select MAX(ts_variazione_stato)
                              from wemi2.contenuto_stt
                              where id_contenuto =  contenutoarea.id_contenuto)							  

INNER JOIN wemi2.contenuto_associato associatosezione on associatosezione.id_contenuto_primario = contenutoarea.id_contenuto and associatosezione.nm_relazione = '${RELATION_NAME.SEZIONE}'
INNER JOIN wemi2.contenuto contenutosezione on contenutosezione.id_contenuto = associatosezione.id_contenuto_associato and contenutosezione.ty_contenuto = ${tyContenuto.SEZIONI}
INNER JOIN wemi2.contenuto_stt ss ON ss.id_contenuto= contenutosezione.id_contenuto
and ss.cd_stato_contenuto=${CONTENT_STATE.PUBLISHED}
and ss.ts_variazione_stato = (select MAX(ts_variazione_stato)
                              from wemi2.contenuto_stt
                              where id_contenuto =  contenutosezione.id_contenuto)	

INNER JOIN wemi2.contenuto_associato contenuto_associato ON contenuto_associato.id_contenuto_associato = contenutocategoria.id_contenuto
INNER JOIN wemi2.contenuto contenutoservizio ON contenutoservizio.id_contenuto = contenuto_associato.id_contenuto_primario
INNER JOIN wemi2.servizio servizio on contenutoservizio.id_contenuto = servizio.id_servizio
INNER JOIN wemi2.contenuto_stt contenuto_stt ON contenuto_stt.id_contenuto = contenutoservizio.id_contenuto
and contenuto_stt.cd_stato_contenuto = ${CONTENT_STATE.PUBLISHED}
and contenuto_stt.ts_variazione_stato = (
                                          select MAX(ts_variazione_stato)
                                          from wemi2.contenuto_stt
                                          where id_contenuto =  contenutoservizio.id_contenuto
                                         )
INNER JOIN wemi2.servizio_erogato_ente see ON see.id_servizio_riferimento = contenuto_associato.id_contenuto_primario
INNER JOIN wemi2.ente e ON e.id_ente = see.id_ente_erogatore
INNER JOIN wemi2.servizio_erogato_ente_stt seestt ON seestt.id_servizio_ente = see.id_servizio_ente
and seestt.ts_variazione_stato = ( SELECT MAX(istt.ts_variazione_stato)
                                  FROM wemi2.servizio_erogato_ente_stt istt                    
                                  WHERE istt.id_servizio_ente = see.id_servizio_ente
                                ) AND seestt.cd_stato_dati_servizio_ente = ${STATO_SCHEDA_ENTE.VALIDATA}
INNER JOIN wemi2.ente_stt estt ON estt.id_ente = e.id_ente
AND estt.ts_variazione_stato = ( SELECT MAX(istt.ts_variazione_stato)
                                  FROM wemi2.ente_stt istt 
                                  WHERE istt.id_ente = e.id_ente
                                ) AND estt.cd_stato_ente = '${STATO_SCHEDA_ENTE.VALIDATA}'
INNER JOIN wemi2.srv_prezzo sp ON sp.id_servizio_ente = see.id_servizio_ente	                              
							  
							  
LEFT JOIN wemi2.media ON contenutocategoria.id_media1 = id_media
`;

export const conditionServices = `
WHERE contenutocategoria.ty_contenuto = ${tyContenuto.CATEGORIE} AND CURRENT_DATE >= sp.dt_inizio
AND (CURRENT_DATE <= sp.dt_fine OR sp.dt_fine IS NULL)
and contenuto_associato.nm_relazione = '${RELATION_NAME.CATEGORIA_SERVIZIO}'
`;

export const conditionSection = 'and contenutosezione.cd_contenuto = $[cdContenutoSez]';

export const conditionServicesDom = `and not contenutoarea.cd_contenuto = '${CD_CONTENUTO_AREA.ZERO_18_CROSS}'`;


export const conditionCdArea = `
AND contenutoarea.cd_contenuto = $[cdContenutoArea]
`;

export const orderDefault = `
ORDER BY contenutoarea.nr_ordine_visualizzazione asc, contenutocategoria.nr_ordine_visualizzazione asc`;

export const selectCategoriesWithServicesByTag = `
SELECT
contenutoarea.id_contenuto AS "idArea",
contenutoarea.cd_contenuto AS "tipoArea",
contenutoarea.tl_testo_1 AS "txTitoloArea",
contenutoarea.nr_ordine_visualizzazione AS "ordineVisualizzazioneArea",
contenutocategoria.id_contenuto AS "idCategoria",
contenutoservizio.id_contenuto as "idServizio",
contenutosezione.js_dati_contenuto as "datiSezione",
contenutoservizio.tl_testo_1 as "nomeServizio"
FROM wemi2.contenuto contenutocategoria
INNER JOIN wemi2.contenuto_stt sa ON sa.id_contenuto= contenutocategoria.id_contenuto
and sa.cd_stato_contenuto=${CONTENT_STATE.PUBLISHED}
and sa.ts_variazione_stato = (select MAX(ts_variazione_stato)
                              from wemi2.contenuto_stt
                              where id_contenuto =  contenutocategoria.id_contenuto)	
							  
INNER JOIN  wemi2.contenuto_associato associatoarea ON associatoarea.id_contenuto_primario = contenutocategoria.id_contenuto
INNER JOIN  wemi2.contenuto contenutoarea ON contenutoarea.id_contenuto = associatoarea.id_contenuto_associato and contenutoarea.ty_contenuto = ${tyContenuto.AREA}
INNER JOIN wemi2.contenuto_stt sx ON sx.id_contenuto= contenutoarea.id_contenuto
and sx.cd_stato_contenuto=${CONTENT_STATE.PUBLISHED}
and sx.ts_variazione_stato = (select MAX(ts_variazione_stato)
                              from wemi2.contenuto_stt
                              where id_contenuto =  contenutoarea.id_contenuto)							  

INNER JOIN wemi2.contenuto_associato associatosezione on associatosezione.id_contenuto_primario = contenutoarea.id_contenuto and associatosezione.nm_relazione ='${RELATION_NAME.SEZIONE}'
INNER JOIN wemi2.contenuto contenutosezione on contenutosezione.id_contenuto = associatosezione.id_contenuto_associato and contenutosezione.ty_contenuto = ${tyContenuto.SEZIONI}
INNER JOIN wemi2.contenuto_stt ss ON ss.id_contenuto= contenutosezione.id_contenuto
and ss.cd_stato_contenuto=${CONTENT_STATE.PUBLISHED}
and ss.ts_variazione_stato = (select MAX(ts_variazione_stato)
                              from wemi2.contenuto_stt
                              where id_contenuto =  contenutosezione.id_contenuto)	

INNER JOIN wemi2.contenuto_associato contenuto_associato ON contenuto_associato.id_contenuto_associato = contenutocategoria.id_contenuto
INNER JOIN wemi2.contenuto contenutoservizio ON contenutoservizio.id_contenuto = contenuto_associato.id_contenuto_primario
INNER JOIN wemi2.servizio servizio on contenutoservizio.id_contenuto = servizio.id_servizio
inner join wemi2.servizio_tag servizio_tag on servizio.id_servizio = servizio_tag.id_servizio
INNER JOIN wemi2.contenuto_stt contenuto_stt ON contenuto_stt.id_contenuto = contenutoservizio.id_contenuto
and contenuto_stt.cd_stato_contenuto = ${CONTENT_STATE.PUBLISHED}
and contenuto_stt.ts_variazione_stato = (
                                          select MAX(ts_variazione_stato)
                                          from wemi2.contenuto_stt
                                          where id_contenuto =  contenutoservizio.id_contenuto
                                         )
INNER JOIN wemi2.servizio_erogato_ente see ON see.id_servizio_riferimento = contenuto_associato.id_contenuto_primario
INNER JOIN wemi2.ente e ON e.id_ente = see.id_ente_erogatore
INNER JOIN wemi2.servizio_erogato_ente_stt seestt ON seestt.id_servizio_ente = see.id_servizio_ente
and seestt.ts_variazione_stato = ( SELECT MAX(istt.ts_variazione_stato)
                                  FROM wemi2.servizio_erogato_ente_stt istt                    
                                  WHERE istt.id_servizio_ente = see.id_servizio_ente
                                ) AND seestt.cd_stato_dati_servizio_ente = ${STATO_SCHEDA_ENTE.VALIDATA}
INNER JOIN wemi2.ente_stt estt ON estt.id_ente = e.id_ente
AND estt.ts_variazione_stato = ( SELECT MAX(istt.ts_variazione_stato)
                                  FROM wemi2.ente_stt istt 
                                  WHERE istt.id_ente = e.id_ente
                                ) AND estt.cd_stato_ente = '${STATO_SCHEDA_ENTE.VALIDATA}'
INNER JOIN wemi2.srv_prezzo sp ON sp.id_servizio_ente = see.id_servizio_ente	                              
							  
							  
LEFT JOIN wemi2.media ON contenutocategoria.id_media1 = id_media
WHERE contenutocategoria.ty_contenuto = ${tyContenuto.CATEGORIE} AND CURRENT_DATE >= sp.dt_inizio
AND (CURRENT_DATE <= sp.dt_fine OR sp.dt_fine IS NULL)
and contenuto_associato.nm_relazione = '${RELATION_NAME.CATEGORIA_SERVIZIO}'
AND servizio_tag.tx_tag_ricerca = $[tag]
ORDER BY contenutoarea.nr_ordine_visualizzazione asc, contenutocategoria.nr_ordine_visualizzazione asc
`;

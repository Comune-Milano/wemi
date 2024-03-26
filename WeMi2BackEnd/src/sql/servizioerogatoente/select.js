import tabelle from 'tabelle';
import { tyPersonale } from 'constants/db/tyPersonale';
import { STORAGE_ABS_PATH } from 'environment';

export const selectSediErogatrici = `
  SELECT
    a.id_sede,
    a.js_sede,
    b.fg_accompagnamento_sede,
    a.ts_creazione,
    a.ty_sede
  FROM
    wemi2.sede_ente a INNER JOIN wemi2.r_sede_ente_servizio_erog b
    ON a.id_sede = b.id_sede_erogazione_srv
  WHERE
    b.id_servizio_ente = $[idServizioEnte]
`;

export const findSecondaryOfficesByInstitution = `
SELECT
a.id_sede as "id",
a.js_sede,
b.fg_accompagnamento_sede,
a.ts_creazione,
a.ty_sede
FROM
wemi2.sede_ente a 
INNER JOIN wemi2.r_sede_ente_servizio_erog b
ON a.id_sede = b.id_sede_erogazione_srv
WHERE
a.id_ente_rif = $[institutionId] and a.ty_sede = 2
GROUP BY id_sede, b.fg_accompagnamento_sede;`;

export const selectEstraiDettaglioAmministrativoServizioEnte = `
SELECT 
       see.tl_procedura_attivazione,
       see.tx_note_al_prezzo ,
       see.im_prezzo_minimo,
       see.tl_descrizione_serv_erog_ente,
       see.id_servizio_riferimento,
       see.cd_modalita_erogazione,
       see.id_servizio_ente,
       see.cd_tipo_offerta_srv,
       see.cd_tipo_servizio_erog,
       see.tx_altre_mansioni,
       see.tx_altra_sede,
       see.fg_accompagnamento_altra_sede,
       see.qt_min_pers,
       see.qt_max_pers,
       see.js_info_personale,
       see.tx_ulteriori_informazioni as "ulterioriInformazioni",
       see.tx_nome_servizio as "nomeServizio",
       to_char(see.dt_inizio_erog_serv,'YYYY-MM-DD')dt_inizio_erog_serv,
       to_char(see.dt_fine_erog_serv,'YYYY-MM-DD')dt_fine_erog_serv,
       to_char(see.dt_inizio_val_offerta_prezzo,'YYYY-MM-DD')dt_inizio_val_offerta_prezzo,
       to_char(see.dt_fine_val_offerta_prezzo,'YYYY-MM-DD')dt_fine_val_offerta_prezzo,
       see.qt_tempo_max_attivazione,
       see.id_sede_erogazione_srv,
       see.im_prezzo_minimo,
       see.js_note_adminwemi_su_servizio,
       see.id_ente_erogatore,
       see.fg_0_18_anni,
       see.nm_descrittore_movimento,
       see.nm_descrittore_relazioni,
       see.nm_descrittore_competenze,
       see.nm_descrittore_creativita,
       see.nm_descrittore_autodeterm,
       (
        SELECT  array_agg(id_qualifica) 
        FROM wemi2.r_qual_pers_serv_erog_ente
        WHERE id_servizio_ente= $[id_servizio_ente] AND ty_personale_rif= ${tyPersonale.TY_PERSONALE_INTERNO}
      ) AS qualifiche_interne,
      (
        SELECT  array_agg(id_qualifica) 
        FROM wemi2.r_qual_pers_serv_erog_ente
        WHERE id_servizio_ente= $[id_servizio_ente] AND ty_personale_rif= ${tyPersonale.TY_PERSONALE_ESTERNO}
      ) AS qualifiche_esterne
       FROM ${tabelle.servizio_erogato_ente} see
       WHERE see.id_servizio_ente=$[id_servizio_ente]
`;

export const selectSliderImg = `
  SELECT 
    media.id_media AS id,
    ty_mime_type_media as type,
    nm_nome_media AS name,
    convert_from(oj_media, 'UTF-8') AS file,
    CASE WHEN iw_path IS NOT NULL
    THEN CONCAT('${STORAGE_ABS_PATH}', '/', iw_path)
    END AS "iwPath",
    nr_progressivo_slider AS "nrProgressivo"
  FROM wemi2.media 
  LEFT JOIN wemi2.allegato_servizio_ente ON allegato_servizio_ente.id_media = media.id_media
  WHERE 
    id_servizio_ente= $[id_servizio_ente] AND
    nr_progressivo_slider = $[nr_progressivo_slider];
`;
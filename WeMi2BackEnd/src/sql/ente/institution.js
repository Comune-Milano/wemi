import tabelle from 'tabelle';
import { STORAGE_ABS_PATH } from 'environment';

export const findEnteBasicInformation = `
        SELECT 
          e.nr_operatori_servizi_wemi as "institutionOperatorsWeMI",
          dpe.tx_note_primo_contatto as "institutionFirstContactNote",
          json_build_object(
            'volunteerAvailability', dpe.js_altre_info #> '{fgDisponibileVolontari}',
            'welfareAvailability', dpe.js_altre_info #> '{fgDisponibileWelfare}',
            'facebookLink', dpe.js_altre_info ->> 'txFacebook',
            'webLink', dpe.js_altre_info ->> 'txWeb',
            'youtubeLink', dpe.js_altre_info ->> 'txYoutube',
            'instagramLink', dpe.js_altre_info ->> 'txInstagram',
            'twitterLink', dpe.js_altre_info ->> 'txTwitter'
          ) as "institutionOthersInfo",
       
          json_build_object(
            'name', dpe.js_referente ->> 'txReferente',
            'email', dpe.js_referente ->> 'txEmail',
            'secondaryEmail', dpe.js_referente ->> 'txEmailSecondaria',
            'phoneNumber', dpe.js_referente ->> 'txTelefono',
            'secondaryPhoneNumber', dpe.js_referente ->> 'txTelefonoSecondario'
          ) as "institutionContactPerson",

          json_build_object(
            'iban', dpe.js_dati_bancari ->> 'cdIBAN',
            'accountHolder', dpe.js_dati_bancari ->> 'txIntestatarioConto',
            'bankName', dpe.js_dati_bancari ->> 'txBanca',
            'branchDescription', dpe.js_dati_bancari ->> 'txFiliale'
          ) as "institutionPaymentInfo",
       
          json_build_object(
            'email', dpe.js_primo_contatto ->> 'txEmail',
            'phoneNumber', dpe.js_primo_contatto ->> 'txTelefono',
            'contactAvailability', dpe.js_primo_contatto #> '{disponibilitaDiContatto}'
          ) as "institutionCitizenAvailability",
        dpe.tl_descrizione_ente ->> 'it' as "institutionDescription",
        dpe.js_note_adminwemi as "institutionNote",
        e.id_ente as "institutionId",
        e.nm_ente_completo as "institutionFullname",
        e.nm_ente as "institutionName",
        e.id_partita_iva_ente as "institutionVATNumber",
        (
            SELECT 
                  json_agg(
                    json_build_object(
                      'id', spaziowemi.id_contenuto,
                      'description', spaziowemi.tl_testo_1 ->> 'it'
                    )
                  )
             FROM wemi2.r_spazio_wemi_ente as rswe 
             INNER JOIN wemi2.contenuto as spaziowemi 
                 ON spaziowemi.id_contenuto = rswe.id_spazio_wemi
             WHERE e.id_ente = rswe.id_ente
        ) as "institutionWeMiSpaces",
        u.ptx_email as "institutionAdministratorEmail",
        domainForEStt.tl_valore_testuale ->> 'it' as "institutionStateDescription",
        estt.cd_stato_ente as "institutionState",
        (
            SELECT 
                  json_agg(
                    json_build_object(
                      'id', catacc.id_contenuto,
                      'description', catacc.tl_testo_1 ->> 'it'
                    )
                  )
             FROM wemi2.r_cat_acc_ente as rcae 
             INNER JOIN wemi2.contenuto as catacc 
                 ON catacc.id_contenuto = rcae.id_cat_accreditamento
             WHERE e.id_ente = rcae.id_ente
        ) as "institutionAccreditationCategories"

        FROM wemi2.ente as e
        INNER JOIN wemi2.dati_propri_ente as dpe 
            ON dpe.id_ente_rif = e.id_ente
        INNER JOIN wemi2.utente as u 
            ON u.id_utente = e.id_utente_admin
        INNER JOIN wemi2.ente_stt as estt 
            ON estt.id_ente = e.id_ente 
                AND estt.id_ente = $[institutionId] 
        INNER JOIN wemi2.dominio as domainForEStt 
            ON estt.cd_stato_ente = domainForEstt.cd_dominio 
                AND ty_dominio = 'STATO_ENTE'
        WHERE e.id_ente = $[institutionId] 
            AND estt.ts_variazione_stato = (
                    SELECT MAX(ts_variazione_stato)
                    FROM wemi2.ente_stt
                    WHERE id_ente = estt.id_ente
                )
        `;
export const findLastState = `
        SELECT 
            e.id_ente as "id",
            CAST(estt.cd_stato_ente as int) as "code",
            u.ptx_email as "email"
        FROM wemi2.ente as e
        INNER JOIN wemi2.ente_stt as estt
          ON estt.id_ente = e.id_ente
        INNER JOIN wemi2.utente as u 
          ON u.id_utente = estt.id_utente
        WHERE e.id_ente = $[institutionId]
              AND estt.ts_variazione_stato = (
                SELECT MAX(estt.ts_variazione_stato)
                FROM wemi2.ente_stt as estt
                WHERE estt.id_ente = $[institutionId] 
              )
        ;
`;
export const findAuthorizedOperatorsForEnte = `
  SELECT 
        u.id_utente as "id",
        u.ptx_email as "email"
        FROM wemi2.ente as e
        INNER JOIN wemi2.r_operatore_ente as roe
            ON roe.id_ente = e.id_ente
        INNER JOIN wemi2.utente as u 
            ON u.id_utente = roe.id_utente
        WHERE e.id_ente = $[institutionId]
`;


export const findLogoAndAttachmentsForEnte = `
WITH allegati_ente AS (
      SELECT
          md.id_media as "id",
          dm.cd_dominio as "domain",
          dm.tl_valore_testuale #>> '{it}' as "fieldName",
          md.ty_mime_type_media as "type",
          md.nm_nome_media as "name",
          -- convert_from(md.oj_media, 'UTF-8') as "blob",
          null as "blob", 
          dm.pg_visualizzazione,
          CASE WHEN md.iw_path IS NOT NULL
               THEN CONCAT('${STORAGE_ABS_PATH}', '/', md.iw_path)
          END as "storagePath"
          FROM ${tabelle.allegato_ente} as ae
          LEFT OUTER JOIN ${tabelle.media} as md on ae.id_media = md.id_media
          INNER JOIN ${tabelle.dominio} as dm on ae.ty_allegato = dm.cd_dominio AND dm.ty_dominio = 'ALLEGATO_ENTE'
          WHERE ae.id_ente = $[institutionId]
          UNION ALL
          SELECT
          null as "id",
          dm.cd_dominio,
          dm.tl_valore_testuale #>> '{it}' as "fieldName",
          null as "type",
          null as "name",
          null as "blob",
          dm.pg_visualizzazione,
          null as "storagePath"
          FROM ${tabelle.dominio} as dm
          WHERE dm.ty_dominio = 'ALLEGATO_ENTE'
          AND dm.cd_dominio NOT IN (
            SELECT
            ae.ty_allegato
            FROM ${tabelle.allegato_ente} as ae
            LEFT OUTER JOIN ${tabelle.media} as md on ae.id_media = md.id_media
            WHERE ae.id_ente = $[institutionId]
          )
    )
    SELECT * FROM allegati_ente ORDER BY pg_visualizzazione
`;

export const findRegisteredOfficeForEnte = `
  SELECT 
    se.js_sede ->> 'nomeSede' as "name",
    se.js_sede #> '{indirizzo}' as  "address"
    FROM wemi2.ente as e
    LEFT JOIN wemi2.sede_ente as se 
          ON se.id_ente_rif = e.id_ente 
            and ty_sede = 1
    WHERE e.id_ente = $[institutionId];
`;

export const findLocationsForEnte = `
  SELECT 
        se.id_sede as "id",
        se.js_sede ->> 'nomeSede' as "name",
        se.js_sede #> '{indirizzo}' as "address"
    FROM wemi2.ente as e
    INNER JOIN wemi2.sede_ente as se 
          ON se.id_ente_rif = e.id_ente 
            and ty_sede > 1
    WHERE e.id_ente = $[institutionId]
`;

export const findExistentUsers = `
SELECT 
  u.id_utente as "id",
  u.ptx_email as "email",
  u.cd_profilo_utente as "profile",
  u.ty_operatore_ente as "type",
  u.fg_lavoratore as "fgLavoratore"
FROM wemi2.utente as u
WHERE u.ptx_email IN (
$[operatorsEmail:list]
) and u.id_utente NOT IN (
SELECT u.id_utente
FROM wemi2.utente as u
LEFT JOIN wemi2.r_operatore_ente as roe
ON u.id_utente = roe.id_utente
WHERE roe.id_ente = $[institutionId]
)`;

export const findMerchantInformation = `
  SELECT 
    me.id_merchant as "id",
    me.dt_inizio_val::timestamp with time zone as "startDate",
    me.dt_fine_val::timestamp with time zone as "endDate",
    me.id_public_key as "publicKey",
    me.id_private_key as "privateKey"
  FROM wemi2.ente as e
  INNER JOIN wemi2.merchant as me 
    ON me.id_ente = e.id_ente
  INNER JOIN wemi2.dati_propri_ente as dpe 
        ON dpe.id_ente_rif = e.id_ente
  WHERE e.id_ente = $[institutionId];
`;
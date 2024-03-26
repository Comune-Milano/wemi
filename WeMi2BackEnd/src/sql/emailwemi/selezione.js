import { attributo } from "constants/db/attributo";
import { STORAGE_ABS_PATH } from "environment";

export const findUserInfoByIdWorker =  `
  SELECT u.*,
      (SELECT vautEmail.tx_val
      FROM wemi2.val_attributo_ut AS vautEmail
      WHERE vautEmail.id_utente = $[idLavoratore] AND cd_attributo = ${attributo.TX_EMAIL}
      ) AS "ptxEmail",
      (SELECT vautNome.tx_val
      FROM wemi2.val_attributo_ut AS vautNome
      WHERE vautNome.id_utente = $[idLavoratore] AND cd_attributo = ${attributo.TX_NOME_UTENTE}
      ) AS "nome",
      (SELECT vautCognome.tx_val
      FROM wemi2.val_attributo_ut AS vautCognome
      WHERE vautCognome.id_utente = $[idLavoratore] AND cd_attributo = ${attributo.TX_COGNOME_UTENTE}
      ) AS "cognome"	   
  FROM wemi2.utente_offerta_lav
  INNER JOIN wemi2.utente AS u ON u.id_utente = id_utente_lav
  WHERE id_utente_lav = $[idLavoratore];
`;
export const findUserInfoByIdRichiesta =  `
SELECT utente.ptx_email AS "ptxEmail", utente.tx_nome_utente AS "nome", utente.tx_cognome_utente AS "cognome"
FROM wemi2.richiesta_servizio_tcb
INNER JOIN wemi2.richiesta_servizio_ente ON richiesta_servizio_ente.id_richiesta_servizio_ente = richiesta_servizio_tcb.id_richiesta_servizio_tcb
INNER JOIN wemi2.richiesta_servizio_base ON richiesta_servizio_base.id_richiesta_servizio_base = richiesta_servizio_ente.id_richiesta_servizio_base
INNER JOIN wemi2.utente ON utente.id_utente = richiesta_servizio_base.id_utente_richiedente
WHERE id_richiesta_servizio_tcb= $[idRichiesta];
`;

export const selectNumeroFamiglia= `
  SELECT valore_tx_parametro
  FROM wemi2.parametro_generale
  WHERE nome_parametro ='EMAIL_CONTATTO_FAMIGLIE'
`;

export const selectNumerolavoratore= `
  SELECT valore_tx_parametro
  FROM wemi2.parametro_generale
  WHERE nome_parametro ='EMAIL_CONTATTO_LAVORATORI'
`;

export const selectEmailWemi= `
  SELECT valore_tx_parametro
  FROM wemi2.parametro_generale
  WHERE nome_parametro ='EMAIL_CONTATTO_EMAIL_WEMI'
`;


export const findDatiEnte =  `
  SELECT
    CASE WHEN media.iw_path IS NOT NULL
    THEN CONCAT('${STORAGE_ABS_PATH}', '/', media.iw_path)
    END as "logo",
      CASE WHEN md.iw_path IS NOT NULL
    THEN CONCAT('${STORAGE_ABS_PATH}', '/', md.iw_path)
    END as "fileCondizioni"
  FROM wemi2.allegato_ente AS ae
  LEFT OUTER JOIN wemi2.media AS md ON ae.id_media = md.id_media
  INNER JOIN wemi2.dominio AS dm ON ae.ty_allegato = dm.cd_dominio AND dm.ty_dominio = 'ALLEGATO_ENTE'
  INNER JOIN wemi2.ente ON ente.id_ente = ae.id_ente
  INNER JOIN wemi2.dati_propri_ente ON dati_propri_ente.id_ente_rif = ente.id_ente
  INNER JOIN wemi2.media ON media.id_media = dati_propri_ente.id_img_logo
  WHERE ae.id_ente = $[idEnte] and cd_dominio = 'CONDIZIONI_UTILIZZO'
`

export const findWemiEmail = `
SELECT valore_tx_parametro
FROM wemi2.parametro_generale
WHERE nome_parametro = 'MAIL_WEMI';
`;

export const findEmailServizioWeMI = `
SELECT valore_tx_parametro
FROM wemi2.parametro_generale
WHERE nome_parametro = 'MAIL_SERVIZIO_WEMI';
`;

export const findWemiNumeroVerde = `
SELECT valore_tx_parametro
FROM wemi2.parametro_generale
WHERE nome_parametro = 'NUMERO_VERDE_WEMI';
`;

export const findDatiLavoratore = `
SELECT tx_nome_utente, tx_cognome_utente
FROM wemi2.utente
WHERE id_utente= $[idLavoratore];
`;

export const findName = `
SELECT tl_testo_1
FROM wemi2.contenuto
WHERE id_contenuto = $[idServizio];
`;

export const findTemplateInfo = ` SELECT nome_parametro as "nomeParametro", valore_tx_parametro as "valoreParametro"
    FROM wemi2.parametro_generale
    WHERE 
        nome_parametro IN
        ($[dbTemplateKeys:csv]);`;
export const findServiziCandidato= `
        SELECT
        fg_candidatura_tata as tata,
        fg_candidatura_colf as colf,
        fg_candidatura_badante as badante
      FROM wemi2.utente_offerta_lav
      WHERE id_utente_lav = $[idLavoratore]`;

export const findIdServizio = `
      SELECT id_servizio_riferimento
      FROM wemi2.richiesta_servizio_ente
      INNER JOIN wemi2.servizio_erogato_ente ON 
        servizio_erogato_ente.id_servizio_ente = richiesta_servizio_ente.id_servizio_erogato_ente
       WHERE id_richiesta_servizio_ente = $[idRichiesta];
      `;
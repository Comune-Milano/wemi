import { STORAGE_ABS_PATH } from "environment";

export const findByIdRichiesta = `
SELECT utente.*
FROM wemi2.richiesta_servizio_ente
INNER JOIN wemi2.richiesta_servizio_base ON richiesta_servizio_base.id_richiesta_servizio_base = richiesta_servizio_ente.id_richiesta_servizio_base
INNER JOIN wemi2.utente ON id_utente_richiedente = utente.id_utente
 WHERE id_richiesta_servizio_ente = $[idRichiesta];
`;

export const estraiIdRichiestaBase = `
SELECT id_richiesta_servizio_base
FROM wemi2.richiesta_servizio_ente
WHERE id_richiesta_servizio_ente = $[idRichiestaEnte]
`;

export const EstraiLogoWeMi =  `
  SELECT  
  CASE WHEN media.iw_path IS NOT NULL
            THEN CONCAT('${STORAGE_ABS_PATH}', '/', media.iw_path)
        END as "logoWeMi"
  FROM wemi2.ente
  INNER JOIN wemi2.dati_propri_ente ON dati_propri_ente.id_ente_rif = ente.id_ente
  INNER JOIN wemi2.media ON media.id_media = dati_propri_ente.id_img_logo
  WHERE ente.id_ente = 0 
`

export const findEnteInfoByIdRichiesta = `
SELECT utente.*, js_referente ->> 'txEmail' as email
FROM wemi2.richiesta_servizio_ente
INNER JOIN wemi2.servizio_erogato_ente ON 
  servizio_erogato_ente.id_servizio_ente = richiesta_servizio_ente.id_servizio_erogato_ente
INNER JOIN wemi2.ente as e ON 
  id_ente_erogatore = id_ente
INNER JOIN wemi2.dati_propri_ente as dpe ON 
  dpe.id_ente_rif = e.id_ente
INNER JOIN wemi2.utente ON id_utente_admin = utente.id_utente
 WHERE id_richiesta_servizio_ente = $[idRichiesta];
`;

export const findIdServizio = `
SELECT id_servizio_riferimento
FROM wemi2.richiesta_servizio_ente
INNER JOIN wemi2.servizio_erogato_ente ON 
  servizio_erogato_ente.id_servizio_ente = richiesta_servizio_ente.id_servizio_erogato_ente
 WHERE id_richiesta_servizio_ente = $[idRichiesta];
`;

export const findDescrServizio = `
SELECT contenuto.tl_testo_2 ->> 'it' as "descrizioneServizio"
FROM wemi2.contenuto
INNER JOIN wemi2.servizio ON servizio.id_servizio = contenuto.id_contenuto
WHERE 
id_servizio = $[idServizio];`;

export const findNomeServizio = `
SELECT contenuto.tl_testo_1
FROM wemi2.richiesta_servizio_ente
INNER JOIN wemi2.servizio_erogato_ente ON servizio_erogato_ente.id_servizio_ente = richiesta_servizio_ente.id_servizio_erogato_ente
INNER JOIN wemi2.servizio ON servizio.id_servizio = servizio_erogato_ente.id_servizio_riferimento
INNER JOIN wemi2.contenuto ON contenuto.id_contenuto = servizio.id_servizio
 WHERE id_richiesta_servizio_ente = $[idRichiesta];
`;

export const findEnte = `
SELECT 
  ente.nm_ente, 
  dati_propri_ente.js_referente ->> 'txEmail' AS "ptx_email",
  dati_propri_ente.js_referente ->> 'txEmailSecondaria' AS "tx_email_secondaria"
FROM wemi2.richiesta_servizio_ente
INNER JOIN wemi2.richiesta_servizio_base ON richiesta_servizio_base.id_richiesta_servizio_base = richiesta_servizio_ente.id_richiesta_servizio_base
INNER JOIN wemi2.servizio_erogato_ente ON servizio_erogato_ente.id_servizio_ente = richiesta_servizio_ente.id_servizio_erogato_ente
INNER JOIN wemi2.ente ON ente.id_ente = servizio_erogato_ente.id_ente_erogatore
INNER JOIN wemi2.dati_propri_ente ON dati_propri_ente.id_ente_rif = ente.id_ente
WHERE id_richiesta_servizio_ente = $[idRichiesta];
`;

export const findEmailPagamento = `
SELECT pagamento.js_dati_fatturazione
FROM wemi2.richiesta_servizio_ente
INNER JOIN wemi2.pagamento ON pagamento.id_interno_transazione = richiesta_servizio_ente.id_interno_trans_pag
 WHERE id_richiesta_servizio_ente = $[idRichiesta];
`;
export const findByIdServizioEnte = `
  SELECT 
    id_servizio_riferimento,
    ente.nm_ente,
    contenuto.tl_testo_1
  FROM wemi2.servizio_erogato_ente
  INNER JOIN wemi2.ente ON ente.id_ente = servizio_erogato_ente.id_ente_erogatore
  INNER JOIN wemi2.servizio ON servizio.id_servizio = servizio_erogato_ente.id_servizio_riferimento
  INNER JOIN wemi2.contenuto ON contenuto.id_contenuto = servizio.id_servizio
  WHERE id_servizio_ente = $[idServizioEnte];
`;
import { attributo } from "constants/db/attributo";
import { STORAGE_ABS_PATH } from "environment";

export const findUserInfoByIdRequestTCB =  `
   SELECT u.*, 
  (SELECT vadEmail.tx_val 
	 FROM wemi2.val_attributo_domanda as vadEmail
	 WHERE vadEmail.id_richiesta_servizio_tcb = $[idRichiestaTcb]
    and cd_attributo = ${attributo.TX_EMAIL_CONTATTO}
  ) as "ptxEmail", 
  (SELECT vadNome.tx_val 
	 FROM wemi2.val_attributo_domanda as vadNome 
	 WHERE vadNome.id_richiesta_servizio_tcb = $[idRichiestaTcb] 
  	and cd_attributo = ${attributo.TX_NOME_CONTATTO}
  ) as "nome", 
  (SELECT vadCognome.tx_val 
	 FROM wemi2.val_attributo_domanda as vadCognome 
	 WHERE vadCognome.id_richiesta_servizio_tcb = $[idRichiestaTcb] 
  	and cd_attributo = ${attributo.TX_COGNOME_CONTATTO}
  ) as "cognome",
  (SELECT COALESCE(to_char(vadDataInizio.dt_val, 'DD/MM/YYYY'), '')
    FROM wemi2.val_attributo_domanda as vadDataInizio 
    WHERE vadDataInizio.id_richiesta_servizio_tcb = $[idRichiestaTcb] 
     and cd_attributo = ${attributo.DT_DATA_CONTRATTO_DA}
   ) as "dataInizio",
   (SELECT COALESCE(to_char(vadDataFine.dt_val, 'DD/MM/YYYY'), '')
    FROM wemi2.val_attributo_domanda as vadDataFine 
    WHERE vadDataFine.id_richiesta_servizio_tcb = $[idRichiestaTcb] 
     and cd_attributo = ${attributo.DT_DATA_CONTRATTO_A}
   ) as "dataFine",
  dtcbTipologia.tl_valore_testuale ->> 'it' as "nomeServizio",
  ( 
    SELECT vautNome.tx_val
    FROM wemi2.richiesta_servizio_ente as rse
    INNER JOIN wemi2.r_match_ric_lav as rmrl ON 
       rmrl.id_richiesta = rse.id_richiesta_servizio_ente 
       and rmrl.cd_stato_associazione = '1'
   INNER JOIN wemi2.val_attributo_ut AS vautNome ON
       vautNome.id_utente = rmrl.id_lavoratore AND cd_attributo = ${attributo.TX_NOME_UTENTE}
   WHERE rse.id_richiesta_servizio_ente = $[idRichiestaTcb]
  ) as "nomeLavoratore",
  ( 
    SELECT vautCognome.tx_val
    FROM wemi2.richiesta_servizio_ente as rse
    INNER JOIN wemi2.r_match_ric_lav as rmrl ON 
       rmrl.id_richiesta = rse.id_richiesta_servizio_ente 
       and rmrl.cd_stato_associazione = '1'
   INNER JOIN wemi2.val_attributo_ut AS vautCognome ON
       vautCognome.id_utente = rmrl.id_lavoratore AND cd_attributo = ${attributo.TX_COGNOME_UTENTE}
   WHERE rse.id_richiesta_servizio_ente = $[idRichiestaTcb]
  ) as "cognomeLavoratore"
  FROM wemi2.richiesta_servizio_ente as rse
  INNER JOIN wemi2.richiesta_servizio_base as rsb ON
  rse.id_richiesta_servizio_base = rsb.id_richiesta_servizio_base  
  INNER JOIN wemi2.utente as u ON rsb.id_utente_richiedente = u.id_utente
  INNER JOIN wemi2.richiesta_servizio_tcb as rst ON 
  rst.id_richiesta_servizio_tcb = rse.id_richiesta_servizio_ente
  INNER JOIN wemi2.servizio_erogato_ente as see ON 
  see.id_servizio_ente = rse.id_servizio_erogato_ente
  INNER JOIN wemi2.dominio_tcb as dtcbTipologia on 
  CAST(id_servizio_ente AS Int) = dtcbTipologia.cd_dominio_tcb and 
  dtcbTipologia.ty_dominio_tcb = 46
  WHERE rst.id_richiesta_servizio_tcb = $[idRichiestaTcb];
`;

export const findDatiWeMi =  `
  SELECT  
  CASE WHEN media.iw_path IS NOT NULL
            THEN CONCAT('${STORAGE_ABS_PATH}', '/', media.iw_path)
        END as "logoWeMi",
  CASE WHEN media_condizioni.iw_path IS NOT NULL
        THEN CONCAT('${STORAGE_ABS_PATH}', '/', media_condizioni.iw_path)
  END as "fileCondizioni"
  FROM wemi2.ente
  INNER JOIN wemi2.dati_propri_ente ON dati_propri_ente.id_ente_rif = ente.id_ente
  INNER JOIN wemi2.media ON media.id_media = dati_propri_ente.id_img_logo
  INNER JOIN wemi2.media AS media_condizioni ON dati_propri_ente.id_pdf_tc = media_condizioni.id_media
  WHERE ente.id_ente = 0  
`
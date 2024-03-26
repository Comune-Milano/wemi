import { attributo } from "constants/db/attributo";

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

export const verificaUtente =  `
SELECT *
FROM wemi2.utente_offerta_lav
INNER JOIN wemi2.utente ON utente.id_utente = id_utente_lav
WHERE id_utente_lav = $[idLavoratore] and id_utente = $[idUtente]
`;
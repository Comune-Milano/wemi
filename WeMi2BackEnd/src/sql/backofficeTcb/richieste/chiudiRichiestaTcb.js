import tabelle from 'tabelle';
import { attributo } from 'constants/db/attributo';

export const chiudiRichiestaNegativaSql = (context) => {
  return `
  DELETE FROM ${context.tabelle.val_attributo_domanda}
  WHERE id_richiesta_servizio_tcb = $[input.codiceRichiesta]
  AND cd_attributo = ${attributo.CD_MOTVO_CHIUSURA_DOMANDA}
  AND cd_val_attributo = $[input.codiceMotivoChiusura];
  
  INSERT INTO ${context.tabelle.val_attributo_domanda} (id_richiesta_servizio_tcb, cd_attributo, cd_val_attributo, tx_nota, ts_modifica, ts_creazione)
  VALUES ($[input.codiceRichiesta], ${attributo.CD_MOTVO_CHIUSURA_DOMANDA}, $[input.codiceMotivoChiusura], $[input.descrizioneMotivoChiusura], LOCALTIMESTAMP, LOCALTIMESTAMP);
  
  INSERT INTO ${context.tabelle.richiesta_servizio_ente_stt} (id_richiesta_servizio_ente, ts_variazione_stato, cd_stato_ric_serv_ente, id_utente, cd_stato_chat)
  VALUES ($[input.codiceRichiesta], LOCALTIMESTAMP, '13', $[idUtente], 0);

  INSERT INTO ${context.tabelle.richiesta_servizio_base_stt} (id_richiesta_servizio, ts_variazione_stato, cd_stato_richiesta_servizio, id_utente)
  VALUES ($[input.codiceRichiestaBase], LOCALTIMESTAMP, '7', $[idUtente]);

  UPDATE ${context.tabelle.r_match_ric_lav}
  SET cd_stato_associazione = $[statoAnnullatoDaOperatore], 
  id_ult_operatore = $[idUtente],
  tx_nota = (SELECT tl_valore_testuale ->> 'it' as tx_nota FROM ${context.tabelle.dominio_tcb}
             WHERE ty_dominio_tcb = 1 
             AND cd_dominio_tcb = $[input.codiceMotivoChiusura]),
  ts_ultima_modifica = LOCALTIMESTAMP
  WHERE id_richiesta = $[input.codiceRichiesta]
  AND cd_stato_associazione IN ($[statiDisponibilita:csv])
  `;
};

export const chiudiRichiestaPositivaSql = (context) => {
  return `
  DELETE FROM ${context.tabelle.val_attributo_domanda}
  WHERE id_richiesta_servizio_tcb = $[input.codiceRichiesta]
  AND cd_attributo = ${attributo.CD_MOTVO_CHIUSURA_DOMANDA}
  AND cd_val_attributo = $[input.codiceMotivoChiusura];
  
  INSERT INTO ${context.tabelle.val_attributo_domanda} (id_richiesta_servizio_tcb, cd_attributo, cd_val_attributo, tx_nota, ts_modifica, ts_creazione)
  VALUES ($[input.codiceRichiesta], ${attributo.CD_MOTVO_CHIUSURA_DOMANDA}, $[input.codiceMotivoChiusura], $[input.descrizioneMotivoChiusura], LOCALTIMESTAMP, LOCALTIMESTAMP);
  
  INSERT INTO ${context.tabelle.richiesta_servizio_base_stt} (id_richiesta_servizio, ts_variazione_stato, cd_stato_richiesta_servizio, id_utente)
  VALUES ($[input.codiceRichiestaBase], LOCALTIMESTAMP, '8', $[idUtente]);
  `;
};

export const richiestaUpdateSql = `
  UPDATE ${tabelle.val_attributo_domanda}
  SET 
    cd_val_attributo = $[input.codiceMotivoChiusura], 
    tx_nota = $[input.descrizioneMotivoChiusura],
    ts_modifica = LOCALTIMESTAMP 
  WHERE 
    id_richiesta_servizio_tcb = $[input.codiceRichiesta] AND
    cd_attributo = ${attributo.CD_MOTVO_CHIUSURA_DOMANDA};
`;

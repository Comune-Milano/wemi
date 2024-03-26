import { getQueryRichiesteTcb } from './richiesteTcb';

export const lavoratoriAssociatiRichiestaTcbSql = (context) => {
  const sql = `
  SELECT
  rmrl.id_lavoratore as "codiceLavoratore",
  CASE 
    WHEN vauNome.tx_val is not null
      THEN vauNome.tx_val
    WHEN u.tx_nome_utente is not null
      THEN u.tx_nome_utente
  END AS "nome",
  CASE 
    WHEN vauCognome.tx_val is not null
      THEN vauCognome.tx_val
    WHEN u.tx_cognome_utente is not null
      THEN u.tx_cognome_utente
  END AS "cognome",
  vauEta.nr_val as "eta",
  dtcbNazionalita.tl_valore_testuale #>> $[locale] as "nazionalita",
  dtcbStatoAssociazione.tl_valore_testuale #>> $[locale]  as "statoAssociazione",
  dtcbStatoAssociazione.cd_dominio_tcb as "codiceDominioTcb",
  (
    SELECT count(*) FROM ${context.tabelle.r_match_ric_lav}
    where id_lavoratore = rmrl.id_lavoratore
    and cd_stato_associazione = '2'
  ) as "numeroDomandeRifiutate",
  (
    SELECT count(*) FROM ${context.tabelle.r_match_ric_lav}
    where id_lavoratore = rmrl.id_lavoratore
    and cd_stato_associazione in ('1','3','4','6')
  ) as "numeroDomandeAccettate",
  rmrl.tx_nota as "notaRichiesta",
  CASE 
    WHEN dtcbMotivoDisassociazione.cd_dominio_tcb IS NOT NULL
      THEN json_build_object('id', dtcbMotivoDisassociazione.cd_dominio_tcb, 'value', dtcbMotivoDisassociazione.tl_valore_testuale #>> $[locale])
    ELSE NULL
  END as "statoDisassociazione",
  see.id_servizio_riferimento as "idServizio"
  FROM ${context.tabelle.r_match_ric_lav} rmrl
  LEFT JOIN ${context.tabelle.val_attributo_ut} as vauNome on rmrl.id_lavoratore = vauNome.id_utente and vauNome.cd_attributo = 198
  LEFT JOIN ${context.tabelle.val_attributo_ut} as vauCognome on rmrl.id_lavoratore = vauCognome.id_utente and vauCognome.cd_attributo = 185
  LEFT JOIN ${context.tabelle.utente_offerta_lav} as uol on rmrl.id_lavoratore = uol.id_utente_lav
  LEFT JOIN ${context.tabelle.utente} as u on uol.id_utente_lav = u.id_utente
  LEFT JOIN ${context.tabelle.val_attributo_ut} vauEta on rmrl.id_lavoratore = vauEta.id_utente and vauEta.cd_attributo = 176
  LEFT JOIN ${context.tabelle.val_attributo_ut} vauNazionalita on rmrl.id_lavoratore = vauNazionalita.id_utente and vauNazionalita.cd_attributo = 101
  LEFT JOIN ${context.tabelle.dominio_tcb} dtcbNazionalita on vauNazionalita.cd_val_attributo = dtcbNazionalita.cd_dominio_tcb and dtcbNazionalita.ty_dominio_tcb = 25
  LEFT JOIN ${context.tabelle.dominio_tcb} dtcbStatoAssociazione on cast(rmrl.cd_stato_associazione as numeric) = dtcbStatoAssociazione.cd_dominio_tcb and dtcbStatoAssociazione.ty_dominio_tcb = 51
  LEFT JOIN ${context.tabelle.dominio_tcb} as dtcbMotivoDisassociazione on rmrl.tx_nota = dtcbMotivoDisassociazione.tl_valore_testuale #>> $[locale] and dtcbMotivoDisassociazione.ty_dominio_tcb = 56
  INNER JOIN ${context.tabelle.richiesta_servizio_ente} as rse on rse.id_richiesta_servizio_ente = rmrl.id_richiesta
  INNER JOIN ${context.tabelle.servizio_erogato_ente} as see on see.id_servizio_ente = rse.id_servizio_erogato_ente
  WHERE rmrl.id_richiesta = $[codiceRichiesta]
  ORDER BY 
    (CASE rmrl.cd_stato_associazione
      WHEN '1' THEN '1'
      WHEN '6' THEN '2'
      WHEN '5' THEN '3'
    END
    ) ASC, uol.ts_ultima_modifica DESC
  `;

  context.logger.info(sql);
  return sql;
};

export const estraiDatiAssociaLavoratoriRichiestaSql = context => {
  let sql = getQueryRichiesteTcb(context);
  sql += `
  SELECT
  "codiceRichiestaBase",
  "codiceRichiesta", 
  "idServizio",
  "dataRichiesta",
  "jsImpersonificazione",
  "nomeFamiglia",
  "statoRichiestaFamiglia", 
  "lavoratoriAssociati",
  "ultimoOperatore", 
  "ultimoAggiornamento",
  "codiceDominioTcb",
  "statoChiusuraRichiesta",
  "notaChiusuraRichiesta",
  "recensioniEnte",
  "lavoratoriAssociatiSearch",
  "statoDisassociazione",
  "isLavoratoreAssociato"
  FROM resultTable
  WHERE "codiceRichiesta" = $[idRichiesta]
  `;

  return sql;
}

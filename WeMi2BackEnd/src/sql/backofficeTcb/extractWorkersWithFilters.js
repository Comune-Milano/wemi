import { generateFilterMatchCondition } from './utils/generateFilterMatchCondition';

/**
 * Function to extract workers for matching
 * @param {*} parameters the parameters
 * @returns {string} the query
 */
export const extractWorkerWithFilters = (parameters) => {

  const numeroElementi = 10;

  const selection = `
  select
  count(*) OVER() AS count,
  t1.id_utente_lav as "idLavoratore",
  TO_CHAR(t1.ts_creazione, 'DD/MM/YYYY') as "dataIscrizione",
  (
    SELECT  array_to_string(array_agg(tl_testo_2 ->> 'it'), ', ')
    FROM wemi2.servizio
    INNER JOIN wemi2.utente_offerta_servizio on utente_offerta_servizio.id_servizio_riferimento = servizio.id_servizio
	  INNER JOIN wemi2.contenuto ON contenuto.id_contenuto = servizio.id_servizio 
    WHERE utente_offerta_servizio.id_utente_lav = t1.id_utente_lav 
  ) as "tipoServizio",
  t2.id_servizio_riferimento as "idServizioRichiesta",
  COALESCE(vauNome.tx_val, '') as "nome",
  COALESCE(vauCognome.tx_val, '') as "cognome",
  dtcbStatoOccupazionale.tl_valore_testuale ->> 'it' as "statoOccupazionale",
  dtcbStatoCanditatura.tl_valore_testuale ->> 'it' as "statoCandidatura",
  uOperatore.ptx_username as "ultimoOperatore",
  TO_CHAR(t1.ts_ultima_modifica, 'DD/MM/YYYY') as "dataCambioStato",
  (SELECT cd_stato_associazione 
    FROM wemi2.r_match_ric_lav 
    WHERE id_lavoratore = t1.id_utente_lav and id_richiesta=$[idRichiesta]) as "statoAssociazione",
    (
      SELECT tl_valore_testuale ->> 'it'
        FROM wemi2.r_match_ric_lav 
      INNER JOIN wemi2.dominio_tcb ON 
      CAST(cd_stato_associazione as numeric) = cd_dominio_tcb and ty_dominio_tcb = 51
        WHERE id_lavoratore = t1.id_utente_lav and id_richiesta=$[idRichiesta] 
    ) as "descrizioneAssociazione",
   (
        SELECT COUNT(DISTINCT id_lavoratore)
          FROM wemi2.r_match_ric_lav 
          WHERE id_richiesta=$[idRichiesta] 
          and (
            cd_stato_associazione = '1'
            or  cd_stato_associazione = '5'
          or cd_stato_associazione = '6')
      ) as "countLavoratoriAssociati",
      (
        SELECT COUNT(DISTINCT id_lavoratore)
          FROM wemi2.r_match_ric_lav 
          WHERE id_richiesta=$[idRichiesta] 
          and (
            cd_stato_associazione = '1'
          )
      ) as "lavoratoreAssociato"
  FROM wemi2.utente_offerta_lav t1
  INNER JOIN wemi2.utente_offerta_servizio t2 ON t1.id_utente_lav = t2.id_utente_lav
  INNER JOIN wemi2.utente as uOperatore on t1.id_ult_operatore = uOperatore.id_utente
  LEFT JOIN wemi2.val_attributo_ut vauNome on t1.id_utente_lav = vauNome.id_utente AND vauNome.cd_attributo = 198
  LEFT JOIN wemi2.val_attributo_ut vauCognome on t1.id_utente_lav = vauCognome.id_utente AND vauCognome.cd_attributo = 185
  LEFT JOIN wemi2.servizio as s on t2.id_servizio_riferimento = s.id_servizio 
  INNER JOIN wemi2.val_attributo_offerta_ut t3 ON t3.id_utente_offerta_lav = t1.id_utente_lav and t3.cd_attributo = 109
  INNER JOIN wemi2.dominio_tcb as dtcbStatoOccupazionale on t3.cd_val_attributo = dtcbStatoOccupazionale.cd_dominio_tcb and dtcbStatoOccupazionale.ty_dominio_tcb = 36
  INNER JOIN wemi2.dominio_tcb as dtcbStatoCanditatura on t1.cd_ultimo_stato_offerta = dtcbStatoCanditatura.cd_dominio_tcb and dtcbStatoCanditatura.ty_dominio_tcb = 52
  INNER JOIN wemi2.utente as ut ON ut.id_utente = t1.id_utente_lav 
  \n`;

  const whereCondition = generateFilterMatchCondition(parameters);


  const groupAndOrderBy = `GROUP BY t1.id_utente_lav, vauNome.tx_val,  vauCognome.tx_val, t3.cd_val_attributo,
  dtcbStatoOccupazionale.tl_valore_testuale ->> 'it',
  dtcbStatoCanditatura.tl_valore_testuale ->> 'it',
  uOperatore.ptx_username, t1.ts_ultima_modifica,
  t2.id_servizio_riferimento
  ORDER BY "statoAssociazione" ASC, t3.cd_val_attributo ASC, dtcbStatoCanditatura.tl_valore_testuale ->> 'it' ASC, t1.id_utente_lav ASC
  LIMIT ${numeroElementi} OFFSET $[offset]`;

  const queryString = selection + whereCondition + groupAndOrderBy;

  return queryString;


};

/**
 * Function to extract the count of workers for matching
 * @param {*} parameters the parameters
 * @returns {string} the query
 */
export const extractWorkerWithFiltersCount = (parameters) => {

  const selection = `
  select 
  count(DISTINCT t1.id_utente_lav)
  FROM wemi2.utente_offerta_lav t1
  INNER JOIN wemi2.utente_offerta_servizio t2 ON t1.id_utente_lav = t2.id_utente_lav
  INNER JOIN wemi2.utente as uOperatore on t1.id_ult_operatore = uOperatore.id_utente
  LEFT JOIN wemi2.val_attributo_ut vauNome on t1.id_utente_lav = vauNome.id_utente AND vauNome.cd_attributo = 198
  LEFT JOIN wemi2.val_attributo_ut vauCognome on t1.id_utente_lav = vauCognome.id_utente AND vauCognome.cd_attributo = 185
  LEFT JOIN wemi2.servizio as s on t2.id_servizio_riferimento = s.id_servizio 
  INNER JOIN wemi2.val_attributo_offerta_ut t3 ON t3.id_utente_offerta_lav = t1.id_utente_lav and t3.cd_attributo = 109
  INNER JOIN wemi2.dominio_tcb as dtcbStatoOccupazionale on t3.cd_val_attributo = dtcbStatoOccupazionale.cd_dominio_tcb and dtcbStatoOccupazionale.ty_dominio_tcb = 36
  INNER JOIN wemi2.dominio_tcb as dtcbStatoCanditatura on t1.cd_ultimo_stato_offerta = dtcbStatoCanditatura.cd_dominio_tcb and dtcbStatoCanditatura.ty_dominio_tcb = 52
  INNER JOIN wemi2.utente as ut ON ut.id_utente = t1.id_utente_lav 
\n`;

  const whereCondition = generateFilterMatchCondition(parameters);

  const queryString = selection + whereCondition;

  return queryString;

};
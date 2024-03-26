import tabelle from 'tabelle';

export const insertMerchant = `
  INSERT INTO wemi2.merchant(
    id_ente,
    id_merchant,
    id_public_key,
    id_private_key,
    dt_inizio_val,
    dt_fine_val,
    ts_creazione
  )
  VALUES(
    $[idEnte],
    $[merchantId],
    $[publicKey],
    $[privateKey],
    $[dataInizio],
    $[dataFine],
    current_timestamp
  )
`;

export const insertEnte = `
  INSERT INTO ${tabelle.ente} (
    id_ente, 
    id_partita_iva_ente,
    nm_ente, 
    nm_ente_completo,
    nr_operatori_servizi_wemi,
    id_utente_admin,
    pg_versione,
    id_ente_rif,
    dt_inizio_val, 
    dt_fine_val,
    ts_creazione)
  VALUES (
    $[id_ente], 
    $[id_partita_iva_ente],
    $[nm_ente],
    $[nm_ente_completo],
    $[nr_operatori_servizi_wemi],
    $[id_utente],
    1,
    $[id_ente],
    current_date, 
    null,
    localtimestamp)
    returning *
  `;

  export const insertEnteStt = `
  INSERT INTO ${tabelle.ente_stt} (
    id_ente, 
    ts_variazione_stato,
    cd_stato_ente, 
    id_utente)
    VALUES (
      $[id_ente], 
      localtimestamp,
      $[cd_stato_ente], 
      $[idCittadino])
  `;
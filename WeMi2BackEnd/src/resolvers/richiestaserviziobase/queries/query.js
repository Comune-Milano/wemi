
export const selectRichiestaBaseByRichiestaEnte = `
  SELECT 
    rsb.id_richiesta_servizio_base AS "idRichiestaBase",
    rsb.dt_periodo_richiesto_dal AS "periodoRichiestoDal",
    rsb.dt_periodo_richiesto_al AS "periodoRichiestoAl",
    rsb.id_utente_richiedente AS "idUtente",
    rsb.js_dati_richiesta AS "jsDatiRichiesta",
    rsb.dt_inizio_val AS "dtInizioVal",
    rsb.dt_fine_val AS "dtFineVal",
    rsb.ts_creazione AS "tsCreazione"
  FROM wemi2.richiesta_servizio_ente rse
  INNER JOIN wemi2.richiesta_servizio_base rsb ON
    rse.id_richiesta_servizio_base = rsb.id_richiesta_servizio_base
  WHERE rse.id_richiesta_servizio_ente = $[idRichiestaEnte]
`;

export const insertStatoRichiestaServizioBase = `
  INSERT INTO wemi2.richiesta_servizio_base_stt(
    id_richiesta_servizio,
    ts_variazione_stato,
    cd_stato_richiesta_servizio,
    id_utente
  )
  VALUES (
    $[idRichiestaBase],
    localtimestamp, 
    $[stato],
    $[idUtente]
  )
`;

export const countRichiesteEnte = `
SELECT
  COUNT(DISTINCT ric_ente.id_richiesta_servizio_ente) AS count
  FROM wemi2.richiesta_servizio_ente AS ric_ente
  INNER JOIN wemi2.richiesta_servizio_base AS ric_base ON
  (id_utente_richiedente =  $[idUtente])
  INNER JOIN wemi2.richiesta_servizio_ente_stt AS ric_ente_stt ON
    (ric_ente.id_richiesta_servizio_ente = ric_ente_stt.id_richiesta_servizio_ente
      AND
      ric_ente_stt.cd_stato_ric_serv_ente <> '9'
    )
  WHERE ric_base.id_richiesta_servizio_base = ric_ente.id_richiesta_servizio_base;
`;
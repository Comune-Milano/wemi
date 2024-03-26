
export const selectServizioErogatoStt = `
  SELECT cd_stato_dati_servizio_ente
  FROM wemi2.servizio_erogato_ente_stt
  WHERE id_servizio_ente= $[id_servizio_ente] AND 
        ts_variazione_stato = (
        SELECT MAX(ts_variazione_stato)
        FROM wemi2.servizio_erogato_ente_stt
            WHERE id_servizio_ente= $[id_servizio_ente]
      )`;
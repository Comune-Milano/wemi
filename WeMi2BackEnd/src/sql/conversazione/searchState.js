import tabelle from 'tabelle';

export const searchState = `
  SELECT cd_stato_chat
  FROM ${tabelle.richiesta_servizio_ente_stt}
  WHERE id_richiesta_servizio_ente=$[id_richiesta_servizio_ente] AND
    ts_variazione_stato = (
      SELECT MAX(ts_variazione_stato)
      FROM ${tabelle.richiesta_servizio_ente_stt}
      WHERE id_richiesta_servizio_ente=$[id_richiesta_servizio_ente]
    )           
`;
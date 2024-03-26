export const findMaxVariazioneStatoByIdRicEnte = `
SELECT cd_stato_ric_serv_ente as "statoRichiesta"
FROM wemi2.richiesta_servizio_ente_stt as rses
WHERE id_richiesta_servizio_ente = $[idRichiesta]
 and ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
           FROM wemi2.richiesta_servizio_ente_stt
           WHERE id_richiesta_servizio_ente = rses.id_richiesta_servizio_ente
          )
`;
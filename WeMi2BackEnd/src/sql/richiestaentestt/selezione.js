export const findMaxVariazioneStato = `
SELECT MAX(ts_variazione_stato)
FROM wemi2.richiesta_servizio_ente_stt
WHERE id_richiesta_servizio_ente = $[idRichiesta]
`;
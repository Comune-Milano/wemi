export const estraiStatoCandidaturaTCB = `
SELECT  cd_ultimo_stato_offerta
FROM wemi2.utente_offerta_lav
WHERE id_utente_lav=$[idUtenteLav];
`;
import tabelle from 'tabelle';

export const selectJsImpersonificazione = `
SELECT
js_impersonificazione
FROM wemi2.richiesta_servizio_tcb
WHERE id_richiesta_servizio_tcb = $[idRichiestaTCB]
`;
export const eliminaOperatoreEnteSql = `
DELETE FROM wemi2.r_operatore_ente
WHERE id_utente = $[id_utente]
AND id_ente = $[id_ente];

UPDATE wemi2.utente
SET ty_operatore_ente = $[ty_operatore_ente]
WHERE id_utente = $[id_utente];
`;

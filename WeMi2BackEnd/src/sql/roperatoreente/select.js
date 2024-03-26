export const selezionaEnteOperatoreSql = `
SELECT e.* FROM wemi2.r_operatore_ente as roe
INNER JOIN wemi2.ente as e on roe.id_ente = e.id_ente
WHERE roe.id_utente = $[id_utente];
`;

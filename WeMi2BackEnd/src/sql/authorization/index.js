export const findProfileAuthorizations = `
SELECT 
  a.cd_autorizzazione,
  a.tx_descrizione
FROM wemi2.d_autorizzazione as a
INNER JOIN wemi2.r_profilo_autorizzazione as rpa ON
  a.cd_autorizzazione = rpa.cd_autorizzazione
INNER JOIN wemi2.r_utente_profilo as rup ON 
  rup.cd_profilo = rpa.cd_profilo
WHERE rup.id_utente = $[user.idUtente]
`;

export const findUserAuthorizations = `
SELECT 
  a.cd_autorizzazione,
  a.tx_descrizione
FROM wemi2.d_autorizzazione as a
INNER JOIN wemi2.r_utente_profilo_autorizzazione as rupa ON
  a.cd_autorizzazione = rupa.cd_autorizzazione
WHERE rupa.id_utente = $[user.idUtente]
`;

export const deleteAuthorization = `
DELETE FROM wemi2.r_utente_profilo_autorizzazione
WHERE id_utente = $[user.idUtente] AND cd_profilo = $[user.profile] AND cd_autorizzazione = $[authorization.code]
RETURNING *; 
`;

export const selectSaveAuthorization = `
SELECT *
FROM wemi2.r_utente_profilo_autorizzazione
WHERE id_utente = $[user.idUtente] AND cd_profilo = $[user.profile] AND cd_autorizzazione = $[authorization.code]; 
`;

export const insertAuthorization = `
INSERT INTO r_utente_profilo_autorizzazione (id_utente, cd_profilo, cd_autorizzazione) VALUES ($[user.idUtente], $[user.profile], $[authorization.code]);
`;
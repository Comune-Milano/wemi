export const findUserValidityDates = `
      SELECT *
      FROM wemi2.utente AS u
      INNER JOIN wemi2.r_utente_profilo AS rup ON
        rup.id_utente = u.id_utente
      WHERE u.id_utente = $[user.idUtente] AND rup.cd_profilo = $[user.profileObject.code] AND
      ( CURRENT_DATE >= rup.dt_inizio_val OR rup.dt_inizio_val IS NULL) AND (CURRENT_DATE <= rup.dt_fine_val OR rup.dt_fine_val IS NULL)
    
`;

export const findUsersByProfile = `
SELECT id_utente as "id", TRIM(cd_profilo) as "code"
FROM wemi2.r_utente_profilo as rup
WHERE id_utente IN ($[users:list]) and cd_profilo = $[profile]
`;
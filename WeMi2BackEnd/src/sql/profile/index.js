export const findAllProfile = `
SELECT 
  TRIM(cd_profilo) as cd_profilo,
  tx_descrizione
FROM wemi2.d_profilo
`;

export const findProfileByAuthorization = `
  SELECT TRIM(dp.cd_profilo) as code,
    dp.tx_descrizione as description
  FROM wemi2.d_profilo as dp
  INNER JOIN wemi2.r_profilo_autorizzazione as rpa ON
    rpa.cd_profilo = dp.cd_profilo
  WHERE rpa.cd_autorizzazione = $[authorization.code]  
`;
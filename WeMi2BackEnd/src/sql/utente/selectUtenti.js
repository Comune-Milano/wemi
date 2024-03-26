
export const selectUtenti = 
`SELECT 
  CAST(count(*) OVER() AS Int) AS "totalRows",
  utente.id_utente, 
  TRIM(r_utente_profilo.cd_profilo) as cd_profilo, 
  ptx_email, 
  tx_descrizione, 
  tx_nome_utente, 
  ptx_username, 
  r_utente_profilo.dt_inizio_val::timestamp with time zone as "dt_inizio_val", 
  r_utente_profilo.dt_fine_val::timestamp with time zone as "dt_fine_val",
  tx_cognome_utente
FROM wemi2.utente
LEFT JOIN wemi2.r_utente_profilo on utente.id_utente = r_utente_profilo.id_utente
LEFT JOIN wemi2.d_profilo on r_utente_profilo.cd_profilo = d_profilo.cd_profilo
`;

export const conditionBasic = `
  WHERE TRUE
`;

export const surnameFilter = 
' AND LOWER(tx_cognome_utente) LIKE LOWER(\'%$[filters.surname:value]%\') ';

export const nameFilter = 
' AND LOWER(tx_nome_utente) LIKE LOWER(\'%$[filters.name:value]%\') ';

export const descriptionFilter =
' AND (LOWER(tx_descrizione) LIKE LOWER($[filters.description]))';

export const emailFilter =
' AND (LOWER(ptx_email) LIKE LOWER(\'%$[filters.email:value]%\'))';

export const usernameFilter =
' AND (LOWER(ptx_username) LIKE LOWER(\'%$[filters.username:value]%\'))';

export const codeFilter = 
' AND r_utente_profilo.cd_profilo = $[filters.profileCode]';

export const codeFilterMulti = 
' AND r_utente_profilo.cd_profilo IN ($[filters.profileCode:list])';

export const dataDalFilter = 
' AND (dt_fine_val >=  $[filters.startDate] OR dt_fine_val IS NULL)';

export const dataAlFilter = 
' AND dt_inizio_val <=  $[filters.endDate] ';

export const orderDefault = 
' ORDER BY cd_profilo DESC, utente.id_utente ASC,  tx_cognome_utente ASC, tx_nome_utente ASC, ptx_email ASC ';

export const orderByProfile = 
' ORDER BY cd_profilo ASC, utente.id_utente ';

export const orderByUser = 
' ORDER BY tx_cognome_utente ASC, tx_nome_utente ASC, ptx_email ASC, utente.id_utente ASC ';

export const limitQuery = 'LIMIT $[limit.elementsNumber] OFFSET $[limit.offset];';

export const selectFindUser = `
SELECT *,
(
  select ptx_username 
  from wemi2.utente u1 
  where u1.id_utente = rup.id_utente_ultima_modifica 
) as ptx_username_last_modified, 
TRIM(rup.cd_profilo) as cd_profilo,
rup.ts_ultima_modifica,
dp.tx_descrizione,
rup.dt_inizio_val::timestamp with time zone as "dt_inizio_val",
rup.dt_fine_val::timestamp with time zone as "dt_fine_val",
( 
  SELECT coalesce (
    array_to_json (		
      array_agg(
          json_build_object(
            'description', d_autorizzazione.tx_descrizione,
            'code', rUtProfAut.cd_autorizzazione 
          )
        )
      ),
      json_build_array () 
    )
    FROM wemi2.utente as u1
    INNER JOIN wemi2.r_utente_profilo_autorizzazione as rUtProfAut ON rUtProfAut.id_utente = u.id_utente
    INNER JOIN wemi2.d_autorizzazione on d_autorizzazione.cd_autorizzazione = rUtProfAut.cd_autorizzazione
    where u1.id_utente = u.id_utente
  ) as authorizations
FROM wemi2.utente as u
INNER JOIN wemi2.r_utente_profilo as rup ON 
  rup.id_utente = u.id_utente
LEFT JOIN wemi2.d_profilo as dp on rup.cd_profilo = dp.cd_profilo
WHERE u.id_utente = $[user.idUtente];
`;


export const deleteAllAuthorizationsByUser = `
DELETE FROM wemi2.r_utente_profilo_autorizzazione
WHERE id_utente = $[user.idUtente];  
`;

export const findAllAuthorizationsByUser = `
  SELECT *
  FROM wemi2.r_utente_profilo_autorizzazione
  WHERE id_utente = $[user.idUtente];
`;
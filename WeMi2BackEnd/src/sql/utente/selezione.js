import tabelle from 'tabelle';
import { AMMINISTRATORE } from '../../constants/usercode';

export const selezionaByEmail = `
SELECT utente.*, (
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
    INNER JOIN wemi2.r_utente_profilo_autorizzazione as rUtProfAut ON rUtProfAut.id_utente = utente.id_utente
    INNER JOIN wemi2.d_autorizzazione on d_autorizzazione.cd_autorizzazione = rUtProfAut.cd_autorizzazione
	where u1.id_utente = utente.id_utente
	) as authorizations,
CASE 
    WHEN r_operatore_ente.id_utente IS NOT NULL THEN r_operatore_ente.id_ente
    WHEN ente.id_utente_admin IS NOT NULL THEN ente.id_ente
END AS id_ente
FROM wemi2.utente 
--Da commentare se con service
LEFT JOIN wemi2.ente ON id_utente_admin = utente.id_utente
LEFT JOIN wemi2.r_operatore_ente ON r_operatore_ente.id_utente = utente.id_utente
WHERE ptx_email = $[email] or ptx_username = $[email]
LIMIT 1;
`;
export const selezionaByUsername = `
SELECT utente.*,
CASE 
    WHEN r_operatore_ente.id_utente IS NOT NULL THEN r_operatore_ente.id_ente
    WHEN ente.id_utente_admin IS NOT NULL THEN ente.id_ente
END AS id_ente
FROM wemi2.utente 
--Da commentare se con service
LEFT JOIN wemi2.ente ON id_utente_admin = utente.id_utente
LEFT JOIN wemi2.r_operatore_ente ON r_operatore_ente.id_utente = utente.id_utente
WHERE ptx_email=$[email]
LIMIT 1;
`;

export const selezionaByToken = `
SELECT utente.*, ente.id_ente 
FROM wemi2.utente 
LEFT JOIN wemi2.ente ON ente.id_utente_admin = utente.id_utente
LEFT JOIN wemi2.r_operatore_ente ON r_operatore_ente.id_utente = utente.id_utente 
WHERE js_anagrafica_residenza->> 'token' = $[token];
`;

export const selezionaByTyOperatoreAndEmail = `
SELECT * 
FROM wemi2.utente 
INNER JOIN wemi2.ente ON id_utente_admin = id_utente
WHERE ptx_email = $[email] and ty_operatore_ente = $[tyOperatore]
`;
export const selezionaByTyOperatoreAndUsername = `
SELECT * 
FROM wemi2.utente
INNER JOIN wemi2.r_operatore_ente ON r_operatore_ente.id_utente = utente.id_utente
INNER JOIN wemi2.ente ON r_operatore_ente.id_ente = ente.id_ente 
WHERE ptx_email = $[email] and ty_operatore_ente = $[tyOperatore] 
`;

export const verificaLavoratore = `
SELECT * 
FROM wemi2.utente
WHERE ptx_username = $[username] and ty_operatore_ente = $[tyOperatore] and fg_lavoratore = $[fgLavoratore]
`;

export const findAllUsersAdministrators = `
SELECT * 
FROM wemi2.utente
WHERE cd_profilo_utente = 'A'
`;

export const selezionaByIdUtenteSql = `
SELECT * FROM wemi2.utente
WHERE id_utente = $[id_utente];
`;

export const selezionaUtenteAdminEnteSql = `
SELECT u.* FROM wemi2.ente as e
INNER JOIN wemi2.utente as u on e.id_utente_admin = u.id_utente
WHERE id_ente = $[id_ente];
`;

export const selezioneIdUtenteAdmin = `SELECT id_utente FROM ${tabelle.utente} INNER JOIN wemi2.ente ON id_utente_admin = id_utente WHERE id_ente = $[id_ente]`;

export const verificaUtenteAdmin = `
SELECT u.* 
FROM wemi2.utente as u
WHERE id_utente = $[idUtente] and cd_profilo_utente='${AMMINISTRATORE}';
`;


export const selectUserFiscalCode = `
SELECT DISTINCT utente.tx_cognome_utente as "cognome",utente.tx_nome_utente as "nome",
utente.ptx_codice_fiscale,utente.ptx_email, utente.id_utente, ty_operatore_ente as "type", cd_profilo_utente as "profile"
FROM ${tabelle.utente}
INNER JOIN wemi2.r_utente_profilo as rup ON
	rup.id_utente = utente.id_utente 
WHERE 
	rup.cd_profilo IN ($[profiles:list])
	AND CURRENT_DATE >= rup.dt_inizio_val 
	AND (rup.dt_fine_val <= CURRENT_DATE OR rup.dt_fine_val IS NULL)
	AND UPPER(utente.ptx_codice_fiscale) = UPPER($[codicefiscale]) 
`;
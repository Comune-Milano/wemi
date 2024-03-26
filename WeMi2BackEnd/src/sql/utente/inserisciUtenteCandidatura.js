import tabelle from 'tabelle';

export const inserisciUtenteCandidatura =  `
INSERT INTO ${tabelle.utente} (id_utente,cd_profilo_utente,fg_accettazione_privacy_wemi,
ptx_codice_fiscale,ptx_username,ptx_codana,ty_operatore_ente,fg_lavoratore,ptx_email,
tx_nome_utente,tx_cognome_utente,cd_sesso_utente,dt_nascita,js_anagrafica_residenza,ts_primo_login,
ts_ultima_modifica,ts_creazione)
VALUES (nextVal('wemi2.seq_utente'),'C','S',
$[ptx_codice_fiscale], $[ptx_username],null,0,'N',null,
$[tx_nome_utente], $[tx_cognome_utente],null,
null,null,localtimestamp,localtimestamp,localtimestamp)`;
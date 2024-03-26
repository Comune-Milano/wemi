import tabelle from "tabelle";

export const InserimentoUtente = (args) =>`
INSERT INTO wemi2.utente 
(id_utente,
cd_profilo_utente, 
ptx_codice_fiscale, 
ptx_username, 
ty_operatore_ente, 
ptx_email, 
tx_nome_utente, 
tx_cognome_utente, 
${args.gender? 'cd_sesso_utente,' : ''}
${args.birthday? 'dt_nascita,' : ''} 
js_anagrafica_residenza, 
ts_primo_login, 
ts_ultima_modifica, 
ts_creazione)
VALUES
(
nextval('wemi2.seq_utente'),
$[profile],
$[fiscalCode],
$[username],
$[operatoreEnte],
$[email],
$[name],
$[surname],
${args.gender? '$[gender],' : ''}
${args.birthday? '$[birthday],' : ''} 
$[personalData],
localtimestamp,
localtimestamp,
localtimestamp)
RETURNING *;
`;

export const inserisciUtenteOperatoreEnteSql = `
  INSERT INTO wemi2.utente (
    id_utente, 
    cd_profilo_utente, 
    fg_accettazione_privacy_wemi, 
    ptx_email,
    ty_operatore_ente, 
    ts_ultima_modifica, 
    ts_creazione
  )
  VALUES (
    nextval('seq_utente'), 
    'C', 
    1,
    $[email],
    2,
    LOCALTIMESTAMP,
    LOCALTIMESTAMP
  );

  INSERT INTO wemi2.r_operatore_ente (id_utente, id_ente)
  VALUES (currval('seq_utente'), $[id_ente]);
`;

export const inserisciRutenteProfilo = `
INSERT INTO wemi2.r_utente_profilo 
(
  id_utente, cd_profilo, dt_inizio_val, id_utente_ultima_modifica, ts_ultima_modifica
)
VALUES 
(
$[risultato.id_utente],$[utente.profile], current_date, $[risultato.id_utente], LOCALTIMESTAMP
);`;


export const inserisciUtenteAdminEnte = `
INSERT INTO ${tabelle.utente} (
     id_utente, 
     cd_profilo_utente,
     fg_accettazione_privacy_wemi,
     ptx_codice_fiscale, 
     ptx_username, 
     ptx_codana,
     ty_operatore_ente, 
     fg_lavoratore,
     ptx_email,
     js_anagrafica_residenza,
     ts_ultima_modifica, 
     ts_creazione)
  VALUES (
     nextVal('wemi2.seq_utente'),
     'C',
     null,
     null, 
     $[ptx_email], 
     null,
     1, 
     null,
     $[ptx_email],
     null,
     localtimestamp, 
     localtimestamp)
returning *`;
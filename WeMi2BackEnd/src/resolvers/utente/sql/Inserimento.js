const InserimentoUtente = `
INSERT INTO utente (
    id_utente,
    cd_profilo_utente, 
    ptx_codice_fiscale, 
    ptx_username, 
    ty_operatore_ente, 
    ptx_email, 
    tx_nome_utente, 
    tx_cognome_utente, 
    ts_primo_login, 
    ts_ultima_modifica, 
    ts_creazione)
    VALUES (NEXTVAL('wemi2.seq_utente'), 
        $[cdProfiloUtente], 
         $[ptxCodiceFiscale],
         $[ptxUsername], 
         $[tyOperatoreEnte], 
         $[ptxEmail], 
         $[txNomeUtente], 
         $[txCognomeUtente],
         localtimestamp, 
         localtimestamp, 
         localtimestamp
)
RETURNING  id_utente as "idCittadino", 
ptx_username as "username",
cd_profilo_utente as "Profilo",
tx_nome_utente as "Nome",
cd_profilo_utente as "Ruolo"
;
`;

export default InserimentoUtente;
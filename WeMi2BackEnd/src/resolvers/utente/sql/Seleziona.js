const SelezionaUtente = `
    SELECT id_utente, cd_profilo_utente, fg_accettazione_privacy_wemi, ptx_codice_fiscale, ptx_username, ptx_codana, ty_operatore_ente, fg_lavoratore, ptx_email, tx_nome_utente, tx_cognome_utente, cd_sesso_utente, dt_nascita, js_anagrafica_residenza, ts_primo_login, ts_ultima_modifica, ts_creazione
    FROM utente
    WHERE ptx_email=$[email];
`;

export default SelezionaUtente;
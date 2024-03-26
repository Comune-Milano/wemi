const UpdateUtente = `
    UPDATE utente
    SET ts_ultima_modifica=localtimestamp
    WHERE id_utente = $[idUtente]
    RETURNING id_utente as "idCittadino", 
    ptx_username as "username",
    cd_profilo_utente as "Profilo",
    tx_nome_utente as "Nome",
    cd_profilo_utente as "Ruolo";
`;

export default UpdateUtente;
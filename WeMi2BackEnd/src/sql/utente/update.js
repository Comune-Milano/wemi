export const updateUtente = (args) => `
            UPDATE wemi2.utente 
            SET
            ptx_codice_fiscale = $[fiscalCode],
            ptx_username = $[username],
            tx_nome_utente = $[name],
            tx_cognome_utente = $[surname],
            ${args.gender ? `cd_sesso_utente = $[gender],` : ''}
            ${args.birthday ? ` dt_nascita = $[birthday],` : ''}
            ${args.personalData ? `js_anagrafica_residenza = $[personalData],` : ''}
            ts_ultima_modifica = localtimestamp
            WHERE ptx_email = $[email]
            RETURNING *;
        `;

export const updateUserToken = `
        UPDATE wemi2.utente
        SET js_anagrafica_residenza = $[personalData]
        WHERE js_anagrafica_residenza ->> 'token' = $[token]
        RETURNING *;
        `;

export const updateFlagCittadino = `UPDATE wemi2.utente 
        SET fg_lavoratore = '0' 
        WHERE id_utente = $[idLavoratore]
        returning *;
        `;

export const updateTyOperatoreEnteSql = `
        UPDATE wemi2.utente
        SET ty_operatore_ente = $[ty_operatore_ente],
        ts_ultima_modifica = LOCALTIMESTAMP
        WHERE id_utente = $[id_utente];
`;

export const updateTimestampPrimoLoginSql = `
        UPDATE wemi2.utente
        SET ts_primo_login = LOCALTIMESTAMP
        WHERE id_utente = $[id_utente];
`;

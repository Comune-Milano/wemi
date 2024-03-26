import tabelle from 'tabelle';

export const searchUserByEmail = `
SELECT
      u.id_utente,
      u.cd_profilo_utente,
      u.fg_accettazione_privacy_wemi,
      u.ptx_codice_fiscale,
      u.ptx_username,
      u.ptx_codana,
      u.ty_operatore_ente,
      u.fg_lavoratore,
      u.ptx_email,
      u.js_anagrafica_residenza,
      u.ts_ultima_modifica,
      u.ts_creazione     
FROM ${tabelle.utente} u
WHERE ptx_email=$[ptx_email];
`;

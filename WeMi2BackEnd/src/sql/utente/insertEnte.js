import tabelle from 'tabelle';
import { TY_AMMINISTRATORE_ENTE } from 'constants/userroles';

export const insertUtenteXente = `
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
               ${TY_AMMINISTRATORE_ENTE}, 
               null,
               $[ptx_email],
               null,
               localtimestamp, 
               localtimestamp)
        returning *`;
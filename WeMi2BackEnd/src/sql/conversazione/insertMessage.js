import tabelle from 'tabelle';
import { TY_AMMINISTRATORE_ENTE } from 'constants/userroles';
import sequence from '../../sequence';

export const insertMessage = (fg_msg_ente) => (
  ` INSERT INTO ${tabelle.conversazione_utente_ente}(
      id_conversazione_ut_ente, id_richiesta_servizio_ente, tx_testo_messaggio, id_utente_autore_msg, fg_msg_ente, ts_creazione)
      VALUES (NEXTVAL('${sequence.seq_conversazione_utente_ente}'), 
      $[id_richiesta_servizio_ente], 
      $[tx_testo_messaggio], $[idUtente], '${fg_msg_ente}', localtimestamp) RETURNING *;      
    `
);
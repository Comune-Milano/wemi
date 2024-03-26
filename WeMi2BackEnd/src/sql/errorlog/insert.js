
import sequence from '../../sequence';
import tabelle from '../../tabelle';

export const insertError = `
  INSERT INTO ${tabelle.errore}(
    id_errore,
    descrizione,
    id_utente,
    ts_creazione
  )
  VALUES(
    nextval('${sequence.seq_errore}'),
    $[description],
    $[userId],
    CURRENT_TIMESTAMP
  )
`;
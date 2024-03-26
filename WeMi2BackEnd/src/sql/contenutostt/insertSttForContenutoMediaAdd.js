import tabelle from 'tabelle';

export const insertSttForContenutoMediaAdd = `
INSERT INTO ${tabelle.contenuto_stt} (
            id_contenuto,
            ts_variazione_stato,
            cd_stato_contenuto,
            id_utente)
VALUES (
          $[idContenuto],
          localtimestamp,
          1,
          $[id_utente])
returning * 
`;
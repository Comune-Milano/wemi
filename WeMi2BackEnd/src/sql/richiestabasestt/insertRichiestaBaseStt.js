import tabelle from 'tabelle';

export const insertRichiestaBaseStt = `
INSERT INTO ${tabelle.richiesta_servizio_base_stt}(
    id_richiesta_servizio, ts_variazione_stato, cd_stato_richiesta_servizio, id_utente) 
    VALUES
     ($[id_richiesta_servizio_base], localtimestamp, 1, $[id_utente_richiedente]);`
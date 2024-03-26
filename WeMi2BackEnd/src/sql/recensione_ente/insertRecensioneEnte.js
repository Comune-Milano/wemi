import tabelle from 'tabelle';

export const insertRecensioneEnte = `
INSERT INTO ${tabelle.recensione_ente}
    (id_rich_serv_rec, ts_creazione)
VALUES 
    ($[idRichiestaEnte], localtimestamp) ;
`;
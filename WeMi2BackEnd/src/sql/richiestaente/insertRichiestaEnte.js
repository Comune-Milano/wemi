import tabelle from 'tabelle';

export const insertRichiestaEnte =  `
INSERT INTO ${tabelle.richiesta_servizio_ente}(
    id_richiesta_servizio_ente,
    id_richiesta_servizio_base, 
    id_servizio_erogato_ente, 
    im_costo_totale_calcolato,
    ts_creazione)
   VALUES (setval($[seqRichiestaEnte], 
   (SELECT COALESCE( CAST ( MAX(id_richiesta_servizio_ente) AS INT), 199999 ) + 1 FROM ${tabelle.richiesta_servizio_ente})),
    $[id_richiesta_servizio_base],
     $[id_servizio_erogato_ente],
     $[im_costo_totale_calcolato],
    localtimestamp) RETURNING *;

   `
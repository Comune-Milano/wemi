import tabelle from 'tabelle';

export const findEnteInfoByidRequest = `
select * 
from wemi2.ente
inner join wemi2.dati_propri_ente ON id_ente = dati_propri_ente.id_ente_rif
INNER JOIN wemi2.servizio_erogato_ente ON id_ente_erogatore = id_ente
INNER JOIN wemi2.richiesta_servizio_ente ON id_servizio_erogato_ente = id_servizio_ente
inner join wemi2.utente ON id_utente_admin = id_utente
inner join wemi2.contenuto ON id_contenuto = id_servizio_riferimento
inner join wemi2.media ON id_img_logo = id_media
where id_richiesta_servizio_ente = $[idRichiestaEnte]  
`;

export const selectDatiMerchant = `
  SELECT
    id_ente as "idEnte",
    id_merchant as "merchantId",
    id_public_key as "publicKey",
    id_private_key as "privateKey",
    dt_inizio_val::timestamp with time zone as "dataInizio",
    dt_fine_val::timestamp with time zone as "dataFine",
    ts_creazione
  FROM
    wemi2.merchant
  WHERE
    id_ente = $[idEnte]
`;

export const selectValidDataMerchant = `
SELECT 
  id_merchant as "merchantId"
FROM wemi2.merchant
WHERE id_ente = $[id_ente] AND
  current_date >= dt_inizio_val AND
  (
    dt_fine_val IS NULL OR
    current_date <= dt_fine_val
  );
`;

export const findEnteInfoEmail =  `
SELECT 
nm_ente as "nomeEnte", 
id_ente,
js_primo_contatto ->> 'txEmail' as "emailEnte",
js_primo_contatto ->> 'txTelefono' as "numeroTelefono",
id_richiesta_servizio_base as "idRichiestaBase",
tl_testo_1 ->> 'it' as "nomeServizio"
FROM wemi2.ente AS e
INNER JOIN wemi2.dati_propri_ente ON e.id_ente = dati_propri_ente.id_ente_rif
INNER JOIN wemi2.servizio_erogato_ente ON id_ente_erogatore = id_ente
INNER JOIN wemi2.richiesta_servizio_ente ON id_servizio_erogato_ente = id_servizio_ente
INNER JOIN wemi2.utente ON id_utente_admin = id_utente
INNER JOIN wemi2.contenuto ON id_contenuto = id_servizio_riferimento
WHERE id_richiesta_servizio_ente = $[idRichiestaEnte]
  `;

export const selectPersone = `
  SELECT
    id_prezzo_persone as "idPrezzoPersone",
    id_prezzo as "idPrezzo",
    qt_persone_a as "qtPersoneA",
    qt_persone_da as "qtPersoneDa"
  FROM
    wemi2.srv_prezzo_persone
  WHERE
    id_prezzo = $[idPrezzo]
`;

export const selectQuantita = `
  SELECT
    id_quantita as "idQuantita",
    id_prezzo_persone as "idPrezzoPersone",
    qt_unita_a as "qtUnitaA",
    qt_unita_da as "qtUnitaDa",
    valore
  FROM
    wemi2.srv_prezzo_persone_quantita
  WHERE
    id_prezzo_persone = $[idPrezzoPersone]
`;

export const selectPrezzo = `
  SELECT
    id_prezzo as "idPrezzo",
    id_servizio_ente as "idServizioEnte",
    cd_tipo_offerta_srv as "cdTipoOffertaServizio",
    dt_inizio::timestamp with time zone as "dataInizio",
    dt_fine::timestamp with time zone as"dataFine",
    tx_titolo_finanziamento as "txTitoloFinanziamento",
    qt_minima_unita as "qtMinimaUnita",
    im_prezzo_minimo as "imPrezzoMinimo",
    im_prezzo_minimo_cond as "imPrezzoMinimoCond",
    cd_tipo_servizio_erog as "cdTipoServizioErog",
    tx_note_al_prezzo as "txNoteAlPrezzo"
  FROM 
    wemi2.srv_prezzo
  WHERE id_servizio_ente = $[idServizioEnte];`
  ;

export const selezionaEnteByOperatoreEnteAdminSql = `
SELECT * 
FROM wemi2.ente
WHERE id_utente_admin = $[id_utente];
`;

export const findIdEnteForOperatoreOrAdmin = `
SELECT e.id_ente as "idEnte"
FROM wemi2.ente as e
WHERE e.id_utente_admin = $[idUtente] 
UNION
SELECT roe.id_ente as "idEnte"
FROM wemi2.ente as e
INNER JOIN wemi2.r_operatore_ente as roe ON e.id_ente = roe.id_ente
WHERE roe.id_utente = $[idUtente]
`;

export const findEnti = `
SELECT  
        e1.id_ente,
        e1.pg_versione,
        id_partita_iva_ente,
        nm_ente,
        nm_ente_completo,
        uT.ptx_email,
        u.id_utente,
        e2.id_utente as "idStt",
        u.ptx_username,
        ts_variazione_stato,
        cd_stato_ente,
        d.tl_valore_testuale
       
        
FROM    ${tabelle.ente} e1

LEFT OUTER JOIN ${tabelle.ente_stt} e2
  ON e2.id_ente = e1.id_ente AND
     e2.ts_variazione_stato = (select max(ts_variazione_stato)
                              from ${tabelle.ente_stt} ex where ex.id_ente = e1.id_ente) 

left outer  JOIN wemi2.dominio d
ON e2.cd_stato_ente= d.cd_dominio and d.ty_dominio='STATO_ENTE'
                              
LEFT OUTER JOIN ${tabelle.utente} u
          ON e2.id_utente = u.id_utente

LEFT OUTER JOIN ${tabelle.utente} uT
          ON e1.id_utente_admin = uT.id_utente          
        ORDER BY
                e1.id_ente_rif DESC,
                e1.pg_versione DESC
       ;
`;

export const findServicesEnte =   `
select CAST( count(*) AS Int), id_ente_erogatore
from ${tabelle.servizio_erogato_ente}
where id_ente_erogatore IN ($[result:csv])
GROUP BY id_ente_erogatore
`;

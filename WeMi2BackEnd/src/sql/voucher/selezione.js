import tabelle from 'tabelle';


export const selectAllVoucher = `
    SELECT
      COUNT(*) OVER() AS "totalRows",
      v.id_voucher as "idVoucher",
      v.id_file_voucher,
      v.id_sostegno_economico,
      c.tl_testo_1 ->> 'it' AS "descrizioneSostegnoEconomico",
      v.cd_voucher as "code",
      v.cd_bando as "bando",
      v.cd_domanda,
      cast(v.dt_inizio_val as timestamp) as "inizioValidita",
      cast(v.dt_fine_val as timestamp) as "fineValidita",
      v.tx_nome_titolare as "nomeTitolare",
      v.tx_cognome_titolare as "cognomeTitolare",
      v.ptx_cf_titolare as "cfIntestatario",
      v.js_dati_voucher ->> 'txCFMinore' as "cfMinore", -- CF minore
      -- v.js_dati_voucher,
      v.im_totale as "totalImport",
      dsv.tl_valore_testuale ->> 'it' state,    -- Stato dei voucher
      v.ts_caricamento as "dateLastModified",
      v.id_utente_caricamento,
      v.ts_attivazione,
      v.id_utente_attivazione,
      v.ts_annullo,
      v.id_utente_annullo,
      v.ts_controllo_utilizzo,
      v.tx_email_contatto as "emailContatto",
      v.tx_cell_contatto as "cellContatto",
      sum(
        CASE tv.cd_stato_transazione 
        WHEN '1' then 0    
        WHEN '2' then 0     
        WHEN '3' then im_speso     
                ELSE 0 END) as "countedImport",  -- Importo contabilizzato
      v.im_totale - sum(
      CASE tv.cd_stato_transazione 
        WHEN '1' then im_speso     
        WHEN '2' then 0     
        WHEN '3' then im_speso     
      ELSE 0 END) as "remainingImport"           -- Importo residuo

    from ${tabelle.voucher} v
      left outer join ${tabelle.transazione_voucher} tv on tv.id_voucher = v.id_voucher
      left outer join ${tabelle.dominio} dsv on dsv.cd_dominio = v.cd_stato_voucher and dsv.ty_dominio = 'STATO_VOUCHER'
      left outer join wemi2.contenuto c on c.id_contenuto = v.id_sostegno_economico
      -- left outer join wemi2.contenuto_stt cstt on cstt.id_contenuto = c.id_contenuto

    where c.ty_contenuto = 17 -- Sostegni economici 
      -- and cstt.cd_stato_contenuto = 2  -- Attivi/Pubblicati 
      -- and cstt.ts_variazione_stato = (select MAX(ts_variazione_stato) from wemi2.contenuto_stt where id_contenuto =  cstt.id_contenuto)      
      
    -- order by v.dt_inizio_val, v.cd_voucher;`;

export const selectAllVoucherTransaction = `
  SELECT
      COUNT(*) OVER() AS "totalRows",
      tv.id_transazione_voucher as "idTransazioneVoucher",
      tv.id_voucher as "idVoucher",
      tv.id_richiesta_servizio_ente as "idRichiestaServizioEnte",
      tv.id_interno_transazione as "idInternoTransazione",
      tv.im_speso as "importoSpeso",
      coalesce(dsv.tl_valore_testuale ->> $[locale], dsv.tl_valore_testuale ->> 'it') AS "state",
      tv.nm_ente as "nomeEnte",
      v.cd_voucher as "codiceVoucher",
      tv.ts_utilizzo as "dataUtilizzoVoucher",
      tv.ts_contab as "dataContabilizzazione",
	    coalesce(tv.js_descrizione_servizio ->> $[locale], tv.js_descrizione_servizio ->> 'it') AS "servizioAcquistato", 
      v.cd_bando as "bando",
      v.ptx_cf_titolare as "cfBeneficiario",
      v.js_dati_voucher ->> 'txCFMinore' as "cfMinore",
      e.id_partita_iva_ente as "cfPivaEnte",               -- partita iva
      dpe.js_referente ->> 'txReferente' as "nominativoTitolareEnte", -- referente
      dpe.js_referente ->> 'txEmail' as "mailTitolareEnte", -- referente mail
      dpe.js_referente ->> 'txEmailSecondaria' as "mailSecondariaTitolareEnte", -- referente mail secondaria
      dpe.js_referente ->> 'txTelefono' as "telTitolareEnte", -- referente telefono
      dpe.js_referente ->> 'txTelefonoSecondario' as "telSecondarioTitolareEnte", -- referente telefono
      dpe.js_dati_bancari ->> 'cdIBAN' as "ibanEnte", -- referente telefono
      dpe.js_dati_bancari ->> 'txIntestatarioConto' as "intestatarioIbanEnte" -- referente telefono
      -- rsb.js_dati_richiesta ->> 'qtPersone' as "tipoServizioAcquistato"

    from 
      ${tabelle.transazione_voucher} tv
      inner join ${tabelle.voucher} v on tv.id_voucher = v.id_voucher
      left outer join ${tabelle.dominio} dsv on dsv.cd_dominio = tv.cd_stato_transazione and dsv.ty_dominio = 'STATO_TRANS_VOUCHER'
      inner join ${tabelle.richiesta_servizio_ente} rse on rse.id_richiesta_servizio_ente = tv.id_richiesta_servizio_ente
      inner join ${tabelle.servizio_erogato_ente} see on see.id_servizio_ente = rse.id_servizio_erogato_ente
      inner join ${tabelle.ente} e on e.id_ente = see.id_ente_erogatore
      inner join ${tabelle.datiPropriEnte} dpe ON dpe.id_ente_rif = see.id_ente_erogatore
      -- inner join ${tabelle.richiesta_servizio_base} rsb on rsb.id_richiesta_servizio_base = rse.id_richiesta_servizio_base
      -- wemi2.transazione_voucher tv
      -- left outer join wemi2.voucher v on tv.id_voucher = v.id_voucher
      -- left outer join wemi2.dominio dsv on dsv.cd_dominio = tv.cd_stato_transazione and dsv.ty_dominio = 'STATO_TRANS_VOUCHER'

    -- ORDER BY tv.ts_utilizzo DESC, v.cd_voucher;
    `;

export const selectVoucherById = `
  select
    v.id_voucher as "idVoucher",
    v.id_file_voucher,
    v.id_sostegno_economico,
    v.cd_voucher as "code",
    v.cd_bando as "bando",
    v.cd_domanda,
    cast(v.dt_inizio_val as timestamp) as "inizioValidita",
    cast(v.dt_fine_val as timestamp) as "fineValidita",
    v.tx_nome_titolare as "nomeTitolare",
    v.tx_cognome_titolare as "cognomeTitolare",
    v.ptx_cf_titolare as "cfIntestatario",
    v.js_dati_voucher ->> 'txCFMinore' as "cfMinore", -- CF minore
    -- v.js_dati_voucher,
    v.im_totale as "totalImport",
    dsv.tl_valore_testuale ->> 'it' state,    -- Stato dei voucher
    v.ts_caricamento as "dateLastModified",
    v.id_utente_caricamento,
    v.ts_attivazione,
    v.id_utente_attivazione,
    v.ts_annullo,
    v.id_utente_annullo,
    v.ts_controllo_utilizzo,
    v.tx_email_contatto as "emailContatto",
    v.tx_cell_contatto as "cellContatto",
    CASE  
      WHEN count(tv.*) > 0 then true
      ELSE false
    END	as "transazioniVoucher",
    sum(
      CASE tv.cd_stato_transazione 
      WHEN '1' then 0    
      WHEN '2' then 0     
      WHEN '3' then im_speso     
      ELSE 0 END) as "countedImport",  -- Importo contabilizzato
    v.im_totale - sum(
    CASE tv.cd_stato_transazione 
      WHEN '1' then im_speso     
      WHEN '2' then 0     
      WHEN '3' then im_speso     
    ELSE 0 END) as "remainingImport"           -- Importo residuo

  from ${tabelle.voucher} v
  left outer join ${tabelle.transazione_voucher} tv on tv.id_voucher = v.id_voucher
  left outer join ${tabelle.dominio} dsv on dsv.cd_dominio = v.cd_stato_voucher and dsv.ty_dominio = 'STATO_VOUCHER'
  WHERE v.id_voucher = $[idVoucher]
    group by 
    v.id_voucher,
    v.id_file_voucher,
    v.id_sostegno_economico,
    v.cd_voucher,
    v.cd_bando,
    v.cd_domanda,
    v.dt_inizio_val,
    v.dt_fine_val,
    v.tx_nome_titolare,
    v.tx_cognome_titolare,
    v.ptx_cf_titolare,
    v.js_dati_voucher ->> 'txCFMinore',
    -- v.js_dati_voucher,
    v.im_totale,
    dsv.tl_valore_testuale ->> 'it',    -- Stato dei voucher
    v.ts_caricamento,
    v.id_utente_caricamento,
    v.ts_attivazione,
    v.id_utente_attivazione,
    v.ts_annullo,
    v.id_utente_annullo,
    v.ts_controllo_utilizzo,
    v.dt_inizio_val

  --ORDER BY v.id_voucher ASC
  ;
`;

export const selectUserVoucher = `
SELECT DISTINCT on (vv.id_voucher) 
    vv.cd_voucher as "code",
    vv.id_voucher as "idVoucher",
    vv.js_dati_voucher ->> 'txCFMinore' as "cfMinore",
    vv.im_residuo as "remainingImport",
    vv.dt_fine_val as "endValidity"
FROM wemi2.richiesta_servizio_ente rse
INNER JOIN wemi2.r_sost_econ_serv_erog_ente vse on vse.id_servizio_ente = rse.id_servizio_erogato_ente
INNER JOIN wemi2.view_voucher vv on vv.id_sostegno_economico = vse.id_contenuto_sostegno_econ
WHERE vv.cd_stato_voucher = '1' 
    and current_date between coalesce(vv.dt_inizio_val, '0001-01-01') and coalesce(vv.dt_fine_val, '9999-12-31')
    and vv.im_residuo > 0
    and rse.id_richiesta_servizio_ente = $[idRichiesta]
    and vv.ptx_cf_titolare = $[codiceFiscale]
ORDER by vv.id_voucher;				
`;

export const selectTransactionById = `
  SELECT
      -- COUNT(*) OVER() AS "totalRows",
      tv.id_transazione_voucher as "idTransazioneVoucher",
      tv.id_voucher as "idVoucher",
      tv.id_richiesta_servizio_ente as "idRichiestaServizioEnte",
      tv.id_interno_transazione as "idInternoTransazione",
      tv.im_speso as "importoSpeso",
      coalesce(dsv.tl_valore_testuale ->> $[locale], dsv.tl_valore_testuale ->> 'it') AS "state",
      tv.nm_ente as "nomeEnte",
      v.cd_voucher as "codiceVoucher",
      v.tx_email_contatto as "emailContatto",
      v.tx_cell_contatto as "cellContatto",
      tv.ts_utilizzo as "dataUtilizzoVoucher",
      tv.ts_contab as "dataContabilizzazione",
      tv.ts_storno as "dataStorno",
	    coalesce(tv.js_descrizione_servizio ->> $[locale], tv.js_descrizione_servizio ->> 'it') AS "servizioAcquistato", 
      v.cd_bando as "bando",
      v.ptx_cf_titolare as "cfBeneficiario",
      v.js_dati_voucher ->> 'txCFMinore' as "cfMinore",
      e.id_partita_iva_ente as "cfPivaEnte",               -- partita iva
      dpe.js_referente ->> 'txReferente' as "nominativoTitolareEnte", -- referente
      cast(v.dt_inizio_val as timestamp) as "inizioValidita",
      cast(v.dt_fine_val as timestamp) as "fineValidita",
      v.im_totale as "importoVoucher"

    from 
      ${tabelle.transazione_voucher} tv
      inner join ${tabelle.voucher} v on tv.id_voucher = v.id_voucher
      left outer join ${tabelle.dominio} dsv on dsv.cd_dominio = tv.cd_stato_transazione and dsv.ty_dominio = 'STATO_TRANS_VOUCHER'
      inner join ${tabelle.richiesta_servizio_ente} rse on rse.id_richiesta_servizio_ente = tv.id_richiesta_servizio_ente
      inner join ${tabelle.servizio_erogato_ente} see on see.id_servizio_ente = rse.id_servizio_erogato_ente
      inner join ${tabelle.ente} e on e.id_ente = see.id_ente_erogatore
      inner join ${tabelle.datiPropriEnte} dpe ON dpe.id_ente_rif = see.id_ente_erogatore
      -- wemi2.transazione_voucher tv
      -- left outer join wemi2.voucher v on tv.id_voucher = v.id_voucher
      -- left outer join wemi2.dominio dsv on dsv.cd_dominio = tv.cd_stato_transazione and dsv.ty_dominio = 'STATO_TRANS_VOUCHER'

    WHERE tv.id_transazione_voucher = $[idTransaction]

    `;

export const selectMaxOrder = `
  SELECT MAX(nr_ordine_visualizzazione) as "order"
  FROM wemi2.contenuto c
  WHERE c.ty_contenuto = $[type];
`;

export const selectVoucherState = `
  SELECT
    cd_dominio AS "value",
    tl_valore_testuale,
    coalesce(tl_valore_testuale ->> $[locale], tl_valore_testuale ->> 'it') AS "textValue"
  FROM    ${tabelle.dominio}
  WHERE   ty_dominio = $[ty_dominio]
  order by pg_visualizzazione`;


export const selectSostegniEconomici = `
select tl_testo_1 ->> 'it' AS "textValue", c.id_contenuto as "value"
from wemi2.contenuto c  inner join wemi2.contenuto_stt cstt on cstt.id_contenuto = c.id_contenuto 
where c.ty_contenuto = $[ty_contenuto.id:value] -- Sostegni economici 
	and cstt.cd_stato_contenuto = $[cd_stato_contenuto.id:value]  -- Attivi/Pubblicati 
	and cstt.ts_variazione_stato = (select MAX(ts_variazione_stato) from wemi2.contenuto_stt where id_contenuto =  cstt.id_contenuto) 
order by c.nr_ordine_visualizzazione;`;

export const selectFileVoucherSeq = 'select nextval(\'seq_file_voucher\')';

export const selectTipoDescrVoucher = 'select 1 as esiste from wemi2.dominio where ty_dominio = \'TIPO_DESCR_VOUCHER\' and cd_dominio = $[cd_dominio] order by pg_visualizzazione;';
export const updateTimestamp = `
  UPDATE wemi2.voucher 
    SET ts_controllo_utilizzo = localtimestamp
    WHERE id_voucher IN ($[idVouchers:csv])
    returning ts_controllo_utilizzo as "lastUseTimeStamp";
        `;

export const insertVoucherTransaction =   `
  INSERT INTO wemi2.transazione_voucher (
    id_transazione_voucher,
    id_voucher,
    id_richiesta_servizio_ente,
    id_interno_transazione,
    im_speso,
    ts_utilizzo,
    ts_storno,
    id_utente_storno,
    ts_contab,
    id_utente_contab,
    cd_stato_transazione,
    nm_ente,
    js_descrizione_servizio
  )
  VALUES (
    nextval('wemi2.seq_transazione_voucher'),
    $[idVoucher],
    $[idRichiesta],
    $[idInternoTrans],
    $[imSpeso],
    localtimestamp,
    null,
    null,
    null,
    null,
    '1',
    $[nmEnte],
    $[jsonDescrServizio]
  )
      `;      

export const selectTimeStamps =`
  SELECT ts_controllo_utilizzo
  FROM wemi2.voucher
  WHERE id_voucher IN ($[idVouchers:csv])
`;   

export const divertVoucherTransactions = `
UPDATE wemi2.transazione_voucher
SET cd_stato_transazione = '4',
    ts_storno = localtimestamp,
    id_utente_storno = $[idUtente]
WHERE id_interno_transazione = $[idInternoTrans]
`;   

export const selectVoucherByIdRichiesta =`
SELECT sum(im_residuo) as "importoMax" FROM (
  SELECT im_residuo
  FROM wemi2.richiesta_servizio_ente rse
  INNER JOIN wemi2.richiesta_servizio_base rsb ON rsb.id_richiesta_servizio_base= rse.id_richiesta_servizio_base
  INNER JOIN wemi2.r_sost_econ_serv_erog_ente vse on vse.id_servizio_ente = rse.id_servizio_erogato_ente
  INNER JOIN wemi2.view_voucher vv on vv.id_sostegno_economico = vse.id_contenuto_sostegno_econ
  INNER JOIN wemi2.utente u on u.id_utente = rsb.id_utente_richiedente
  WHERE rse.id_richiesta_servizio_ente = $[idRichiesta]
  AND vv.cd_stato_voucher = '1' 
  AND current_date between coalesce(vv.dt_inizio_val, '0001-01-01') 
  AND coalesce(vv.dt_fine_val, '9999-12-31')
  AND vv.im_residuo > 0
  AND vv.ptx_cf_titolare = u.ptx_codice_fiscale
  ORDER BY 1 desc
  LIMIT $[qtPersone]
  ) as "listaVoucher"`;
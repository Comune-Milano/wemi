import { attributo as costantiAttributo, attributo } from 'constants/db/attributo';
import { tyDominioTCB } from 'constants/db/ty_dominio_tcb';
import { cdDominioTcb } from 'constants/db/cd_dominio_tcb';
import { ID_SERVIZIO_TATA } from 'constants/db/servizio_riferimento_tcb';
import { RICHIESTA_BASE_STORICO_ESP_LAV } from 'resolvers/richiestaserviziobase/constants/StatoRichiestaBase';


export const aggiornaStepsLavoratoreTCBQuery = `
  UPDATE wemi2.utente_offerta_lav
  SET 
    cd_stato_pag_anagrafica = $[cd_stato_pag_anagrafica],
    cd_stato_pag_stato_occup = $[cd_stato_pag_stato_occup],
    cd_stato_pag_istruzione = $[cd_stato_pag_istruzione],
    cd_stato_pag_esp_lav = $[cd_stato_pag_esp_lav],
    cd_stato_pag_dati_pers = $[cd_stato_pag_dati_pers],
    cd_stato_pag_comp_tata = $[cd_stato_pag_comp_tata],
    cd_stato_pag_disp_tata = $[cd_stato_pag_disp_tata],
    cd_stato_pag_comp_colf = $[cd_stato_pag_comp_colf],
    cd_stato_pag_disp_colf = $[cd_stato_pag_disp_colf],
    cd_stato_pag_comp_badante = $[cd_stato_pag_comp_badante],
    cd_stato_pag_disp_badante = $[cd_stato_pag_disp_badante]
  WHERE id_utente_lav = $[idUtenteLav]
  RETURNING 
    cd_stato_pag_anagrafica,
    cd_stato_pag_stato_occup,
    cd_stato_pag_istruzione,
    cd_stato_pag_esp_lav,
    cd_stato_pag_dati_pers,
    cd_stato_pag_comp_tata,
    cd_stato_pag_disp_tata,
    cd_stato_pag_comp_colf,
    cd_stato_pag_disp_colf,
    cd_stato_pag_comp_badante,
    cd_stato_pag_disp_badante,
    fg_candidatura_tata,
    fg_candidatura_colf,
    fg_candidatura_badante
`;

export const estraiStepsLavoratoreTCBQuery = `
  SELECT 
    cd_stato_pag_anagrafica,
    cd_stato_pag_stato_occup,
    cd_stato_pag_istruzione,
    cd_stato_pag_esp_lav,
    cd_stato_pag_dati_pers,
    cd_stato_pag_comp_tata,
    cd_stato_pag_disp_tata,
    cd_stato_pag_comp_colf,
    cd_stato_pag_disp_colf,
    cd_stato_pag_comp_badante,
    cd_stato_pag_disp_badante,
    cd_stato_pag_esp_badante,
    cd_stato_pag_candidatura,
    fg_candidatura_tata,
    fg_candidatura_colf,
    fg_candidatura_badante
  FROM wemi2.utente_offerta_lav
  WHERE id_utente_lav = $[idUtenteLav]
`;

export const checkUtenteLavQuery = `
  SELECT 
    id_utente_lav
  FROM wemi2.utente_offerta_lav
  WHERE id_utente_lav = $[idUtenteLav]
`;

export const checkCandidaturaInoltrata = `
  SELECT 
    id_utente_lav
  FROM wemi2.utente_offerta_lav
  WHERE id_utente_lav = $[idUtenteLav]
  AND cd_ultimo_stato_offerta = 0
`;

export const initializeUtenteLavMutation = `
  INSERT INTO wemi2.utente_offerta_lav (
    id_utente_lav,
    cd_ultimo_stato_offerta,
    cd_stato_pag_anagrafica,
    id_ult_operatore,
    ts_ultima_modifica,
    ts_creazione
  )
  VALUES (
    $[idUtenteLav],
    0,
    3,
    $[idUtenteLav],
    localtimestamp,
    localtimestamp
  );

  INSERT INTO wemi2.utente_offerta_lav_stt(
    id_utente_lav,
    ts_variazione_stato,
    cd_stato_dati_lav,
    id_utente
  )
  VALUES (
    $[idUtenteLav],
    localtimestamp,
    0,
    $[idUtenteLav]
  );

  UPDATE wemi2.utente
  SET fg_lavoratore=1
  WHERE id_utente=$[idUtenteLav]
  RETURNING *;
`;
export const initializeUtenteLavImpMutation = `
  INSERT INTO wemi2.utente_offerta_lav (
    id_utente_lav,
    cd_ultimo_stato_offerta,
    cd_stato_pag_anagrafica,
    id_ult_operatore,
    ts_ultima_modifica,
    ts_creazione,
    js_impersonificazione
  )
  VALUES (
    $[idUtente],
    0,
    3,
    $[idUtente],
    localtimestamp,
    localtimestamp,
    $[jsImpersonificazione]
  );

  INSERT INTO wemi2.utente_offerta_lav_stt(
    id_utente_lav,
    ts_variazione_stato,
    cd_stato_dati_lav,
    id_utente
  )
  VALUES (
    $[idUtente],
    localtimestamp,
    0,
    $[idUtente]
  );

  UPDATE wemi2.utente
  SET fg_lavoratore=1
  WHERE id_utente=$[idUtente]
  RETURNING *;
`;

export const estraiDatiAnagraficiFormFieldValuesQuery = `
  SELECT ty_dominio_tcb as "tyDominioTcb",
    cd_dominio_tcb as "cdDominioTcb",
    pg_visualizzazione as "pgVisualizzazione",
    tl_valore_testuale as "tlValoreTestuale",
    nr_valore_min_rif as "minRif",
    nr_valore_max_rif as "maxRif"
  FROM  wemi2.dominio_tcb
  WHERE ty_dominio_tcb = 25 OR ty_dominio_tcb = 9
  ORDER BY pg_visualizzazione
`;
export const estraiUtente = `
  SELECT cd_profilo_utente, ty_operatore_ente,CAST( fg_lavoratore AS int)
  FROM wemi2.utente
  WHERE id_utente= $[idUtente];
`;

export const estraiDati002Query1 = `
  SELECT 
    wemi2.utente_offerta_lav.dt_disponibile_dal
  FROM wemi2.utente_offerta_lav
  WHERE id_utente_lav= $[idUtente];
 
`;
export const estraiDati002Query2 = `
  SELECT 
    wemi2.val_attributo_offerta_ut.cd_val_attributo
  FROM wemi2.val_attributo_offerta_ut
  WHERE id_utente_offerta_lav= $[idUtente] and cd_attributo = $[cdAttributo]
`;

export const deleteTata = `
  DELETE 
  FROM wemi2.val_attributo_offerta_ut
  WHERE id_utente_offerta_lav=$[idUtente] and cd_attributo=$[cdAttributoTata];
`;
 /**
  * The function to map the data to insert BabySitter
  * @param {object} args the args to map
  * @param {object} context the context object
  * @returns {string} the query string
  */
export const insertTata = (args, context) => {
  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_utente_offerta_lav',
      'cd_attributo',
      'cd_val_attributo',
      'tx_val',
      { name: 'ts_modifica', mod: '^' },
      { name: 'ts_creazione', mod: '^' },
    ],
    { table: context.tabelle.val_attributo_offerta_ut }
  );
  const rows = args.input.tata.map(element => {
    let txVal = null;
    if (element === cdDominioTcb.ALTRO) {
      txVal = args.input.altroTata;
    }
    if (element === cdDominioTcb.LAUREA) {
      txVal = args.input.nomeLaurea;
    }

    return {
      id_utente_offerta_lav: args.input.idUtente,
      cd_attributo: args.input.cdAttributoTata,
      cd_val_attributo: element,
      tx_val: txVal,
      ts_modifica: 'localtimestamp',
      ts_creazione: 'localtimestamp',
    };
  });


  return context.queryBuilder.insert(rows, columns);
};

export const deleteBadante = `
  DELETE FROM wemi2.val_attributo_offerta_ut
  WHERE id_utente_offerta_lav= $[idUtente] and cd_attributo=$[cdAttributoBadante];
`;
 /**
  * The function to map the data to insert Badante
  * @param {object} args the args to map
  * @param {object} context the context object
  * @returns {string} the query string
  */
export const insertBadante = (args, context) => {
  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_utente_offerta_lav',
      'cd_attributo',
      'cd_val_attributo',
      'tx_val',
      { name: 'ts_modifica', mod: '^' },
      { name: 'ts_creazione', mod: '^' },
    ],
    { table: context.tabelle.val_attributo_offerta_ut }
  );
  const rows = args.input.badante.map(element => ({
    id_utente_offerta_lav: args.input.idUtente,
    cd_attributo: args.input.cdAttributoBadante,
    cd_val_attributo: element,
    tx_val: element === cdDominioTcb.ALTRO ? args.input.altroBadante : null,
    ts_modifica: 'localtimestamp',
    ts_creazione: 'localtimestamp',
  }));

  return context.queryBuilder.insert(rows, columns);
};

export const insertBadante2 = `
  INSERT INTO wemi2.val_attributo_offerta_ut(
    id_utente_offerta_lav,
    cd_attributo,
    cd_val_attributo,
    tx_val,
    fg_val,
    ts_modifica,
    ts_creazione
  )
  VALUES (
    $[idUtente],
    $[cdAttributoBadanteInteresse],
    1,
    $[nomeCorsoDaFrequentare],
    $[interesseAfrequentareCorsi],
    localtimestamp,
    localtimestamp
  );
`;

export const selectItaliano = `
  SELECT *
  FROM wemi2.val_attributo_ut
  WHERE id_utente= $[idUtente] and cd_attributo= $[cdAttributoConoscenzaItaliano]  ;
`;

export const updateItaliano = `
  UPDATE wemi2.val_attributo_ut
  SET nr_val= $[livelloConoscenzaItaliano], ts_modifica= localtimestamp
  WHERE id_utente= $[idUtente] and cd_attributo= $[cdAttributoConoscenzaItaliano]  ;
`;

export const insertItaliano = `
  INSERT INTO wemi2.val_attributo_ut(
  id_utente, cd_attributo, cd_val_attributo,nr_val , ts_modifica, ts_creazione)
  VALUES ($[idUtente], $[cdAttributoConoscenzaItaliano] , 1, $[livelloConoscenzaItaliano], localtimestamp, localtimestamp);
`;

export const insertItaliano2 = `
  INSERT INTO wemi2.val_attributo_ut(
  id_utente, cd_attributo, cd_val_attributo, fg_val, ts_modifica, ts_creazione)
  VALUES ($[idUtente], $[cdAttributoCorsiItaliano], 1, $[corsiItaliano], localtimestamp, localtimestamp);
`;

export const inserisciLingueEstere = `
  INSERT INTO wemi2.val_attributo_ut(
  id_utente, cd_attributo, cd_val_attributo, nr_val, tx_nota, ts_modifica, ts_creazione)
  VALUES ($[idUtente], $[cdAttributo] , $[cdValAttributo] ,  $[livelloConoscenzaLingua], $[altro], localtimestamp, localtimestamp);
`;

export const deleteLingueEstere = `
  DELETE FROM wemi2.val_attributo_ut
  WHERE id_utente=$[idUtente] and 
    cd_attributo=$[cdAttributo] and 
    cd_val_attributo=$[cdValAttributo];
`;

export const deleteItaliano2 = `
  DELETE FROM wemi2.val_attributo_ut
  WHERE id_utente=$[idUtente] and cd_attributo=$[cdAttributoCorsiItaliano];
`;

export const deleteBadante2 = `
  DELETE FROM wemi2.val_attributo_offerta_ut
  WHERE id_utente_offerta_lav=$[idUtente] and cd_attributo=$[cdAttributoBadanteInteresse];
`;

export const estrai003 = `
  SELECT cd_val_attributo, cd_attributo, tx_val, nr_val, fg_val
  FROM wemi2.val_attributo_offerta_ut
  WHERE id_utente_offerta_lav=$[idUtente] and (cd_attributo=$[cdAttributoTata] or cd_attributo=$[cdAttributoBadante] or  cd_attributo=$[cdAttributoLingueEstere] or cd_attributo=$[cdAttributoBadanteInteresse] )
`;
export const estrai003n2 = `
  SELECT cd_val_attributo, cd_attributo, tx_val, nr_val,fg_val, tx_nota
  FROM wemi2.val_attributo_ut
  WHERE id_utente=$[idUtente] and (cd_attributo=$[cdAttributoConoscenzaItaliano] or cd_attributo=$[cdAttributoLingueEstere] or cd_attributo=$[cdAttributoCorsiItaliano]  )
`;

export const insertFile = `
  INSERT INTO wemi2.allegato_offerta_lav(
    id_allegato,
    id_utente_lav,
    nm_nome_allegato_off,
    oj_allegato_off,
    ts_creazione
  )
  VALUES (
    nextval('wemi2.seq_allegato_offerta_lav'),
    $[idUtente],
    'Foto',
    $[file],
    localtimestamp
  ) RETURNING *;

`;

export const insertValAttributoOffertaUt = `
INSERT INTO wemi2.val_attributo_offerta_ut(
  id_utente_offerta_lav,
  cd_attributo,
  cd_val_attributo,
  fg_val,
  ts_creazione,
  ts_modifica 
)
VALUES (
  $[idUtente],
  $[cdAttributoFoto],
  currval('wemi2.seq_allegato_offerta_lav'),
  'S',
  localtimestamp,
  localtimestamp
);
`;

export const updateFile = `
  UPDATE wemi2.allegato_offerta_lav
  SET oj_allegato_off = $[file]
  WHERE id_allegato= $[idAllegato]
  AND id_utente_lav = $[idUtente]
  RETURNING *;
`;

export const deleteFile = `
  DELETE FROM wemi2.allegato_offerta_lav
  WHERE id_allegato= $[idAllegato]
  AND id_utente_lav = $[idUtente];

  DELETE FROM wemi2.val_attributo_offerta_ut
  WHERE id_utente_offerta_lav = $[idUtente]
  AND cd_attributo = $[cdAttributoFoto]
  AND cd_val_attributo = $[idAllegato];
`;

export const insertDatiGenericiAllergie = `
  INSERT INTO wemi2.val_attributo_offerta_ut(
    id_utente_offerta_lav,
    cd_attributo,
    cd_val_attributo,
    fg_val,
    tx_val,
    ts_modifica,
    ts_creazione
  )
  VALUES (
    $[idUtente],
    $[cdAttributo],
    1,
    $[fgVal],
    $[txVal],
    localtimestamp,
    localtimestamp
  );
`;
export const insertAltezza = `
  INSERT INTO wemi2.val_attributo_offerta_ut(
    id_utente_offerta_lav,
    cd_attributo,
    cd_val_attributo,
    ts_modifica,
    ts_creazione
  )
  VALUES (
    $[idUtente],
    $[cdAttributoAltezza],
    $[altezza],
    localtimestamp,
    localtimestamp
  );
`;
export const insertCorporatura = `
  INSERT INTO wemi2.val_attributo_offerta_ut(
    id_utente_offerta_lav,
    cd_attributo,
    cd_val_attributo,
    ts_modifica,
    ts_creazione
  )
  VALUES (
    $[idUtente],
    $[cdAttributoCorporatura],
    $[corporatura],
    localtimestamp,
    localtimestamp
  );
`;


export const updateDatiGenericiAllergie = `
  UPDATE wemi2.val_attributo_offerta_ut
  SET fg_val=$[fgVal], tx_val=$[txVal], ts_modifica= localtimestamp
  WHERE id_utente_offerta_lav=$[idUtente] and  cd_attributo=$[cdAttributo];
`;

export const selectDatiGenericiAllergie = `
  SELECT *
  FROM wemi2.val_attributo_offerta_ut
  WHERE id_utente_offerta_lav=$[idUtente] and cd_attributo=$[cdAttributo];
`;
 /**
  * The function to map the data to insert Altezza
  * @param {object} args the args to map
  * @param {object} cdAttributo the attribute code
  * @param {object} arr the array object
  * @param {object} tx the transaction object
  * @param {object} context the context object
  * @returns {string} the query string
  */
export const insertAltezzaCorporaturaInteressiCarattere = (args, cdAttributo, arr, tx, context) => {
  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_utente_offerta_lav',
      'cd_attributo',
      'cd_val_attributo',
      'tx_val',
      { name: 'ts_modifica', mod: '^' },
      { name: 'ts_creazione', mod: '^' },
    ],
    { table: context.tabelle.val_attributo_offerta_ut }
  );
  const rows = arr.map(element => ({
    id_utente_offerta_lav: args.input.idUtente,
    cd_attributo: cdAttributo,
    cd_val_attributo: element,
    tx_val: element === cdDominioTcb.ALTRO && tx ? tx : null,
    ts_modifica: 'localtimestamp',
    ts_creazione: 'localtimestamp',
  }));

  return context.queryBuilder.insert(rows, columns);
};

export const deleteAltezzaCorporaturaInteressiCarattereCapacita = `
  DELETE 
  FROM wemi2.val_attributo_offerta_ut
  WHERE id_utente_offerta_lav=$[idUtente] and cd_attributo=$[cdAttributo];
`;

export const insertCapacita = `
  INSERT INTO wemi2.val_attributo_offerta_ut(
    id_utente_offerta_lav, cd_attributo, cd_val_attributo, nr_val, ts_modifica, ts_creazione
  )
  VALUES ($[idUtente], $[cdAttributo], 1, $[nr], localtimestamp, localtimestamp);
`;

export const query1Estrai005 = `
  SELECT cd_val_attributo, cd_attributo, tx_val, nr_val, fg_val
  FROM wemi2.val_attributo_offerta_ut
  WHERE id_utente_offerta_lav=$[idUtente] and (
    cd_attributo=$[cdAttributoAuto] or 
    cd_attributo=$[cdAttributoAutomunito] or 
    cd_attributo=$[cdAttributoLavoro] or 
    cd_attributo=$[cdAttributoFumatore] or cd_attributo=$[cdAttributoGatti] or 
    cd_attributo=$[cdAttributoCani] or 
    cd_attributo=$[cdAttributoAlimentari] or 
    cd_attributo=$[cdAttributoAltriAnimali] or 
    cd_attributo=$[cdAttributoAltro] or 
    cd_attributo=$[cdAttributoAltezza] or 
    cd_attributo=$[cdAttributoCorporatura] or 
    cd_attributo=$[cdAttributoInteressi] or 
    cd_attributo=$[cdAttributoCarattere] or 
    cd_attributo=$[cdAttributoComunicative] or 
    cd_attributo=$[cdAttributoAdattamento] or 
    cd_attributo=$[cdAttributoTempo]
  )
`;

export const estrai0016 = `
SELECT  cd_attributo, cd_val_attributo, tx_val 
FROM wemi2.val_attributo_offerta_servizio 
WHERE id_utente_lav= $[idUtente] and id_servizio_riferimento= $[servizioRiferimento] and (cd_attributo= $[cdAttributoPatologieGeneriche] or cd_attributo= $[cdAttributoPatologieAnziani] )
`;

export const delete0016 = `
DELETE 
FROM wemi2.val_attributo_offerta_servizio 
WHERE id_utente_lav= $[idUtente] and id_servizio_riferimento= $[servizioRiferimento] and cd_attributo IN ($[cdAttributo:csv])
`;
 /**
  * The function to map the data to insert data for 0016
  * @param {object} args the args to map
  * @param {object} context the context object
  * @param {boolean} generale the bool to check if it's specific or not
  * @returns {string} the query string
  */
export const insert0016 = (args, context, generale) => {
  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_utente_lav',
      'id_servizio_riferimento',
      'cd_attributo',
      'cd_val_attributo',
      'tx_val',
      { name: 'ts_modifica', mod: '^' },
      { name: 'ts_creazione', mod: '^' },
    ],
    { table: context.tabelle.val_attributo_offerta_servizio }
  );
  const arr = generale ? args.input.patologieGeneriche : args.input.patologieAnziani;

  const rows = arr.map(element => ({
    id_utente_lav: args.input.idUtente,
    id_servizio_riferimento: args.input.servizioRiferimento,
    cd_attributo: generale ? args.input.cdAttributoPatologieGeneriche : args.input.cdAttributoPatologieAnziani,
    cd_val_attributo: element,
    tx_val: element === cdDominioTcb.ALTRO && !generale ? args.input.altroPatologie : null,
    ts_modifica: 'localtimestamp',
    ts_creazione: 'localtimestamp',
  }));

  return context.queryBuilder.insert(rows, columns);
};

export const verificaUtenteOffertaServizio = `
  SELECT id_utente_lav FROM wemi2.utente_offerta_servizio
  WHERE 
    id_utente_lav = $[idUtenteLav]
    AND id_servizio_riferimento = $[idServizioRif]
`;

export const inizializzaUtenteOffertaServizio = `
  INSERT INTO wemi2.utente_offerta_servizio (
    id_utente_lav,
    id_servizio_riferimento,
    ts_creazione,
    ts_ultima_modifica
  )
  VALUES (
    $[idUtenteLav],
    $[idServizioRif],
    LOCALTIMESTAMP,
    LOCALTIMESTAMP
  );
`;

export const verificaAttributiPresentiOffertaServizio = `
  SELECT DISTINCT cd_attributo
  FROM wemi2.val_attributo_offerta_servizio
  WHERE 
  id_utente_lav = $[idUtenteLav]
  AND id_servizio_riferimento = $[idServizioRif]
  `;

export const resettaAttributiAssociatiOffertaServizio = `
  DELETE FROM wemi2.val_attributo_rel_off_serv_lav
  where  id_utente_lav = $[idUtenteLav]
  AND id_servizio_riferimento = $[idServizioRif]             
  AND cd_attributo_1 IN ($[attributiLista:csv]);

  DELETE FROM wemi2.val_attributo_offerta_servizio
  where id_utente_lav = $[idUtenteLav]
  AND id_servizio_riferimento = $[idServizioRif]
  AND cd_attributo IN ($[attributiLista:csv]);
`;

export const resettaAttributiListaOffertaServizio = `
  DELETE FROM wemi2.val_attributo_offerta_servizio
  where id_utente_lav = $[idUtenteLav]
  AND id_servizio_riferimento = $[idServizioRif]
  AND cd_attributo IN ($[attributiLista:csv]);
`;
 /**
  * The function to map the data to update the attributs for service offer
  * @param {object} attributoSingolo the attribute to map
  * @param {object} context the context object
  * @returns {string} the query string
  */
export const aggiornaAttributiOffertaServizio = (attributoSingolo, context) => {

  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_utente_lav',
      'id_servizio_riferimento',
      'cd_attributo',
      'tx_val',
      'nr_val',
      'cd_val_attributo',
      'dt_val',
      'fg_val',
      'tx_nota',
      'tx_nota_op',
      { name: 'ts_modifica', mod: '^' },
      { name: 'ts_creazione', mod: '^' },
    ],
    { table: 'val_attributo_offerta_servizio' }
  );

  // Dynamic conditions must be escaped/formatted properly:
  const condition = context.formatter.format(`
  WHERE id_utente_lav = $[id_utente_lav]
  AND id_servizio_riferimento = $[id_servizio_riferimento]
  AND cd_attributo = $[cd_attributo]
  `, attributoSingolo);

  return context.queryBuilder.update(attributoSingolo, columns) + condition;
};

export const eliminaAttributiOffertaServizio = `
  DELETE FROM wemi2.val_attributo_offerta_servizio
  WHERE 
    id_utente_lav = $[idUtenteLav] 
    AND id_servizio_riferimento = $[idServizioRif]
    AND cd_attributo IN ($[attributiDaEliminare:csv]);
`;
/**
 * The function to map the data to update the attributes for service offer
 * @param {object} rows the attributes to map
 * @param {object} context the context object
 * @returns {string} the query string
 */
export const inserisciAttributiOffertaServizio = (rows, context) => {

  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_utente_lav',
      'id_servizio_riferimento',
      'cd_attributo',
      'tx_val',
      'nr_val',
      'cd_val_attributo',
      'dt_val',
      'fg_val',
      'tx_nota',
      'tx_nota_op',
      { name: 'ts_modifica', mod: '^' },
      { name: 'ts_creazione', mod: '^' },
    ],
    { table: 'val_attributo_offerta_servizio' }
  );

  return context.queryBuilder.insert(rows, columns);
};
/**
 * The function to map the data to update the attributes list for service offer
 * @param {object} rows the attributes to map
 * @param {object} context the context object
 * @returns {string} the query string
 */
export const inserisciAttributiListaOffertaServizio = (rows, context) => {

  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_utente_lav',
      'id_servizio_riferimento',
      'cd_attributo',
      'tx_val',
      'nr_val',
      'cd_val_attributo',
      'dt_val',
      'fg_val',
      'tx_nota',
      'tx_nota_op',
      { name: 'ts_modifica', mod: '^' },
      { name: 'ts_creazione', mod: '^' },
    ],
    { table: 'val_attributo_offerta_servizio' }
  );

  return context.queryBuilder.insert(rows, columns);
};
/**
 * The function to map the data to update the attributes list for val_attributo_rel_off_serv_lav
 * @param {object} rows the attributes to map
 * @param {object} context the context object
 * @returns {string} the query string
 */
export const inserisciAttributiAssociatiOffertaServizio = (rows, context) => {

  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_utente_lav',
      'id_servizio_riferimento',
      'cd_attributo_1',
      'cd_val_attributo_1',
      'cd_attributo_2',
      'cd_val_attributo_2',
    ],
    { table: 'val_attributo_rel_off_serv_lav' }
  );

  return context.queryBuilder.insert(rows, columns);
};

export const estraiDatiCompetenzeTataQuery = ` 
SELECT
  fg_candidatura_tata as value
FROM
  wemi2.utente_offerta_lav
WHERE
  id_utente_lav = $[idUtenteLav];

SELECT 
  valAttrOff.cd_attributo,
  valAttrOff.cd_val_attributo,
  valAttrOff.tx_val,
  valAttrOff.fg_val,
  relOff.cd_val_attributo_2
  FROM wemi2.val_attributo_offerta_servizio valAttrOff
  LEFT JOIN wemi2.val_attributo_rel_off_serv_lav relOff 
    ON (relOff.cd_attributo_1 = valAttrOff.cd_attributo
    AND relOff.cd_val_attributo_1 = valAttrOff.cd_val_attributo and relOff.id_utente_lav = $[idUtenteLav])
  WHERE valAttrOff.id_utente_lav = $[idUtenteLav]
  AND valAttrOff.id_servizio_riferimento = 999997
  AND cd_attributo IN (117, 127, 158);
`;

export const estraiDatiCompetenzeColfQuery = `
SELECT
  fg_candidatura_colf as value
FROM
  wemi2.utente_offerta_lav
WHERE
  id_utente_lav = $[idUtenteLav];

SELECT 
  valAttrOff.cd_attributo,
  valAttrOff.cd_val_attributo,
  valAttrOff.tx_val
  FROM wemi2.val_attributo_offerta_servizio valAttrOff
  WHERE valAttrOff.id_utente_lav = $[idUtenteLav]
  AND valAttrOff.id_servizio_riferimento = 999998
  AND cd_attributo = 158;
`;

export const estraiDatiCompetenzeBadanteQuery = `
SELECT
  fg_candidatura_badante as value
FROM
  wemi2.utente_offerta_lav
WHERE
  id_utente_lav = $[idUtenteLav];

SELECT 
  cd_attributo,
  cd_val_attributo,
  tx_val,
  fg_val
  FROM wemi2.val_attributo_offerta_servizio
  WHERE id_utente_lav = $[idUtenteLav]
  AND id_servizio_riferimento = 999999
  AND cd_attributo IN (127, 157, 158);
`;

export const query2Estrai005 = `
  SELECT vaou.cd_attributo, aol.id_allegato, convert_from(aol.oj_allegato_off, 'UTF-8') AS "oj_allegato_off" 
  FROM wemi2.val_attributo_offerta_ut  vaou
  INNER JOIN wemi2.allegato_offerta_lav aol on vaou.cd_val_attributo = aol.id_allegato
  WHERE vaou.id_utente_offerta_lav = $[idUtente]
  AND vaou.cd_attributo = $[cdAttributoFoto];
`;

export const inizializzaRicBaseEsperienzeLavoratoreMutation = `
  INSERT INTO wemi2.richiesta_servizio_base (
    id_richiesta_servizio_base, 
    id_utente_richiedente,
    dt_periodo_richiesto_dal,
    dt_periodo_richiesto_al,
    ts_creazione
    )
    VALUES (
      setval('wemi2.seq_richiesta_servizio_base', 
             (SELECT MAX(id_richiesta_servizio_base)+1 FROM wemi2.richiesta_servizio_base)
      ),
      $[idUtenteLav],
      $[inizioPeriodo],
      $[finePeriodo],
      localtimestamp
    )
  RETURNING id_richiesta_servizio_base;
`;

export const inizializzaRicBaseEsperienzeLavoratoreAltroMutation = `
  INSERT INTO wemi2.richiesta_servizio_base (
    id_richiesta_servizio_base, 
    id_utente_richiedente,
    dt_periodo_richiesto_dal,
    dt_periodo_richiesto_al,
    js_dati_richiesta,
    ts_creazione
    )
    VALUES (
      setval('wemi2.seq_richiesta_servizio_base', 
             (SELECT MAX(id_richiesta_servizio_base)+1 FROM wemi2.richiesta_servizio_base)
      ),
      $[idUtenteLav],
      $[inizioPeriodo],
      $[finePeriodo],
      $[jsDatiRichiesta:json],
      localtimestamp
    )
  RETURNING id_richiesta_servizio_base;
`;

export const inizializzaRicBaseSttEsperienzeLavoratoreMutation = `
  INSERT INTO wemi2.richiesta_servizio_base_stt(
    id_richiesta_servizio,
    ts_variazione_stato,
    cd_stato_richiesta_servizio,
    id_utente
  )
  VALUES(
    $[idRicBase],
    localtimestamp,
    9,
    $[idUtenteLav]
  );
`;

export const inizializzaRicEnteEsperienzeLavoratoreMutation = `
  INSERT INTO wemi2.richiesta_servizio_ente(
    id_richiesta_servizio_ente,
    id_richiesta_servizio_base,
    id_servizio_erogato_ente,
    tx_note_ente,
    ts_creazione
  )
  VALUES(
    setval('wemi2.seq_richiesta_servizio_ente', 
    (SELECT MAX(id_richiesta_servizio_ente)+1 FROM wemi2.richiesta_servizio_ente)),
    $[idRicBase],
    $[idServizio],
    $[descrizioneEsp],
    localtimestamp
  )
  RETURNING id_richiesta_servizio_ente;
`;

export const inizializzaRecRicEnteEsperienzeLavoratoreMutation = `
  INSERT INTO wemi2.recensione_servizio_ente(
    id_rich_serv_rec,
    ts_creazione
  )
  VALUES(
    $[idRicEnte],
    localtimestamp
  );
`;

export const inizializzaRecRicEnteSttEsperienzeLavoratoreMutation = `
  INSERT INTO wemi2.recensione_servizio_ente_stt (
    id_rich_serv_rec,
    ts_variazione_stato,
    cd_stato_recensione,
    id_utente
  )
  VALUES(
    $[idRicEnte],
    localtimestamp,
    '1',
    $[idUtente]
  );
`;

export const inizializzaRicEnteSttEsperienzeLavoratoreMutation = `
  INSERT INTO wemi2.richiesta_servizio_ente_stt(
    id_richiesta_servizio_ente,
    ts_variazione_stato,
    cd_stato_ric_serv_ente,
    cd_stato_chat,
    id_utente
  )
  VALUES(
    $[idRicEnte],
    localtimestamp,
    9,
    0,
    $[idUtenteLav]
  );
`;

export const inizializzaRicTcbEsperienzeLavoratoreMutation = `
  INSERT INTO wemi2.richiesta_servizio_tcb(
    id_richiesta_servizio_tcb,
    ts_ult_modifica,
    ts_creazione
  )
  VALUES(
    $[idRicEnte],
    localtimestamp,
    localtimestamp
  )
  RETURNING id_richiesta_servizio_tcb;
`;

export const estraiMansioniServizioTcbQuery = `
  SELECT cd_dominio_tcb,
  ty_dominio_tcb
  FROM dominio_tcb
  WHERE ty_dominio_tcb IN ($[arrayDominiMansioni:csv])
`;

export const rimuoviAttributiMansioniServizioMutation = `
    DELETE FROM val_attributo_domanda
    WHERE id_richiesta_servizio_tcb = $[idRicTcb]
    AND cd_attributo IN ($[oldCdAttMansArray:csv])
`;

export const inizializzaRMatchRicLavEsperienzeLavoratoreMutation = `
  INSERT INTO wemi2.r_match_ric_lav(
    id_richiesta,
    id_lavoratore,
    id_ult_operatore,
    cd_stato_associazione,
    tx_nota,
    ts_ultima_modifica,
    ts_creazione
  )
  VALUES(
    $[idRicTcb],
    $[idUtenteLav],
    $[idUtenteLav],
    1,
    'associazione per storico esperienze lavoratore', 
    localtimestamp,
    localtimestamp
  );
`;

export const verificaCambioServizioRichiestaQuery = `
    SELECT DISTINCT cd_attributo 
    FROM val_attributo_domanda
    WHERE id_richiesta_servizio_tcb = $[idRicTcb]
    AND cd_attributo IN (60, 61, 62);
`;

export const aggiornaServizioEsperienzaMutation = `
    UPDATE richiesta_servizio_ente
    SET id_servizio_erogato_ente = $[idServizio]
    WHERE id_richiesta_servizio_ente = $[idRicTcb]
`;

export const aggiornaPeriodoEsperienzaMutation = `
    UPDATE richiesta_servizio_base
    SET 
      dt_periodo_richiesto_dal = $[inizioPeriodo],
      dt_periodo_richiesto_al = $[finePeriodo],
      js_dati_richiesta = null
    WHERE id_richiesta_servizio_base = (
      SELECT id_richiesta_servizio_base
      FROM richiesta_servizio_ente
      WHERE id_richiesta_servizio_ente = $[idRicTcb]
    )
`;

export const aggiornaPeriodoEsperienzaTipologiaMutation = `
    UPDATE richiesta_servizio_base
    SET 
      dt_periodo_richiesto_dal = $[inizioPeriodo],
      dt_periodo_richiesto_al = $[finePeriodo],
      js_dati_richiesta = $[jsDatiRichiesta:json]
    WHERE id_richiesta_servizio_base = (
      SELECT id_richiesta_servizio_base
      FROM richiesta_servizio_ente
      WHERE id_richiesta_servizio_ente = $[idRicTcb]
    )
`;

export const aggiornaDescEsperienzaMutation = `
    UPDATE richiesta_servizio_ente
    SET 
      tx_note_ente = $[descrizioneEsp]
    WHERE id_richiesta_servizio_ente = $[idRicTcb]
`;
/**
 * The function to map the data to update the attributes for val_attributo_domanda
 * @param {object} rows the attributes to map
 * @param {object} context the context object
 * @param {boolean} update is update or insert
 * @returns {string} the query string
 */
export const insertUpdateEsperienzeLavoratoreMutation = (rows, context, update) => {
  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_richiesta_servizio_tcb',
      'cd_attributo',
      'cd_val_attributo',
      'tx_val',
      { name: 'ts_modifica', mod: '^' },
      { name: 'ts_creazione', mod: '^' },
    ],
    { table: 'val_attributo_domanda' }
  );

  if (update) {
    const condition = context.formatter.format(`
      WHERE t.id_richiesta_servizio_tcb = $[idRicTcb]
      AND t.cd_attributo = v.cd_attributo
      `, rows);
    return context.queryBuilder.update(rows, columns) + condition;
  }
  return context.queryBuilder.insert(rows, columns);
};

export const estraiEsperienzeLavoratoreQuery = `
SELECT
	val.id_richiesta_servizio_tcb,
  ent.id_servizio_erogato_ente,
  ent.tx_note_ente,
	val.cd_attributo,
	val.cd_val_attributo,
  val.tx_val,
  bas.dt_periodo_richiesto_dal::TIMESTAMP WITH TIME ZONE,
  bas.dt_periodo_richiesto_al::TIMESTAMP WITH TIME ZONE,
  js_dati_richiesta ->> 'nomeServizioAltro' as "nomeServizioAltro"
FROM wemi2.val_attributo_domanda as val
LEFT JOIN wemi2.richiesta_servizio_ente as ent
ON (val.id_richiesta_servizio_tcb = ent.id_richiesta_servizio_ente)
LEFT JOIN wemi2.richiesta_servizio_base as bas ON (
  bas.id_richiesta_servizio_base = ent.id_richiesta_servizio_base
)
WHERE val.id_richiesta_servizio_tcb IN (
	SELECT id_richiesta 
	FROM wemi2.r_match_ric_lav as rmrl
	INNER JOIN wemi2.richiesta_servizio_ente_stt entstt ON 
    entstt.id_richiesta_servizio_ente = id_richiesta
  INNER JOIN wemi2.recensione_servizio_ente ON
    id_rich_serv_rec = id_richiesta
  WHERE rmrl.id_lavoratore = $[idUtenteLav] 
    and entstt.ts_variazione_stato = (SELECT MAX(ts_variazione_stato)
	 FROM wemi2.richiesta_servizio_ente_stt
	 WHERE id_richiesta_servizio_ente = rmrl.id_richiesta
  ) 
  and recensione_servizio_ente.pg_rich_serv_rec =  (
    SELECT MAX(pg_rich_serv_rec)
    FROM wemi2.recensione_servizio_ente
    WHERE id_rich_serv_rec = rmrl.id_richiesta
  )
  and CAST(rmrl.cd_stato_associazione AS Int) = 1
  and CAST(cd_stato_ric_serv_ente AS Int) <> 12
);
`;

export const ottieniIdRicBaseDaRicEnteQuery = `
  SELECT id_richiesta_servizio_base 
  FROM wemi2.richiesta_servizio_ente
  WHERE id_richiesta_servizio_ente = $[idRichiesta];
`;

export const rimuoviEsperienzeLavoratoreQuery = `
DELETE FROM wemi2.r_match_ric_lav
WHERE id_richiesta = $[idRichiesta];

DELETE FROM wemi2.val_attributo_domanda
WHERE id_richiesta_servizio_tcb = $[idRichiesta];

DELETE FROM wemi2.richiesta_servizio_tcb
WHERE id_richiesta_servizio_tcb = $[idRichiesta];

DELETE FROM wemi2.recensione_servizio_ente_stt
WHERE id_rich_serv_rec = $[idRichiesta];

DELETE FROM wemi2.recensione_servizio_ente
WHERE id_rich_serv_rec = $[idRichiesta];

DELETE FROM wemi2.richiesta_servizio_ente_stt
WHERE id_richiesta_servizio_ente = $[idRichiesta];

DELETE FROM wemi2.richiesta_servizio_ente
WHERE id_richiesta_servizio_ente = $[idRichiesta];

DELETE FROM wemi2.richiesta_servizio_base_stt
WHERE id_richiesta_servizio = $[idRicBase];

DELETE FROM wemi2.richiesta_servizio_base
WHERE id_richiesta_servizio_base = $[idRicBase];
`;

export const querySummary = `
  SELECT cd_attributo, cd_val_attributo, nr_val, tx_val, fg_val, dt_val, tx_nota, 0 as cd_val_attributo_2, 0 as id_servizio_riferimento, null AS "oj_allegato_off"
  FROM wemi2.val_attributo_offerta_ut
  WHERE id_utente_offerta_lav= $[idUtente] and 
        val_attributo_offerta_ut.cd_attributo IN (151, 150, 140, 136, 147, 121, 135, 158, 109, 144, 145, 146, 131, 133, 119, 120, 137, 183, 100, 102, 156, 149, 208)
      
  UNION 
  SELECT cd_attributo, cd_val_attributo, nr_val, tx_val, fg_val, dt_val, tx_nota, 0 as cd_val_attributo_2, 0 as id_servizio_riferimento, null AS "oj_allegato_off"
  FROM wemi2.val_attributo_ut
  WHERE id_utente= $[idUtente] and 
        val_attributo_ut.cd_attributo IN (116, 148, 147, 191, 198, 185, 107, 196, 108, 110, 184, 101, 200, 115, 186, 201, 112, 113, 192, 197, 202, 189, 190, 203, 187, 194, 188, 195, 204, 135, 111, 209, 211 )
  UNION 
  SELECT cd_attributo, cd_val_attributo, nr_val, tx_val, fg_val, dt_val, tx_nota, 0 as cd_val_attributo_2, 0 as id_servizio_riferimento, null AS "oj_allegato_off"
  FROM wemi2.val_attributo_offerta_servizio
  WHERE id_utente_lav=$[idUtente] and (
    cd_attributo= 153 or cd_attributo= 205 or cd_attributo = 157 )
  UNION 
  SELECT 
  null as cd_attributo, null as cd_val_attributo, null as nr_val, null as tx_val, null as fg_val, dt_disponibile_dal AS dt_val, null as tx_nota, 0 as cd_val_attributo_2, 0 as id_servizio_riferimento, null AS "oj_allegato_off"
  FROM wemi2.utente_offerta_lav
  WHERE id_utente_lav= $[idUtente] 
  UNION

  SELECT 
   valAttrOff.cd_attributo, valAttrOff.cd_val_attributo, null as nr_val,  valAttrOff.tx_val, valAttrOff.fg_val, null AS dt_val, null as tx_nota, relOff.cd_val_attributo_2,valAttrOff.id_servizio_riferimento, null AS "oj_allegato_off"
  FROM wemi2.val_attributo_offerta_servizio valAttrOff
  LEFT JOIN wemi2.val_attributo_rel_off_serv_lav relOff 
    ON (relOff.cd_attributo_1 = valAttrOff.cd_attributo
    AND relOff.cd_val_attributo_1 = valAttrOff.cd_val_attributo)
  WHERE valAttrOff.id_utente_lav = $[idUtente]
  AND valAttrOff.id_servizio_riferimento = 999997
  AND cd_attributo IN (117, 127, 158)
  UNION

  SELECT 
  cd_attributo, cd_val_attributo,null as nr_val, tx_val, fg_val, null AS dt_val, null as tx_nota,  0 as cd_val_attributo_2, id_servizio_riferimento, null AS "oj_allegato_off"
  FROM wemi2.val_attributo_offerta_servizio
  WHERE id_utente_lav = $[idUtente]
  AND id_servizio_riferimento = 999998
  AND cd_attributo IN (127, 157, 158)

  UNION 

  SELECT 
  cd_attributo, cd_val_attributo,null as nr_val, tx_val, fg_val, null AS dt_val, null as tx_nota,  0 as cd_val_attributo_2, id_servizio_riferimento, null AS "oj_allegato_off"
  FROM wemi2.val_attributo_offerta_servizio
  WHERE id_utente_lav = $[idUtente]
  AND id_servizio_riferimento = 999999
  AND cd_attributo IN (127, 157, 158)

  UNION 

  SELECT 
    vaou.cd_attributo, null as cd_val_attributo,null as nr_val, null as tx_val, null as fg_val, null AS dt_val, null as tx_nota,  0 as cd_val_attributo_2, null as id_servizio_riferimento, convert_from(oj_allegato_off, 'UTF-8') AS "oj_allegato_off"
  FROM  wemi2.allegato_offerta_lav as aol
  INNER JOIN wemi2.val_attributo_offerta_ut as vaou ON 
    vaou.cd_val_attributo = aol.id_allegato AND aol.id_utente_lav = vaou.id_utente_offerta_lav
  WHERE  id_utente_lav=$[idUtente]
`;

export const estraiFlagsCandidaturaQuery = `
  SELECT
    fg_candidatura_tata as tata,
    fg_candidatura_colf as colf,
    fg_candidatura_badante as badante
  FROM
    wemi2.utente_offerta_lav
  WHERE
    id_utente_lav = $[idUtente]
`;

export const updateFlagsCandidaturaTataQuery = `
  UPDATE
    wemi2.utente_offerta_lav
  SET
    fg_candidatura_tata = $[flag]
  WHERE
    id_utente_lav = $[idUtente]
  RETURNING
    fg_candidatura_tata as tata
`;

export const updateFlagsCandidaturaColfQuery = `
  UPDATE
    wemi2.utente_offerta_lav
  SET
    fg_candidatura_colf = $[flag]
  WHERE
    id_utente_lav = $[idUtente]
  RETURNING
    fg_candidatura_colf as colf
`;

export const updateFlagsCandidaturaBadanteQuery = `
  UPDATE
    wemi2.utente_offerta_lav
  SET
    fg_candidatura_badante = $[flag]
  WHERE
    id_utente_lav = $[idUtente]
  RETURNING
    fg_candidatura_badante as badante
`;
 /**
  * The function to map the id service of tcb
  * @param {object} row the row to map
  * @param {object} context the context object
  * @returns {string} the query string
  */
export const aggiornaAnniVotoServiziMutation = (row, context) => {
  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_utente_lav',
      'id_servizio_riferimento',
      'nr_anni_esperienza',
      'nr_voto_operatore',
      { name: 'ts_ultima_modifica', mod: '^' },
    ],
    { table: 'utente_offerta_servizio' }
  );

  // Dynamic conditions must be escaped/formatted properly:
  const condition = context.formatter.format(`
  WHERE t.id_utente_lav = $[idLavoratore]
  AND t.id_servizio_riferimento = v.id_servizio_riferimento
  `, row);

  return context.queryBuilder.update(row, columns) + condition;
};

export const selectUltimoStatoCandidatura = `
  SELECT cd_stato_dati_lav
  FROM wemi2.utente_offerta_lav_stt
  WHERE id_utente_lav = $[idLavoratore] 
    and ts_variazione_stato = (  
      SELECT MAX(ts_variazione_stato)
      FROM wemi2.utente_offerta_lav_stt
      WHERE id_utente_lav = $[idLavoratore]
    )
`;


export const aggiornaStatoCandidaturaMutation = `
INSERT INTO utente_offerta_lav_stt (
  id_utente_lav,
  ts_variazione_stato,
  cd_stato_dati_lav,
  id_utente
) VALUES (
  $[idLavoratore],
  localtimestamp,
  $[statoCandidatura],
  $[idOperatore]
);

UPDATE utente_offerta_lav 
SET 
  id_utente_lav = $[idLavoratore],
  cd_ultimo_stato_offerta = $[statoCandidatura],
  id_ult_operatore = $[idOperatore],
  ts_ultima_modifica = localtimestamp
WHERE
  id_utente_lav = $[idLavoratore];
`;

export const updateNotaOperatore = `
  UPDATE utente_offerta_lav 
  SET 
    tx_nota_operatore = $[notaOperatore]
  WHERE
    id_utente_lav = $[idLavoratore];
`;

export const controllaPresenzaAttributoUtenteLavQuery = `
  SELECT cd_attributo FROM val_attributo_offerta_ut
  WHERE id_utente_offerta_lav = $[idLavoratore]
  AND cd_attributo IN (138, 139, 193, 210);
`;
/**
 * The function to map the data to update the attributes for val_attributo_offerta_ut
 * @param {object} rows the attributes to map
 * @param {object} context the context object
 * @returns {string} the query string
 */
export const inserisciAttributiUtenteLavMutation = (rows, context) => {
  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_utente_offerta_lav',
      'cd_attributo',
      'cd_val_attributo',
      'tx_val',
      'dt_val',
      'fg_val',
      { name: 'ts_modifica', mod: '^' },
      { name: 'ts_creazione', mod: '^' },
    ],
    { table: context.tabelle.val_attributo_offerta_ut }
  );

  return context.queryBuilder.insert(rows, columns);
};
/**
 * The function to map the data to update the attributes for val_attributo_offerta_ut
 * @param {object} row the attributes to map
 * @param {object} context the context object
 * @returns {string} the query string
 */
export const aggiornaAttributiUtenteLavMutation = (row, context) => {

  const columns = new context.queryBuilder.ColumnSet(
    [
      'id_utente_offerta_lav',
      'cd_attributo',
      'cd_val_attributo',
      'tx_val',
      { name: 'dt_val', cast: 'timestamp' },
      'fg_val',
      { name: 'ts_modifica', mod: '^' },
      { name: 'ts_creazione', mod: '^' },
    ],
    { table: context.tabelle.val_attributo_offerta_ut }
  );

  // Dynamic conditions must be escaped/formatted properly:
  const condition = context.formatter.format(`
  WHERE t.id_utente_offerta_lav = $[idLavoratore]
  AND t.cd_attributo = v.cd_attributo
  `, row);

  return context.queryBuilder.update(row, columns) + condition;
};

export const estraiAnniVotoEspQuery = `
  SELECT 
    id_servizio_riferimento,
    nr_anni_esperienza,
    nr_voto_operatore
  FROM utente_offerta_servizio
  WHERE id_utente_lav = $[args.idUtenteLav]
  AND id_servizio_riferimento IN ($[args.arrayIdServizi:csv]);  
`;

export const estraiIscrizioniVincoliQuery = `
  SELECT 
    cd_attributo,
    tx_val,
    dt_val::timestamp,
    fg_val
  FROM val_attributo_offerta_ut
  WHERE id_utente_offerta_lav = $[args.idUtenteLav]
  AND cd_attributo IN (138, 139, 193, 210);
`;

export const estraiStatoCandidaturaQuery = `
  SELECT 
    cd_ultimo_stato_offerta,
    tx_nota_operatore
  FROM utente_offerta_lav
  WHERE id_utente_lav = $[args.idUtenteLav];
`;

/**
 * The function to map the data to update the attributes for allegato_offerta_lav
 * @param {object} row the attributes to map
 * @param {object} context the context object
 * @returns {string} the query string
 */
export const inserisciDocumentiAllegatiLavoratoreMutation = (row, context) => {
  const columns = new context.queryBuilder.ColumnSet(
    [
      { name: 'id_allegato', mod: '^' },
      'id_utente_lav',
      'nm_nome_allegato_off',
      'oj_allegato_off',
      { name: 'ts_creazione', mod: '^' },
    ],
    { table: context.tabelle.allegato_offerta_lav }
  );
  return `${context.queryBuilder.insert(row, columns)  }RETURNING id_allegato, nm_nome_allegato_off`;
};

export const eliminaDocumentiLavoratoreMutation = `
  DELETE FROM wemi2.allegato_offerta_lav
  WHERE id_allegato IN ($[documentiDaEliminare:csv])
`;

export const estraiIdAllegatiAttributiQuery = `
  SELECT 
    val.cd_val_attributo 
  FROM wemi2.val_attributo_offerta_ut AS val
  WHERE 
    val.id_utente_offerta_lav = $[idUtenteLav]
    AND val.cd_attributo IN (
      SELECT 
        attr.cd_attributo
      FROM wemi2.attributo AS attr 
      WHERE ty_attributo = 10
    );
`;

export const estraiDocumentiLavoratoreQuery = `
SELECT 
id_allegato, 
nm_nome_allegato_off
FROM wemi2.allegato_offerta_lav
WHERE id_utente_lav = $[idUtenteLav]
AND id_allegato NOT IN ($[arrayIdAllegati:csv])
`;

export const estraiDocumentoLavoratoreQuery = `
SELECT 

convert_from(oj_allegato_off, 'UTF-8') as oj_media
FROM wemi2.allegato_offerta_lav
WHERE id_utente_lav = $[idUtenteLav]
AND id_allegato= $[idAllegato]
`;

export const estraiAttributiCurriculumLavoratore = `
  SELECT
    coalesce(
      json_object_agg(
        CASE
          WHEN cd_attributo=${costantiAttributo.DT_NASCITA_UTENTE}
            THEN 'dataNascitaUtente'
          WHEN cd_attributo=${costantiAttributo.CD_SESSO_UTENTE}
            THEN 'sessoUtente'  
          WHEN cd_attributo=${costantiAttributo.CD_STATO_DI_NASCITA_UTENTE}
            THEN 'cdStatoNascitaUtente'
          WHEN cd_attributo=${costantiAttributo.CD_CITTADINANZA_UTENTE}
            THEN 'cdCittadinanzaUtente'
          WHEN cd_attributo=${costantiAttributo.TX_COMUNE_DOMICILIO}
            THEN 'comuneDomicilio'
          WHEN cd_attributo=${costantiAttributo.CD_MUNICIPIO_DOMICILIO}
            THEN 'cdMunicipioDomicilio'
          WHEN cd_attributo=${costantiAttributo.TX_RECAPITO_TELEFONICO}
            THEN 'recapitoTelefonico'
          WHEN cd_attributo=${costantiAttributo.TX_EMAIL}
            THEN 'email'
          WHEN cd_attributo=${costantiAttributo.TX_NR_CARTA_DI_IDENTITA}
            THEN 'nrCartaDiIdentita'
          WHEN cd_attributo=${costantiAttributo.TX_NR_PS}
            THEN 'numeroPermessoDiSoggiorno'
          WHEN cd_attributo=${costantiAttributo.LIV_CONOSCENZA_ITALIANO}
            THEN 'livConoscenzaItaliano'
          WHEN cd_attributo=${costantiAttributo.TX_NOME_UTENTE}
            THEN 'nomeUtente'
          WHEN cd_attributo=${costantiAttributo.TX_COGNOME_UTENTE}
            THEN 'cognomeUtente'
        END,
        CASE 
          WHEN cd_attributo=${costantiAttributo.DT_NASCITA_UTENTE}
            THEN json_build_object('value', EXTRACT(YEAR from age(dt_val)))
          WHEN cd_attributo=${costantiAttributo.CD_SESSO_UTENTE}
             THEN json_build_object('value', cd_val_attributo)  
          WHEN cd_attributo=${costantiAttributo.CD_STATO_DI_NASCITA_UTENTE}
            THEN json_build_object('value', cd_val_attributo)
          WHEN cd_attributo=${costantiAttributo.CD_CITTADINANZA_UTENTE}
            THEN json_build_object('value', cd_val_attributo)
          WHEN cd_attributo=${costantiAttributo.TX_COMUNE_DOMICILIO}
            THEN json_build_object('value', tx_val)
          WHEN cd_attributo=${costantiAttributo.CD_MUNICIPIO_DOMICILIO}
            THEN json_build_object('value', cd_val_attributo)
          WHEN cd_attributo=${costantiAttributo.TX_RECAPITO_TELEFONICO}
            THEN json_build_object('value', tx_val)
          WHEN cd_attributo=${costantiAttributo.TX_EMAIL}
            THEN json_build_object('value', tx_val)
          WHEN cd_attributo=${costantiAttributo.TX_NR_CARTA_DI_IDENTITA}
            THEN json_build_object('value', tx_val)
          WHEN cd_attributo=${costantiAttributo.TX_NR_PS}
            THEN json_build_object('value', tx_val)
          WHEN cd_attributo=${costantiAttributo.LIV_CONOSCENZA_ITALIANO}
            THEN json_build_object('value', nr_val)
          WHEN cd_attributo=${costantiAttributo.TX_NOME_UTENTE}
            THEN json_build_object('value', tx_val)
          WHEN cd_attributo=${costantiAttributo.TX_COGNOME_UTENTE}
            THEN json_build_object('value', tx_val)
        END
      ),
      '{}'::json
    ) as "attributiCvLavoratore"
  FROM wemi2.val_attributo_ut
  WHERE 
    id_utente=$[idUtenteLav] and 
    cd_attributo IN (
      ${costantiAttributo.DT_NASCITA_UTENTE},
      ${costantiAttributo.CD_SESSO_UTENTE},
      ${costantiAttributo.CD_STATO_DI_NASCITA_UTENTE},
      ${costantiAttributo.CD_CITTADINANZA_UTENTE},
      ${costantiAttributo.TX_COMUNE_DOMICILIO},
      ${costantiAttributo.CD_MUNICIPIO_DOMICILIO},
      ${costantiAttributo.TX_RECAPITO_TELEFONICO},
      ${costantiAttributo.TX_EMAIL},
      ${costantiAttributo.TX_NR_CARTA_DI_IDENTITA},
      ${costantiAttributo.TX_NR_PS},
      ${costantiAttributo.LIV_CONOSCENZA_ITALIANO},
      ${costantiAttributo.TX_NOME_UTENTE},
      ${costantiAttributo.TX_COGNOME_UTENTE}
    )
`;

export const estraiLivelloConoscenzaLingueAttr = `
  SELECT
    cd_val_attributo as "cdValAttributo",
    nr_val as "livello"
  FROM wemi2.val_attributo_ut
  WHERE 
    id_utente=$[idUtenteLav] and 
    cd_attributo=${costantiAttributo.LIV_LINGUE_CONOSCIUTE}
`;

export const estraiAttributiOffertaCurriculumLavoratore = `
  SELECT 
    coalesce(
      json_build_object(
        CASE
          WHEN cd_attributo=${costantiAttributo.IMG_FOTO}
            THEN 'fotoProfilo'
          WHEN cd_attributo=${costantiAttributo.FG_PATENTE_DI_GUIDA_AUTO}
            THEN 'patenteAuto'
          WHEN cd_attributo=${costantiAttributo.FG_AUTOMUNITO}
            THEN 'flagAutomunito'
          WHEN cd_attributo=${costantiAttributo.LS_CORSI_TATA.cd_attributo}
            THEN 'corsiTata'
          WHEN cd_attributo=${costantiAttributo.LS_CORSI_BADANTE.cd_attributo}
            THEN 'corsiBadante'
          WHEN cd_attributo=${costantiAttributo.LIV_CAPACITA_COMUNICATIVE}
            THEN 'elencoCapacitaComunicative'
          WHEN cd_attributo=${costantiAttributo.LIV_CAPACITA_DI_GESTIONE_DEL_TEMPO}
            THEN 'elencoCapacitaGestioneTempo'
          WHEN cd_attributo=${costantiAttributo.NR_MEDIA_COMPETENZE_RELAZIONALI}
            THEN 'mediaCompetenzeRelazionali'
          WHEN cd_attributo=${costantiAttributo.LS_CARATTERE.cd_attributo}
            THEN 'elencoCarattere'
          WHEN cd_attributo=${costantiAttributo.LS_INTERESSI}
            THEN 'elencoInteressi'
          WHEN cd_attributo=${costantiAttributo.DT_ITALIA_DAL}
            THEN 'inItaliaDal'
        END,
        array_to_json(array_agg(
          json_build_object(
            'cdAttributo', attrOff.cd_attributo,
            'cdValAttributo', attrOff.cd_val_attributo,
            'txVal', attrOff.tx_val,
            'dtVal', attrOff.dt_val,
            'txNota', attrOff.tx_nota,
            'txNotaOp', attrOff.tx_nota_op,
            'fgVal', attrOff.fg_val,
            'nrVal', attrOff.nr_val 
          )
        ))
      ),
      '{}'::json
    ) as "attributoOffLav"
  FROM wemi2.val_attributo_offerta_ut attrOff
  WHERE 
    id_utente_offerta_lav=$[idUtenteLav] AND 
    cd_attributo IN (
      ${costantiAttributo.IMG_FOTO},
      ${costantiAttributo.FG_PATENTE_DI_GUIDA_AUTO},
      ${costantiAttributo.FG_AUTOMUNITO},
      ${costantiAttributo.LS_CORSI_TATA.cd_attributo},
      ${costantiAttributo.LS_CORSI_BADANTE.cd_attributo},
      ${costantiAttributo.LIV_CAPACITA_COMUNICATIVE},
      ${costantiAttributo.LIV_CAPACITA_DI_GESTIONE_DEL_TEMPO},
      ${costantiAttributo.NR_MEDIA_COMPETENZE_RELAZIONALI},
      ${costantiAttributo.LS_CARATTERE.cd_attributo},
      ${costantiAttributo.LS_INTERESSI},
      ${costantiAttributo.DT_ITALIA_DAL}
    )
  GROUP BY cd_attributo
`;

export const estraiDominiTCBCurriculumLavoratore = `
  SELECT
    coalesce(
      json_build_object(
        CASE
          WHEN ty_dominio_tcb=${tyDominioTCB.STATO}
            THEN 'stato'
          WHEN ty_dominio_tcb=${tyDominioTCB.INTERESSI}
            THEN 'interessi'
          WHEN ty_dominio_tcb=${tyDominioTCB.CARATTERE}
            THEN 'carattere'
          WHEN ty_dominio_tcb=${tyDominioTCB.CORSI_BADANTE}
            THEN 'corsiBadante'
          WHEN ty_dominio_tcb=${tyDominioTCB.CORSI_TATA}
            THEN 'corsiTata'
          WHEN ty_dominio_tcb=${tyDominioTCB.LINGUE_PARLATE}
            THEN 'lingueParlate'
          WHEN ty_dominio_tcb=${attributo.LS_STIPENDIO_CONVIVENTE.ty_dominio_tcb}
            THEN 'retribuzioniConvivente'
          WHEN ty_dominio_tcb=${attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.ty_dominio_tcb}
            THEN 'retribuzioniConvivenzaRidotta'
          WHEN ty_dominio_tcb=${attributo.LS_STIPENDIO_NON_CONVIVENTE.ty_dominio_tcb}
            THEN 'retribuzioniNonConvivente'
          WHEN ty_dominio_tcb=${attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.ty_dominio_tcb}
            THEN 'retribuzioniPresenzaNotturna'
          WHEN ty_dominio_tcb=${attributo.LS_STIPENDIO_WEEKEND.ty_dominio_tcb}
            THEN 'retribuzioniWeekend'
          WHEN ty_dominio_tcb=${attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.ty_dominio_tcb}
            THEN 'retribuzioniAssistenzaNotturna'
        END,
        array_to_json(array_agg(
          json_build_object(
            'tyDominioTcb', domTcb.ty_dominio_tcb,
            'cdDominioTcb', domTcb.cd_dominio_tcb,
            'tlValoreTestuale', domTcb.tl_valore_testuale::json->>'it' 
          )
        ))
      ),
      '{}'::json
    ) as "dominiTcbCvLavoratore"
  FROM wemi2.dominio_tcb domTcb
  WHERE ty_dominio_tcb IN (
    $[attributiDominioArgs:csv]
  )
  GROUP BY ty_dominio_tcb
`;

export const estraiFotoProfiloLavoratore = `
  SELECT convert_from(allOffLav.oj_allegato_off, 'UTF-8') AS "fotoProfiloLav"
  FROM wemi2.allegato_offerta_lav allOffLav
  WHERE 
    id_utente_lav=$[idUtenteLav] AND
    id_allegato=$[idAllegato]
`;
/**
 * The function to extract competenze 
 * @param {object} attributo the attribute
 * @param {object} idServizio the id of service
 * @returns {string} the query string
 */
export const estraiDatiCompetenze = (attributo, idServizio) => `
  WITH tableCompetenze AS (
    SELECT 
    vaos.cd_val_attributo::int as "valoreAttributo",
    dtcb.tl_valore_testuale  #>> '{it}' as "testoAttributo",
    vaos.tx_val as "testo",
    true as checked
    FROM wemi2.val_attributo_offerta_servizio vaos
    INNER JOIN wemi2.dominio_tcb dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb 
      AND dtcb.ty_dominio_tcb = ${attributo.ty_dominio_tcb}
    WHERE vaos.id_utente_lav = $[idUtenteLav]
    AND vaos.id_servizio_riferimento = ${idServizio}
    AND vaos.cd_attributo = ${attributo.cd_attributo}
    UNION ALL
    SELECT 
    dtcb.cd_dominio_tcb::int as "valoreAttributo",
    dtcb.tl_valore_testuale #>> '{it}' as "testoAttributo",
    null as "testo",
    false as checked
    FROM wemi2.dominio_tcb dtcb
    WHERE dtcb.ty_dominio_tcb = ${attributo.ty_dominio_tcb}
    AND dtcb.cd_dominio_tcb NOT IN (
      SELECT vaos.cd_val_attributo
      FROM wemi2.val_attributo_offerta_servizio vaos
      INNER JOIN wemi2.dominio_tcb dtcb on vaos.cd_val_attributo = dtcb.cd_dominio_tcb 
        AND dtcb.ty_dominio_tcb = ${attributo.ty_dominio_tcb}
      WHERE vaos.id_utente_lav = $[idUtenteLav]
      AND vaos.id_servizio_riferimento = ${idServizio}
      AND vaos.cd_attributo = ${attributo.cd_attributo}
    )
  ) 
  SELECT * FROM tableCompetenze ORDER BY "valoreAttributo" = 0 nulls last, "valoreAttributo";
`;

export const estraiAttributiDisponibilita = `
  WITH tableAttributiDisponibilia AS (
    SELECT
    CASE
      WHEN cd_attributo = ${attributo.FG_DISP_LAV_CASA_CON_ANIMALI}
        THEN 'Lavoro in presenza di animali'
      WHEN cd_attributo = ${attributo.FG_DISP_CURA_ANIMALI}
        THEN 'Cura degli animali'
      WHEN cd_attributo = ${attributo.FG_DISP_TRASFERTE_BREVI}
        THEN 'Trasferte brevi'
      WHEN cd_attributo = ${attributo.FG_DISP_TRASFERTE_LUNGHE}
        THEN 'Trasferte lunghe'
      WHEN cd_attributo = ${attributo.FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA}
        THEN 'Vacanze con la famiglia'
      WHEN cd_attributo = ${attributo.FG_DISPONIBILITA_STRAORDINARI}
        THEN 'Straordinari'
    END as text,
    CASE
      WHEN vaos.fg_val = 'S'
        THEN true
      ELSE false
    END as checked,
    cd_attributo
    FROM wemi2.val_attributo_offerta_servizio vaos
    WHERE id_utente_lav = $[idUtenteLav]
    AND id_servizio_riferimento = $[idServizio]
    AND cd_val_attributo = 1
    AND cd_attributo IN (
      ${attributo.FG_DISP_LAV_CASA_CON_ANIMALI},
      ${attributo.FG_DISP_CURA_ANIMALI},
      ${attributo.FG_DISP_TRASFERTE_BREVI},
      ${attributo.FG_DISP_TRASFERTE_LUNGHE},
      ${attributo.FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA},
      ${attributo.FG_DISPONIBILITA_STRAORDINARI}
    )
    UNION ALL
    SELECT
    CASE
      WHEN cd_attributo = ${attributo.FG_DISP_LAV_CASA_CON_ANIMALI}
        THEN 'Lavoro in presenza di animali'
      WHEN cd_attributo = ${attributo.FG_DISP_CURA_ANIMALI}
        THEN 'Cura degli animali'
      WHEN cd_attributo = ${attributo.FG_DISP_TRASFERTE_BREVI}
        THEN 'Trasferte brevi'
      WHEN cd_attributo = ${attributo.FG_DISP_TRASFERTE_LUNGHE}
        THEN 'Trasferte lunghe'
      WHEN cd_attributo = ${attributo.FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA}
        THEN 'Vacanze con la famiglia'
      WHEN cd_attributo = ${attributo.FG_DISPONIBILITA_STRAORDINARI}
        THEN 'Straordinari'
    END as text,
    false as checked,
    att.cd_attributo
    FROM wemi2.attributo att
    WHERE att.cd_attributo NOT IN (
      SELECT cd_attributo
      FROM wemi2.val_attributo_offerta_servizio
      WHERE id_utente_lav = $[idUtenteLav]
      AND id_servizio_riferimento = $[idServizio]
      AND cd_val_attributo = 1
    )
    AND cd_attributo IN (
      ${attributo.FG_DISP_LAV_CASA_CON_ANIMALI},
      ${attributo.FG_DISP_CURA_ANIMALI},
      ${attributo.FG_DISP_TRASFERTE_BREVI},
      ${attributo.FG_DISP_TRASFERTE_LUNGHE},
      ${attributo.FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA},
      ${attributo.FG_DISPONIBILITA_STRAORDINARI}
    )
  )
  SELECT * FROM tableAttributiDisponibilia
  ORDER BY
   CASE cd_attributo
    WHEN ${attributo.FG_DISP_LAV_CASA_CON_ANIMALI} THEN 1
    WHEN ${attributo.FG_DISP_CURA_ANIMALI} THEN 2
    WHEN ${attributo.FG_DISP_TRASFERTE_BREVI} THEN 3
    WHEN ${attributo.FG_DISP_TRASFERTE_LUNGHE} THEN 4
    WHEN ${attributo.FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA} THEN 5
    WHEN ${attributo.FG_DISPONIBILITA_STRAORDINARI} THEN 6
   END
`;

export const estraiServiziTcbCandidaturaUtente = `
  SELECT
  CASE 
    WHEN id_contenuto = ${ID_SERVIZIO_TATA}
      THEN 'BABY-SITTER'
    ELSE UPPER(c.tl_testo_1 #>> '{it}')
  END AS servizio
  FROM wemi2.utente_offerta_servizio uos
  INNER JOIN wemi2.contenuto c on uos.id_servizio_riferimento = c.id_contenuto
  WHERE uos.id_utente_lav = $[idUtenteLav]
  AND c.id_contenuto = $[idServizio]
  ORDER BY id_contenuto
`;

export const estraiDatiServiziTcbCandidaturaLavoratore = `
  SELECT
  c.id_contenuto AS "idServizio",
  CASE
    WHEN id_contenuto = ${ID_SERVIZIO_TATA}
      THEN 'Baby-Sitter'
    ELSE c.tl_testo_1 #>> '{it}'
  END AS servizio
  FROM wemi2.utente_offerta_servizio uos
  INNER JOIN wemi2.contenuto c on uos.id_servizio_riferimento = c.id_contenuto
  WHERE uos.id_utente_lav = $[idUtenteLav]
  ORDER BY c.id_contenuto 
`;

export const estraiRecensioniLavoratore = `
  SELECT 
    rse.qt_media_singola_recensione AS "mediaRecensione",
    rse.js_dati_recensione#>>'{txNotaRecensione}' AS "txNotaRecensione",
    vad.tx_val as "cognomeFamiglia"
  FROM wemi2.r_match_ric_lav rmrl
  INNER JOIN wemi2.recensione_servizio_ente rse on
    rse.id_rich_serv_rec = rmrl.id_richiesta
  INNER JOIN wemi2.val_attributo_domanda vad ON
    vad.id_richiesta_servizio_tcb = rse.id_rich_serv_rec
  INNER JOIN wemi2.richiesta_servizio_ente richse ON
    richse.id_richiesta_servizio_ente = rmrl.id_richiesta
  INNER JOIN wemi2.richiesta_servizio_base rsb ON
    richse.id_richiesta_servizio_base = rsb.id_richiesta_servizio_base
  WHERE 
    rmrl.id_lavoratore = $[idUtenteLav] AND 
    rmrl.cd_stato_associazione = '1' AND
    rse.cd_stato_rec = '3' AND
    rse.pg_rich_serv_rec = (
      SELECT MAX(rse2.pg_rich_serv_rec)
      FROM wemi2.recensione_servizio_ente rse2
      WHERE 
        rse2.id_rich_serv_rec = rse.id_rich_serv_rec AND
        rse2.cd_stato_rec = '3'
    ) AND
    vad.cd_attributo = ${attributo.TX_COGNOME_CONTATTO}
  ORDER BY 
    rsb.dt_periodo_richiesto_dal DESC, 
    rsb.dt_periodo_richiesto_al DESC;;
`;

export const estraiEsprienzeLavoratore = `
  (
    SELECT
      rsb.dt_periodo_richiesto_dal AS "inizioPeriodo",
      CASE 
        WHEN rsb.dt_periodo_richiesto_al = '9999-12-31' THEN null
        ELSE rsb.dt_periodo_richiesto_al
      END AS "finePeriodo",
      CASE
        WHEN rse.id_servizio_erogato_ente = 4
          THEN rsb.js_dati_richiesta ->> 'nomeServizioAltro'
        WHEN (rse.id_servizio_erogato_ente = 1 OR rse.id_servizio_erogato_ente = 3)
              AND EXISTS(SELECT 1 FROM wemi2.val_attributo_domanda
                         WHERE cd_attributo = ${attributo.LS_MANSIONI_RICHIESTE_COLF}
                         AND id_richiesta_servizio_tcb = rse.id_richiesta_servizio_ente)
          THEN (CONCAT(dtcb.tl_valore_testuale ->> 'it', ' | Colf'))
        ELSE dtcb.tl_valore_testuale ->> 'it' 
      END AS "nomeServizio",
      rse.tx_note_ente AS "noteLavoratore",
      vad.tx_val AS "nomeFamiglia"
    FROM wemi2.r_match_ric_lav rmrl
    INNER JOIN wemi2.richiesta_servizio_ente rse ON
      rse.id_richiesta_servizio_ente = rmrl.id_richiesta
    INNER JOIN wemi2.richiesta_servizio_base rsb ON
      rse.id_richiesta_servizio_base = rsb.id_richiesta_servizio_base
    INNER JOIN wemi2.richiesta_servizio_base_stt rsbstt ON
      rsbstt.id_richiesta_servizio = rsb.id_richiesta_servizio_base
    INNER JOIN wemi2.val_attributo_domanda vad ON
      vad.id_richiesta_servizio_tcb = rse.id_richiesta_servizio_ente
    LEFT JOIN wemi2.dominio_tcb dtcb ON
      rse.id_servizio_erogato_ente = dtcb.cd_dominio_tcb 
      AND dtcb.ty_dominio_tcb = 46
    WHERE 
      rmrl.id_lavoratore = $[idUtenteLav] AND
      rmrl.cd_stato_associazione = '1' AND
      rsbstt.cd_stato_richiesta_servizio = '${RICHIESTA_BASE_STORICO_ESP_LAV}' AND
      vad.cd_attributo = ${attributo.TX_COGNOME_CONTATTO}

    UNION

    SELECT
      rsb.dt_periodo_richiesto_dal AS "inizioPeriodo",
      CASE 
        WHEN rsb.dt_periodo_richiesto_al = '9999-12-31' THEN null
        ELSE rsb.dt_periodo_richiesto_al
      END AS "finePeriodo", 
      CASE
        WHEN rse.id_servizio_erogato_ente = 4
          THEN rsb.js_dati_richiesta ->> 'nomeServizioAltro'
        WHEN (rse.id_servizio_erogato_ente = 1 OR rse.id_servizio_erogato_ente = 3)
              AND EXISTS(SELECT 1 FROM wemi2.val_attributo_domanda
                         WHERE cd_attributo = ${attributo.LS_MANSIONI_RICHIESTE_COLF}
                         AND id_richiesta_servizio_tcb = rse.id_richiesta_servizio_ente)
          THEN (CONCAT(dtcb.tl_valore_testuale ->> 'it', ' | Colf'))
        ELSE dtcb.tl_valore_testuale ->> 'it' 
      END AS "nomeServizio",
      rse.tx_note_ente AS "noteLavoratore",
      vad.tx_val AS "nomeFamiglia"
    FROM wemi2.r_match_ric_lav rmrl
    INNER JOIN wemi2.richiesta_servizio_ente rse ON
      rse.id_richiesta_servizio_ente = rmrl.id_richiesta
    INNER JOIN wemi2.richiesta_servizio_base rsb ON
      rse.id_richiesta_servizio_base = rsb.id_richiesta_servizio_base
    INNER JOIN wemi2.richiesta_servizio_base_stt rsbstt ON
      rsbstt.id_richiesta_servizio = rsb.id_richiesta_servizio_base
    INNER JOIN wemi2.recensione_servizio_ente rcse ON
      rcse.id_rich_serv_rec = rmrl.id_richiesta 
    INNER JOIN wemi2.val_attributo_domanda vad ON
      vad.id_richiesta_servizio_tcb = rse.id_richiesta_servizio_ente
    LEFT JOIN wemi2.dominio_tcb dtcb ON
      rse.id_servizio_erogato_ente = dtcb.cd_dominio_tcb 
      AND dtcb.ty_dominio_tcb = 46
    WHERE 
      rmrl.id_lavoratore = $[idUtenteLav] AND
      rmrl.cd_stato_associazione = '1' AND
      rsbstt.cd_stato_richiesta_servizio = '${RICHIESTA_BASE_STORICO_ESP_LAV}' AND
      vad.cd_attributo = ${attributo.TX_COGNOME_CONTATTO} AND
      rcse.cd_stato_rec = '3'
  )

  ORDER BY
    "inizioPeriodo" DESC,
    "finePeriodo" DESC
`;

export const estraiAttributiOffertaServizio = `
  SELECT 
    coalesce(
      json_build_object(
        CASE
          WHEN cd_attributo=${attributo.LS_STIPENDIO_CONVIVENTE.cd_attributo}
            THEN 'retribuzioneConvivenza'
          WHEN cd_attributo=${attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.cd_attributo}
            THEN 'retribuzioneConvivenzaRidotta'
          WHEN cd_attributo=${attributo.LS_STIPENDIO_NON_CONVIVENTE.cd_attributo}
            THEN 'retribuzioneOraria'
          WHEN cd_attributo=${attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.cd_attributo}
            THEN 'retribuzionePresenzaNotturna'
          WHEN cd_attributo=${attributo.LS_STIPENDIO_WEEKEND.cd_attributo}
            THEN 'retribuzioneWeekend'
          WHEN cd_attributo=${attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.cd_attributo}
            THEN 'retribuzioneAssistenzaNotturna'
        END,
        array_to_json(array_agg(
          json_build_object(
            'cdAttributo', attrOff.cd_attributo,
            'cdValAttributo', attrOff.cd_val_attributo
          )
        ))
      ),
      '{}'::json
    ) as "attributoOffServ"
  FROM wemi2.val_attributo_offerta_servizio attrOff
  WHERE 
    id_utente_lav=$[idUtenteLav] AND 
	  id_servizio_riferimento=$[idServizio] AND
    cd_attributo IN (
      ${attributo.LS_STIPENDIO_CONVIVENTE.cd_attributo},
      ${attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.cd_attributo},
      ${attributo.LS_STIPENDIO_NON_CONVIVENTE.cd_attributo},
      ${attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.cd_attributo},
      ${attributo.LS_STIPENDIO_WEEKEND.cd_attributo},
      ${attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.cd_attributo}
    )
  GROUP BY cd_attributo
`;

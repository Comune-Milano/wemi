import tabelle from 'tabelle';
import {  orderClauseIdentifierVoucher, 
          orderClauseIdentifierVoucherTransaction,
          limitClauseContent, 
          groupByClauseVouchers,
          havingClauseSearchRemainingImportMin,
          havingClauseSearchRemainingImportMax,
          havingClauseNonUtilizzato,
          whereClauseSearchFineValidita,
          whereClauseSearchInizioValidita,
          whereClauseSearchDataTransazioneDa,
          whereClauseSearchDataTransazioneA,
          whereClauseSearchDataContabilizzazioneDa,
          whereClauseSearchDataContabilizzazioneA,
          whereClauseSearchTransazioneState,
          whereClauseSearchImportoTransazioneMin,
          whereClauseSearchImportoTransazioneMax,
          whereClauseSearchBando,
          whereClauseSearchState,
          whereClauseSearchCFMinore,
          whereClauseSearchCFTitolare,
          whereClauseSearchCodiceVoucher,
          whereClauseSearchidUtente,
          whereClauseSearchIdVoucher,
           } from 'sql/voucher';

import { selectAllVoucher, selectVoucherState, selectAllVoucherTransaction, selectSostegniEconomici } from 'sql/voucher/selezione';

import { STATIVOUCHER } from 'constants/db/statiVoucher';
import { STATITRANSAZIONEVOUCHER } from 'constants/db/statiTransazioneVoucher';

  
/**
 * Class for the formatting of vouchers
 */
export class VoucherFormatter {
  /**
   * The constructor of the class
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(builder, formatter) {
    this.builder = builder;
    this.formatter = formatter;
    this.tableNameVoucher = {
      table: tabelle.voucher,
    };
    this.tableNameTransaction = {
      table: tabelle.transazione_voucher,
    };
  }

  /**
   * The function to format get list of vouchers
   * @param {*} parameters the parameters
   * @param {*} locale the language
   * @param {*} idUtente current user
   * @returns {string} the formatted string
   */
  getList(parameters, locale, idUtente = null) {
    const { filters, offset, elementsPerPage } = parameters;
    
    const whereClause = [];

    const havingClause = [];

    let limitClause = '';

    if (offset >= 0 && elementsPerPage > 0) {
      limitClause = limitClauseContent;
    }

    if (idUtente) {
      whereClause.push(this.formatter.format(whereClauseSearchidUtente, {
        idUtente: idUtente.toUpperCase(),
      }));
    }

    if (filters.codiceVoucher) {
      whereClause.push(this.formatter.format(whereClauseSearchCodiceVoucher, {
        codiceVoucher: filters.codiceVoucher.toUpperCase(),
      }));
    }

    if (filters.cfIntestatario) {
      whereClause.push(this.formatter.format(whereClauseSearchCFTitolare, {
        cfIntestatario: filters.cfIntestatario.toUpperCase(),
      }));
    }

    if (filters.cfMinore) {
      whereClause.push(this.formatter.format(whereClauseSearchCFMinore, {
        cfMinore: filters.cfMinore.toUpperCase(),
      }));
    }

    if (filters.state || typeof filters.state === 'number') {
      whereClause.push(this.formatter.format(whereClauseSearchState, {
        state: filters.state,
      }));
    }

    if (filters.inizioValidita) {
      whereClause.push(this.formatter.format(whereClauseSearchInizioValidita, {
        inizioValidita: filters.inizioValidita,
      }));
    }

    if (filters.fineValidita) {
      whereClause.push(this.formatter.format(whereClauseSearchFineValidita, {
        fineValidita: filters.fineValidita,
      }));
    }

    // bando: String
    if (filters.bando) {
      whereClause.push(this.formatter.format(whereClauseSearchBando, {
        bando: filters.bando.toUpperCase(),
      }));
    }

    // minImporto: Float
    if (filters.minImporto) {
      havingClause.push(this.formatter.format(havingClauseSearchRemainingImportMin, {
        minImporto: filters.minImporto
      }));
    }
    // maxImporto: Float
    if (filters.maxImporto) {
      havingClause.push(this.formatter.format(havingClauseSearchRemainingImportMax, {
        maxImporto: filters.maxImporto
      }));
    }

    // nonUtilizzato: Boolean
    if (!!filters.nonUtilizzato) {
      havingClause.push(this.formatter.format(havingClauseNonUtilizzato));
    }
    
    let orderClause = orderClauseIdentifierVoucher;

    const formattedSelect = `
      ${selectAllVoucher}
      ${whereClause.length > 0 ? ' and ' + whereClause.join(' and ') : ''}
      ${groupByClauseVouchers}
      ${havingClause.length > 0 ? ' HAVING ' + havingClause.join(' and ') : ''}
      ${orderClause.length > 0 ? ' ORDER BY ' +  orderClause : ''}
      ${limitClause}
      ;
    `;

    return formattedSelect;
  }

  /**
   * The function to format get list of voucher transaction
   * @param {*} parameters the parameters
   * @param {*} locale the language
   * @param {*} idUtente the current user
   * @returns {string} the formatted string
   */
   getTransactionList(parameters, locale, idUtente = null) {
    const { filters, offset, elementsPerPage } = parameters;
    
    const whereClause = [];

    let limitClause = '';

    if (idUtente) {
      whereClause.push(this.formatter.format(whereClauseSearchidUtente, {
        idUtente: idUtente.toUpperCase(),
      }));
    }

    if (offset >= 0 && elementsPerPage > 0) {
      limitClause = limitClauseContent;
    }

    if (filters.idVoucher) {
      whereClause.push(this.formatter.format(whereClauseSearchIdVoucher, {
        idVoucher: filters.idVoucher,
      }));
    }

    if (filters.codiceVoucher) {
      whereClause.push(this.formatter.format(whereClauseSearchCodiceVoucher, {
        codiceVoucher: filters.codiceVoucher.toUpperCase(),
      }));
    }

    if (filters.state) {
      whereClause.push(this.formatter.format(whereClauseSearchTransazioneState, {
        state: filters.state,
      }));
    }

    // Data Transazione
    if (filters.dataTransazioneDa) {
      whereClause.push(this.formatter.format(whereClauseSearchDataTransazioneDa, {
        dataTransazioneDa: filters.dataTransazioneDa,
      }));
    }

    if (filters.dataTransazioneA) {
      whereClause.push(this.formatter.format(whereClauseSearchDataTransazioneA, {
        dataTransazioneA: filters.dataTransazioneA,
      }));
    }

    // Data Contabilizzazione
    if (filters.dataContabilizzazioneDa) {
      whereClause.push(this.formatter.format(whereClauseSearchDataContabilizzazioneDa, {
        dataContabilizzazioneDa: filters.dataContabilizzazioneDa,
      }));
    }

    if (filters.dataContabilizzazioneA) {
      whereClause.push(this.formatter.format(whereClauseSearchDataContabilizzazioneA, {
        dataContabilizzazioneA: filters.dataContabilizzazioneA,
      }));
    }

    // importoTransazioneMin: Float
    if (filters.importoTransazioneMin) {
      whereClause.push(this.formatter.format(whereClauseSearchImportoTransazioneMin, {
        importoTransazioneMin: filters.importoTransazioneMin
      }));
    }
    // importoTransazioneMax: Float
    if (filters.importoTransazioneMax) {
      whereClause.push(this.formatter.format(whereClauseSearchImportoTransazioneMax, {
        importoTransazioneMax: filters.importoTransazioneMax
      }));
    }

    if (filters.cfIntestatario) {
      whereClause.push(this.formatter.format(whereClauseSearchCFTitolare, {
        cfIntestatario: filters.cfIntestatario.toUpperCase(),
      }));
    }

    if (filters.cfMinore) {
      whereClause.push(this.formatter.format(whereClauseSearchCFMinore, {
        cfMinore: filters.cfMinore.toUpperCase(),
      }));
    }

    // bando: String
    if (filters.bando) {
      whereClause.push(this.formatter.format(whereClauseSearchBando, {
        bando: filters.bando.toUpperCase(),
      }));
    }

    let orderClause = orderClauseIdentifierVoucherTransaction;

    const formattedSelect = `
      ${selectAllVoucherTransaction}
      ${whereClause.length > 0 ? ' WHERE ' + whereClause.join(' and ') : ''}
      ${orderClause.length > 0 ? ' ORDER BY ' +  orderClause : ''}
      ${limitClause}
      ;
    `;

    return formattedSelect;
  }

  /**
   * The function to format get list of vouchers state
   * @param {*} parameters the parameters
   * @param {*} locale the language
   * @returns {string} the formatted string
   */
  getEstraiStatiVoucher(parameters, locale) {
    const { filters } = parameters;
    
    return selectVoucherState;
  }

  /**
   * The function to format get list of vouchers state
   * @param {*} parameters the parameters
   * @param {*} locale the language
   * @returns {string} the formatted string
   */
   getEstraiSostegnoEconomico(parameters, locale) {
    const { filters } = parameters;
    
    return selectSostegniEconomici;
  }

  /**
   * The function to format get list of vouchers state
   * @param {*} parameters the parameters
   * @param {*} locale the language
   * @returns {string} the formatted string
   */
  getEstraiStatiTransazioneVoucher(parameters, locale) {
    const { filters } = parameters;
    
    return selectVoucherState;
  }

  /**
   * method to format update of contents
   * @param {object} voucher the content
   * @returns {string} the query formatted
   */
  update(voucher = {}, idUtente = null) {
    const { ColumnSet: ClassColumnSet } = this.builder;
    const columns = [
      {
        name: 'cd_stato_voucher',
        prop: 'state',
      },
      {
        name: 'ts_attivazione',
        mod: '^',
        def: 'localtimestamp',
        skip: col => (col.source.state === STATIVOUCHER.ANNULLATO) || (col.value === undefined),
      },
      {
        name: 'id_utente_attivazione',
        prop: 'idUtente',
        skip: col => (col.source.state === STATIVOUCHER.ANNULLATO) || (col.value === undefined),
      },
      {
        name: 'ts_annullo',
        mod: '^',
        def: 'localtimestamp',
        skip: col => (col.source.state === STATIVOUCHER.ATTIVO) || (col.value === undefined),
      },
      {
        name: 'id_utente_annullo',
        prop: 'idUtente',
        skip: col => (col.source.state === STATIVOUCHER.ATTIVO) || (col.value === undefined),
      }
    ];
    const columnSet = new ClassColumnSet(columns, this.tableNameVoucher);
    const updateQuery = this.builder.update({
      state: voucher.state,
      idUtente: idUtente,
    }, columnSet);

    return `
      ${updateQuery}
      WHERE id_voucher = $[idVoucher];
    `;
  }

  /**
   * method to format insert of voucher
   * @param {object} voucher the voucher
   * @returns {string} the query formatted
   */
  insertVoucher({vouchers = [], idUtente = null, sostegnoEconomico, state, idFileImport}) {
    const { ColumnSet: ClassColumnSet } = this.builder;

    const columns = [
      {
        name: 'id_voucher',
        mod: '^',
        def: 'nextval(\'seq_voucher\')',
      },
      {
        name: 'id_file_voucher',
        prop: 'idFileImport',
      },
      {
        name: 'id_sostegno_economico',
        prop: 'sostegnoEconomico',
      },
      {
        name: 'cd_voucher',
        prop: 'codiceVoucher',
      },
      {
        name: 'cd_bando',
        prop: 'codiceBando',
      },
      {
        name: 'cd_domanda',
        prop: 'cdDomanda',
      },
      {
        name: 'dt_inizio_val',
        prop: 'inizioValidita',
      },
      {
        name: 'dt_fine_val',
        prop: 'fineValidita',
      },
      {
        name: 'tx_nome_titolare',
        prop: 'nomeTitolare',
      },
      {
        name: 'tx_cognome_titolare',
        prop: 'cognomeTitolare',
      },
      {
        name: 'ptx_cf_titolare',
        prop: 'cfTitolare',
      },
      {
        name: 'js_dati_voucher',
        prop: 'jsonDatiVoucher',
      },
      {
        name: 'im_totale',
        prop: 'importoVoucher',
      },
      {
        name: 'cd_stato_voucher',
        prop: 'state',
      },
      {
        name: 'ts_caricamento',
        mod: '^',
        def: 'localtimestamp',
      },
      {
        name: 'id_utente_caricamento',
        prop: 'idUtente',
      },
    ];
    const columnSet = new ClassColumnSet(columns, this.tableNameVoucher);

    const queryVouchers = this.builder.insert(
      vouchers.map(vouchersToInsert => (
        { ...vouchersToInsert,
          cdDomanda: vouchersToInsert.codiceVoucher.substr(-8),
          jsonDatiVoucher: {
            [vouchersToInsert.tipoDatoBando]: vouchersToInsert.cfMinore
          },
          sostegnoEconomico: sostegnoEconomico,
          state: state,
          idUtente: idUtente,
          idFileImport
        })
        ),
      columnSet, 
    );

    return queryVouchers;
  }

  /**
   * method to format insert of voucher
   * @param {object} voucher the voucher
   * @returns {string} the query formatted
   */
   async insertSingleVoucher({voucher = {}, idUtente = null, sostegnoEconomico, state, idFileImport}) {
    const { ColumnSet: ClassColumnSet } = this.builder;

    const columns = [
      {
        name: 'id_voucher',
        mod: '^',
        def: 'nextval(\'seq_voucher\')',
      },
      {
        name: 'id_file_voucher',
        prop: 'idFileImport',
      },
      {
        name: 'id_sostegno_economico',
        prop: 'sostegnoEconomico',
      },
      {
        name: 'cd_voucher',
        prop: 'codiceVoucher',
      },
      {
        name: 'cd_bando',
        prop: 'codiceBando',
      },
      {
        name: 'cd_domanda',
        prop: 'cdDomanda',
      },
      {
        name: 'dt_inizio_val',
        prop: 'inizioValidita',
      },
      {
        name: 'dt_fine_val',
        prop: 'fineValidita',
      },
      {
        name: 'tx_nome_titolare',
        prop: 'nomeTitolare',
      },
      {
        name: 'tx_cognome_titolare',
        prop: 'cognomeTitolare',
      },
      {
        name: 'ptx_cf_titolare',
        prop: 'cfTitolare',
      },
      {
        name: 'js_dati_voucher',
        prop: 'jsonDatiVoucher',
      },
      {
        name: 'im_totale',
        prop: 'importoVoucher',
      },
      {
        name: 'cd_stato_voucher',
        prop: 'state',
      },
      {
        name: 'ts_caricamento',
        mod: '^',
        def: 'localtimestamp',
      },
      {
        name: 'id_utente_caricamento',
        prop: 'idUtente',
      },
      {
        name: 'tx_email_contatto',
        prop: 'emailContatto',
      },
      {
        name: 'tx_cell_contatto',
        prop: 'cellContatto',
      },
    ];
    const columnSet = new ClassColumnSet(columns, this.tableNameVoucher);

    let valueJsonDatiVoucher =  voucher.tipoDatoBando ? { [voucher.tipoDatoBando]: voucher.cfMinore } : null

    const queryVouchers = this.builder.insert(
        { ...voucher,
          cdDomanda: voucher.codiceVoucher.substr(-8),
          jsonDatiVoucher: valueJsonDatiVoucher,
          sostegnoEconomico: sostegnoEconomico,
          state: state,
          idUtente: idUtente,
          idFileImport
        },
      columnSet, 
    );

    return queryVouchers;
  }

  
  /**
   * method to format update of contents
   * @param {object} voucher the content
   * @returns {string} the query formatted
   */
   updateImportedVouchers( { idUtente = null, state, idImportazione } ) {
    const { ColumnSet: ClassColumnSet } = this.builder;

    const columns = [
      {
        name: 'cd_stato_voucher',
        prop: 'state',
      },
      {
        name: 'ts_attivazione',
        mod: '^',
        def: 'localtimestamp',
      },
      {
        name: 'id_utente_attivazione',
        prop: 'idUtente',
      },
    ];

    const columnSet = new ClassColumnSet(columns, this.tableNameVoucher);

    const updateQuery = this.builder.update({
                                              state: state,
                                              idUtente: idUtente,
                                            }, columnSet);

    let queryUpdate = `${updateQuery}
                       WHERE id_file_voucher = ${idImportazione}
                              and cd_stato_voucher = '${STATIVOUCHER.IMPORTATO}';
                      `
    return queryUpdate;
  }

  /**
   * method to format update of contents
   * @param {object} voucher the content
   * @returns {string} the query formatted
   */
  updateTransaction(transazioneVoucher = {}, idUtente = null) {
    const { ColumnSet: ClassColumnSet } = this.builder;
    const columns = [
      {
        name: 'cd_stato_transazione',
        prop: 'state',
      },
      {
        name: 'ts_contab',
        mod: '^',
        def: 'localtimestamp',
        skip: col => (col.source.state === STATITRANSAZIONEVOUCHER.STORNATA) || (col.value === undefined),
      },
      {
        name: 'id_utente_contab',
        prop: 'idUtente',
        skip: col => (col.source.state === STATITRANSAZIONEVOUCHER.STORNATA) || (col.value === undefined),
      },
      {
        name: 'ts_storno',
        mod: '^',
        def: 'localtimestamp',
        skip: col => (col.source.state === STATITRANSAZIONEVOUCHER.CONTABILIZZATA) || (col.value === undefined),
      },
      {
        name: 'id_utente_storno',
        prop: 'idUtente',
        skip: col => (col.source.state === STATITRANSAZIONEVOUCHER.CONTABILIZZATA) || (col.value === undefined),
      }
    ];
    const columnSet = new ClassColumnSet(columns, this.tableNameTransaction);
    const updateQuery = this.builder.update({
      state: transazioneVoucher.state,
      idUtente: idUtente,
    }, columnSet);

    let queryUpdate = `${updateQuery}
                       WHERE id_transazione_voucher in ($[idTransazioneVoucher:csv])
                              and cd_stato_transazione not in ('${STATITRANSAZIONEVOUCHER.STORNATA}', 
                                                              '${STATITRANSAZIONEVOUCHER.CONTABILIZZATA}', 
                                                              '${STATITRANSAZIONEVOUCHER.ERRORE_PAGAMENTO}');
                      `
    return queryUpdate;
  }

}
import { ApolloError } from 'apollo-server-errors';
import moment from 'moment';
import { ANNULLA_VOUCHER_ERROR, 
         CONTABILIZZA_TRANSAZIONE_VOUCHER_ERROR, 
         RIPRISTINO_VOUCHER_ERROR, 
         STORNA_TRANSAZIONE_VOUCHER_ERROR, 
         ELABORA_IMPORTAZIONE_VOUCHER_ERROR,
         CONFERMA_IMPORTAZIONE_VOUCHER_ERROR } from 'errors/errors';
import { VoucherDAO } from 'dao/voucher/voucherDAO';
import { STATIVOUCHER } from 'constants/db/statiVoucher';
import { STATITRANSAZIONEVOUCHER } from 'constants/db/statiTransazioneVoucher';
import { DOMINIO_VOUCHER } from 'constants/db/dominioVoucher';


const fs = require('fs').promises;
const excel = require('exceljs');
const csv = require('csv-parser');

/**
 * Autofit columns by width
 *
 * @param worksheet {ExcelJS.Worksheet}
 * @param minimalWidth
 */
const autoWidth = (worksheet, minimalWidth = 10) => {
  worksheet.columns.forEach((column) => {
    let maxColumnLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      maxColumnLength = Math.max(
              maxColumnLength,
              minimalWidth,
              cell.value ? cell.value.toString().length : 0
          );
    });
    column.width = maxColumnLength + 2;
  });
};

/**
 * Class domain for voucher management
 */
export class VoucherDomain {
  /**
   * The constructor of the class
   * @param {object} context the graphql object for the context
   */
  constructor(context) {
    const { user, db, logger, formatter, queryBuilder, req } = context;
    this.locale = context.locale;
    this.logger = logger;
    this.user = user;
    this.db = db;
    this.formatter = formatter;
    this.helpers = queryBuilder;

    this.idSession = req.sessionID;
  }
  

  /**
   * Function to get the list of voucher state
   * @param {object} parameters the parameters
   * @returns {object[]} the list of voucher state
   */
  async getEstraiStatiVoucher(parameters) {
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
    }});

    const voucherState = await voucherDao.getEstraiStatiVoucher({
      ty_dominio: DOMINIO_VOUCHER,
    });

    return voucherState;
  }

  /**
   * Function to get the list of voucher transaction state
   * @param {object} parameters the parameters
   * @returns {object[]} the list of voucher transaction state
   */
  async getEstraiStatiTransazioneVoucher(parameters) {
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
    }});

    const voucherTransactionState = await voucherDao.getEstraiStatiVoucher({
      ty_dominio: 'STATO_TRANS_VOUCHER',
    });
    return voucherTransactionState;
  }
   /* Function to get the list of user vouchers
   * @param {object} parameters the parameters
   * @returns {object[]} the list of voucher state
   */
  async getUserVouchers(parameters) {
    const { idRichiesta } = parameters;
    const { fiscalCode } = parameters;
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
      user: this.user,
    }});

    return await voucherDao.getUserVouchers({
      idRichiesta,
      fiscalCode,
    });
  }


  
  /**
   * Function to get the list of spstegni economici
   * @param {object} parameters the parameters
   * @returns {object[]} the list of spstegni economici
   */
  async getEstraiSostegnoEconomico(parameters) {
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
    }});

    const voucherTransactionState = await voucherDao.getEstraiSostegnoEconomico({
      ty_contenuto: {id: 17, des: 'Sostegni economici'},
      cd_stato_contenuto: {id: 2, des: 'Attivi/Pubblicati'},
    });

    return voucherTransactionState;
  }

  /**
   * Function to get the list of vouchers filtered
   * @param {object} parameters filter parameters
   * @returns {object[]} the list of vouchers
   */
  async getList(parameters) {
    const { filters = {}, page, elementsPerPage } = parameters;
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
    }});

    const offset = (page - 1) * elementsPerPage;

    const vouchers = await voucherDao.getList({
      filters,
      offset,
      elementsPerPage,
    });

    const reducedVouchers = vouchers.reduce(
      (acc, voucher) => ({
        totalRows: voucher.totalRows ? Number(voucher.totalRows) : 0,
        list: [...acc.list, voucher],
      }),
      { list: [] }
    );

    if (!reducedVouchers.totalRows) {
      reducedVouchers.totalRows = 0;
    }

    return reducedVouchers;
  }

  /**
   * Function to get the list of vouchers filtered
   * @param {object} parameters filter parameters
   * @returns {object[]} the list of vouchers
   */
  async getCitizenVoucherList(parameters) {
    const { filters = {}, page, elementsPerPage } = parameters;

    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
      idUtente: this.user?.fiscalCode,
    }});

    const offset = (page - 1) * elementsPerPage;

    const vouchers = await voucherDao.getList({
      filters,
      offset,
      elementsPerPage,
    });

    const reducedVouchers = vouchers.reduce(
      (acc, voucher) => ({
        totalRows: voucher.totalRows ? Number(voucher.totalRows) : 0,
        list: [...acc.list, voucher],
      }),
      { list: [] }
    );

    if (!reducedVouchers.totalRows) {
      reducedVouchers.totalRows = 0;
    }

    return reducedVouchers;
  }  

  /**
   * Function to get the list of all voucher transaction filtered
   * @param {object} parameters filter parameters
   * @returns {object[]} the list of voucher transaction
   */
  async getTransactionList(parameters) {
    const { filters = {}, page, elementsPerPage } = parameters;
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
    }});
  
    const offset = (page - 1) * elementsPerPage;
  
    const transactionVouchers = await voucherDao.getTransactionList({
      filters,
      offset,
      elementsPerPage,
    });
  
    const reducedTransaction = transactionVouchers.reduce(
        (acc, transaction) => ({
          totalRows: transaction.totalRows ? Number(transaction.totalRows) : 0,
          list: [...acc.list, transaction],
        }),
        { list: [] }
      );
  
    if (!reducedTransaction.totalRows) {
      reducedTransaction.totalRows = 0;
    }
  
    return reducedTransaction;
  }

  /**
   * Function to get the list of voucher transactions filtered
   * @param {object} parameters filter parameters
   * @returns {object[]} the list of voucher transactions
   */
  async downloadTransactionList(parameters) {
    const { filters = {}, page, elementsPerPage } = parameters;
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
    }});

    const offset = (page - 1) * elementsPerPage;

    const transactionVouchers = await voucherDao.getTransactionList({
      filters,
      offset,
      elementsPerPage,
    });

    // Generazione del file XLSX - deve tornare una stringa base64
    let fileXlsx64 = await this.transactionExcelFile(transactionVouchers);

    let todaDate = new Date();
    let nowDate = `${todaDate.toISOString().split('T')[0]  }_${  todaDate.toISOString().split('T')[1].split('.')[0]}`;

    let returnObj = {
      fileName: `transazioni-${nowDate}.xlsx`,
      data: `data:application/vnd.openxmlformats;base64,${fileXlsx64}`,
    };

    return returnObj;
  }

  /**
   * Function to get the list of vouchers filtered
   * @param {object} parameters filter parameters
   * @returns {object[]} the list of vouchers
   */
  async downloadVoucherList(parameters) {
    const { filters = {}, page, elementsPerPage } = parameters;
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
    }});

    const offset = (page - 1) * elementsPerPage;

    const vouchers = await voucherDao.getList({
      filters,
      offset,
      elementsPerPage,
    });

    // Generazione del file XLSX - deve tornare una stringa base64
    let fileXlsx64 = await this.voucherExcelFile(vouchers);

    let todaDate = new Date();
    let nowDate = `${todaDate.toISOString().split('T')[0]  }_${  todaDate.toISOString().split('T')[1].split('.')[0]}`;

    let returnObj = {
      fileName: `voucher-${nowDate}.xlsx`,
      data: `data:application/vnd.openxmlformats;base64,${fileXlsx64}`,
    };

    return returnObj;
  }
  
  /**
   * Function to create xlsx from transaction list object
   * @param {object} parameters transactionVouchers elenco delle transazioni
   * @param transactionVouchers
   * @returns {string} the list of voucher transaction
   */
  async transactionExcelFile(transactionVouchers) {
    let retBase64 = null;
    let bufferXlsx = null;

    let workbook = new excel.Workbook();

    let todaDate = new Date();
    let nowDate = todaDate.toISOString().split('T')[0];
  
    let worksheet = workbook.addWorksheet(`Transactions-${ nowDate }`);

    const columnHeaderAlignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    worksheet.columns = [
        { header: 'Riferimento Bando', key: 'bando', width: 10 },
        { header: 'Codice voucher', key: 'codiceVoucher', width: 13 },
        { header: 'ID Transazione', key: 'idTransazioneVoucher', width: 10 },
        { header: 'Codice Richiesta Ente', key: 'idRichiestaServizioEnte', width: 10 },
        { header: 'Ente', key: 'nomeEnte', width: 30 },
        { header: 'P.Iva/CF', key: 'cfPivaEnte', width: 20 },
        { header: 'Referente ente', key: 'nominativoTitolareEnte', width: 30 },
      { header: 'E-mail referente', key: 'mailTitolareEnte', width: 30 },
      { header: 'Telefono referente', key: 'telTitolareEnte', width: 25 },
      { header: 'IBAN', key: 'ibanEnte', width: 30 },
      { header: 'Intestatario CC', key: 'intestatarioCcEnte', width: 30 },
        { header: 'Servizio acquistato', key: 'servizioAcquistato', width: 30 },
      // { header: 'Tipologia servizio', key: 'tipoServizioAcquistato', width: 10 },
        { header: 'Importo speso', key: 'importoSpeso', width: 10, style: { numFmt: '€#,##0.00;[Red]-$#,##0.00' } },
        { header: 'Stato', key: 'state', width: 10 },
        { header: 'CF Beneficiario', key: 'cfBeneficiario', width: 20 },
        { header: 'CF Minore', key: 'cfMinore', width: 20 },
        { header: 'Data Utilizzo', key: 'dataUtilizzoVoucher', width: 12, style: { numFmt: 'dd/mm/yyyy' }},
        { header: 'Data Cont.', key: 'dataContabilizzazione', width: 12, style: { numFmt: 'dd/mm/yyyy' }},
    ];

      // Add Array Rows
    for (const transaction of transactionVouchers) {
      let arrayValue = {
        codiceVoucher: transaction.codiceVoucher,
        idTransazioneVoucher: transaction.idTransazioneVoucher,
        idRichiestaServizioEnte: transaction.idRichiestaServizioEnte,
        nomeEnte: transaction.nomeEnte,
        ibanEnte: transaction.ibanEnte,
        intestatarioCcEnte: transaction.intestatarioIbanEnte,
        cfPivaEnte: transaction.cfPivaEnte,
        nominativoTitolareEnte: transaction.nominativoTitolareEnte,
        bando: transaction.bando,
        servizioAcquistato: transaction.servizioAcquistato,
        importoSpeso: parseFloat(transaction.importoSpeso),
        state: transaction.state,
        cfBeneficiario: transaction.cfBeneficiario,
        cfMinore: transaction.cfMinore,
        dataUtilizzoVoucher: transaction.dataUtilizzoVoucher ? moment(transaction.dataUtilizzoVoucher).format('DD/MM/YYYY') : null,
        dataContabilizzazione: transaction.dataContabilizzazione ? moment(transaction.dataContabilizzazione).format('DD/MM/YYYY') : null,
        // tipoServizioAcquistato: transaction.tipoServizioAcquistato
      };
      arrayValue.mailTitolareEnte = !transaction.mailTitolareEnte ? transaction.mailSecondariaTitolareEnte : transaction.mailSecondariaTitolareEnte ? `${transaction.mailTitolareEnte  }, ${  transaction.mailSecondariaTitolareEnte}` : transaction.mailTitolareEnte;
      arrayValue.telTitolareEnte = !transaction.telTitolareEnte ? transaction.telSecondarioTitolareEnte : transaction.telSecondarioTitolareEnte ? `${transaction.telTitolareEnte  }, ${  transaction.telSecondarioTitolareEnte}` : transaction.telTitolareEnte;
      worksheet.addRows([arrayValue], 'i');
    }

    autoWidth(worksheet);

    bufferXlsx = await workbook.xlsx.writeBuffer();
    retBase64 = bufferXlsx.toString('base64');

    return retBase64;
  }
  

  /**
   * Function to create xlsx from vochers list object
   * @param {object} parameters elenco dei vouchers
   * @param vouchers
   * @returns {string} the list of vouchers
   */
  async voucherExcelFile(vouchers) {
    let retBase64 = null;
    let bufferXlsx = null;

    let workbook = new excel.Workbook();

    let todaDate = new Date();
    let nowDate = todaDate.toISOString().split('T')[0];
  
    let worksheet = workbook.addWorksheet(`Vouchers-${ nowDate }`);
    worksheet.columns = [
        { header: 'Inizio validità', key: 'inizioValidita', width: 12, style: { numFmt: 'dd/mm/yyyy' } },
        { header: 'Fine validità', key: 'fineValidita', width: 12 },
        { header: 'Stato', key: 'state', width: 10 },
        { header: 'Riferimento bando', key: 'bando', width: 10 },
        { header: 'Codice voucher', key: 'code', width: 15 },
        { header: 'Cognome intestatario', key: 'cognomeTitolare', width: 30 },
        { header: 'Nome interstatario', key: 'nomeTitolare', width: 30 },
        { header: 'CF Beneficiario', key: 'cfIntestatario', width: 20 },
        { header: 'CF Minore', key: 'cfMinore', width: 20 },
        { header: 'Importo totale', key: 'totalImport', width: 10, style: { numFmt: '€#,##0.00;[Red]-$#,##0.00' } },
        { header: 'Importo residuo', key: 'remainingImport', width: 10, style: { numFmt: '€#,##0.00;[Red]-$#,##0.00' } },
        { header: 'Importo contabilizzato', key: 'countedImport', width: 10, style: { numFmt: '€#,##0.00;[Red]-$#,##0.00' } },
        { header: 'Descrizione del Sostegno economico', key: 'descrizioneSostegnoEconomico', width: 15 },
        { header: 'E-MAIL contatto', key: 'emailContatto', width: 15},
        { header: 'Cellulare contatto', key: 'cellContatto', width: 10},

    ];

      // Add Array Rows
    for (const voucher of vouchers) {
      let arrayValue = {
        inizioValidita: voucher.inizioValidita ? moment(voucher.inizioValidita).format('DD/MM/YYYY') : null,
        fineValidita: voucher.fineValidita ? moment(voucher.fineValidita).format('DD/MM/YYYY') : null,
        state: voucher.state,
        bando: voucher.bando,
        code: voucher.code,
        cognomeTitolare: voucher.cognomeTitolare,
        nomeTitolare: voucher.nomeTitolare,
        cfIntestatario: voucher.cfIntestatario,
        cfMinore: voucher.cfMinore,
        totalImport: parseFloat(voucher.totalImport),
        remainingImport: parseFloat(voucher.remainingImport),
        countedImport: parseFloat(voucher.countedImport),
        descrizioneSostegnoEconomico: voucher.descrizioneSostegnoEconomico,
        emailContatto: voucher.emailContatto,
        cellContatto: voucher.cellContatto,
      };
      worksheet.addRows([arrayValue], 'i');
    }

    autoWidth(worksheet);

    bufferXlsx = await workbook.xlsx.writeBuffer();
    retBase64 = bufferXlsx.toString('base64');

    return retBase64;
  }
  
  /**
   * Function to get the list of all voucher transaction filtered
   * @param {object} parameters filter parameters
   * @returns {object[]} the list of voucher transaction
   */
  async getCitizenVoucherTransactionsList(parameters) {
    const { filters = {}, page, elementsPerPage } = parameters;
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
      idUtente: this.user?.fiscalCode,
    }});

    const offset = (page - 1) * elementsPerPage;

    const transactionVouchers = await voucherDao.getTransactionList({
      filters,
      offset,
      elementsPerPage,
    });

    const reducedTransaction = transactionVouchers.reduce(
      (acc, transaction) => ({
        totalRows: transaction.totalRows ? Number(transaction.totalRows) : 0,
        list: [...acc.list, transaction],
      }),
      { list: [] }
    );

    if (!reducedTransaction.totalRows) {
      reducedTransaction.totalRows = 0;
    }

    return reducedTransaction;
  }
    
  /**
   * Function to annul the voucher
   * @param {number} id the content identifier
   * @param idVoucher
   * @returns {*} the result
   */
  annullaVoucher(idVoucher) {
    try {
      const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, builder: this.helpers, contextInformation: {
        locale: this.locale,
        logger: this.logger,
      } });
      return voucherDao.annullaVoucher(
        { idVoucher, state: STATIVOUCHER.ANNULLATO },
        this.user?.idUtente
      );
    } catch (error) {
      this.logger.error(error, 'Errore annullaVoucher');
      throw new ApolloError(ANNULLA_VOUCHER_ERROR.message, ANNULLA_VOUCHER_ERROR.code);
    }
  }

    /**
     * Function to set the voucher timestamp
     * @param {object} parameters the id of the request
     * @returns {*} the result
     */
  setVoucherTimestamp(parameters) {
    const { idRichiesta } = parameters;
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
      user: this.user,
    }});
    return voucherDao.setTimeStampVoucher({ idRichiesta });
  }

   /**
    * Function to insert voucher transaction
    * @param {object} voucher the voucher json
    * @param {number} idInternoTrans the id interno trans
    * @returns {*} the result
    */
  async insertVoucherTransaction(voucher = {}, idInternoTrans) {
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
      user: this.user,
    }});
    return await voucherDao.insertVoucherTransaction({...voucher, idInternoTrans});
  }

   /**
    * Function to divert voucher transaction
    * @param idInternoTrans
    * @param idUtente
    * @returns {*} the result
    */
  async divertVoucherTransaction (idInternoTrans, idUtente){
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
      user: this.user,
    }});
    return await voucherDao.divertVoucherTransaction(idInternoTrans, idUtente);
  }

  /**
   * Function to annul the voucher
   * @param {number} id the content identifier
   * @param idVoucher
   * @returns {*} the result
   */
  ripristinoVoucher(idVoucher) {
    try {
      const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, builder: this.helpers, contextInformation: {
        locale: this.locale,
      } });
      return voucherDao.ripristinoVoucher(
          { idVoucher, state: STATIVOUCHER.ATTIVO },
          this.user?.idUtente
        );
    } catch (error) {
      this.logger.error(error, 'Errore ripristinoVoucher');
      throw new ApolloError(RIPRISTINO_VOUCHER_ERROR.message, RIPRISTINO_VOUCHER_ERROR.code);
    }
  }

  /**
   * Function to contabilizza transazione voucher
   * @param {number} id the content identifier
   * @param idTransazioneVoucher
   * @returns {*} the result
   */
  contabilizzaTransazioneVoucher(idTransazioneVoucher) {
    try {
      const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, builder: this.helpers, contextInformation: {
        locale: this.locale,
      } });
      return voucherDao.contabilizzaTransazioneVoucher(
        { idTransazioneVoucher, state: STATITRANSAZIONEVOUCHER.CONTABILIZZATA },
        this.user?.idUtente
      );
    } catch (error) {
      this.logger.error(error, 'Errore contabilizzaTransazioneVoucher');
      throw new ApolloError(CONTABILIZZA_TRANSAZIONE_VOUCHER_ERROR.message, CONTABILIZZA_TRANSAZIONE_VOUCHER_ERROR.code);
    }
  }

  /**
   * Function to contabilizza transazione voucher
   * @param {number} id the content identifier
   * @param idTransazioneVoucher
   * @returns {*} the result
   */
  stornoTransazioneVoucher(idTransazioneVoucher) {
    try {
      const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, builder: this.helpers, contextInformation: {
        locale: this.locale,
      } });
      return voucherDao.stornoTransazioneVoucher(
        { idTransazioneVoucher, state: STATITRANSAZIONEVOUCHER.STORNATA },
        this.user?.idUtente
      );
    } catch (error) {
      this.logger.error(error, 'Errore stornoTransazioneVoucher');
      throw new ApolloError(STORNA_TRANSAZIONE_VOUCHER_ERROR.message, STORNA_TRANSAZIONE_VOUCHER_ERROR.code);
    }
  }

  /**
   * Function to contabilizza transazione voucher
   * @param {number} id the content identifier
   * @param parametrValue
   * @returns {*} the result
   */
  async elaboraVouchers(parametrValue) {
    try {
      let idRet = null;
      const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, builder: this.helpers, contextInformation: {
        locale: this.locale,
      } });

      const [fileExtension, fileURI] = parametrValue.media.oj_media.split(';base64,');

      const fileBuffer = Buffer.from(fileURI, 'base64');

      idRet = await voucherDao.elaboraVouchers(
        { fileBuffer, state: STATIVOUCHER.IMPORTATO, fileName: parametrValue.media.nm_nome_media, sostegnoEconomico: parametrValue.sostegnoEconomico },
        this.user?.idUtente
      );

      return idRet;

    } catch (error) {
      this.logger.error(error, 'Errore elaboraVouchers');
      throw new ApolloError(ELABORA_IMPORTAZIONE_VOUCHER_ERROR.message, ELABORA_IMPORTAZIONE_VOUCHER_ERROR.code);
    }
  }

  /**
   * Function to conferma importazione voucher
   * @param {number} id the content identifier
   * @param parametrValue
   * @returns {*} the result
   */
  async uploadVouchers(parametrValue) {
    try {
      const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, builder: this.helpers, contextInformation: {
        locale: this.locale,
      } });

      const { idImportazione } = parametrValue;

      return await voucherDao.uploadVouchers(
        { state: STATIVOUCHER.ATTIVO, idImportazione: idImportazione },
        this.user?.idUtente
      );
    } catch (error) {
      this.logger.error(error, 'Errore uploadVouchers');
      throw new ApolloError(CONFERMA_IMPORTAZIONE_VOUCHER_ERROR.message, CONFERMA_IMPORTAZIONE_VOUCHER_ERROR.code);
    }
  }


  /**
   * the method to get the voucher
   * @param {number} id the identifier
   * @returns {object} the voucher
   */
  async get(id) {
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
    } });
    return await voucherDao.getById(id);
  }

  /**
   * the method to get a transaction
   * @param {number} id the identifier
   * @returns {object} the transaction
   */
  async getTransaction(id) {
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
    } });
    return await voucherDao.getTransactionById(id);
  }

  /**
   * the method to get vouchers
   * @param {number} args the args
   * @returns {object} the transaction
   */
  async getVoucherByIdRichiesta(args) {
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter, contextInformation: {
      locale: this.locale,
    } });
    return await voucherDao.getVoucherByIdRichiesta(args);
  }

  /**
   * the method to get the voucher
   * @param {number} type the type
   * @returns {object} the voucher
   */
  getMaxOrder(type) {
    const voucherDao = new VoucherDAO({ db: this.db, formatter: this.formatter });
    return voucherDao.getMaxOrderByType(type);
  }

  /**
   * Function to check if user has vouchers
   * @param
   * @param params
   * @returns {*} the result
   */
  async hasCitizenVoucher(params) {
    const voucher = await this.getCitizenVoucherList(params);

    return voucher.totalRows > 0;
  }
  
  /**
   * Function to check if user has vouchers
   * @param
   * @param params
   * @returns {*} the result
   */
  async hasTransactionsCont(params) {
    const transactions = await this.getTransactionList(params);

    return transactions.totalRows > 0;
  }

  async hasVouchersCont(params) {
    const transactions = await this.getList(params);

    return transactions.totalRows > 0;
  }

  /**
   * Function to publish a voucher
   * @param {number} id the voucher identifier
   * @returns {*} the result
   */
  async exist(id) {
    const voucher = await this.get(id);
    if(!voucher){
      return false;
    }
    return true;
  }

}

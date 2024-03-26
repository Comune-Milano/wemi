import { ApolloError } from 'apollo-server-errors';
import { VoucherFormatter } from './formatter';
import { fiscalCodeRegex } from './regex';
import { MotiviRow } from './motivo';
import { fieldsPosition } from './fieldsPosition';
import {  ANNULLA_VOUCHER_ERROR, 
          RIPRISTINO_VOUCHER_ERROR, 
          CONTABILIZZA_TRANSAZIONE_VOUCHER_ERROR, 
          STORNA_TRANSAZIONE_VOUCHER_ERROR, 
          INSERT_TRANSACTION_ERROR,
          ELABORA_IMPORTAZIONE_VOUCHER_ERROR,
          CONFERMA_IMPORTAZIONE_VOUCHER_ERROR } from 'errors/errors';
import {
  selectTransactionById,
  selectVoucherById,
  selectMaxOrder,
  selectFileVoucherSeq,
  selectTipoDescrVoucher,
  selectUserVoucher,
  updateTimestamp,
  insertVoucherTransaction,
  divertVoucherTransactions,
  selectVoucherByIdRichiesta,
} from 'sql/voucher/selezione';
import {
  eliminaVoucherNonConfermati,
} from 'sql/voucher/delete';

import { logger } from 'utility/logger/getInstance';

import tabelle from 'tabelle';



/**
 * Class for the table voucher
 */
export class VoucherDAO {
  /**
   * The constructor of the class
   * @param {*} parameters db object, formatter, builder, context information
   */
  constructor(parameters) {
    this.connection = parameters.db;
    this.db = parameters.db;
    this.formatter = parameters.formatter;
    this.locale = parameters.contextInformation?.locale;
    this.idUtente = parameters.contextInformation.idUtente;
    this.user = parameters.contextInformation.user;
    this.logger = parameters.contextInformation.logger;
    this.builder = parameters.builder;
    this.voucherFormatter = new VoucherFormatter(this.builder, this.formatter);
    this.tableName = {
      table: tabelle.voucher,
    };
    this.motivi = [];
  }

  /**
   * Gets the max order visualization
   * @param {number} type the type of the content
   * @returns {object} the privacy content
   */
  getMaxOrderByType(type) {
    return this.connection.oneOrNone(selectMaxOrder, { type });
  }

  /**
   * The method to find the voucher information by id
   * @param {number} idVoucher the id of the voucher
   * @returns {object} of voucher
   */
  async getById(idVoucher) {
    const vouchers = await this.connection.oneOrNone(selectVoucherById, { idVoucher, locale: this.locale });
    
    return vouchers;
  }

  /**
   * The method to find the voucher
   * @param args the id and amount people
   * @returns {object} of voucher
   */
  async getVoucherByIdRichiesta(args) {
    const voucher = await this.connection.oneOrNone(selectVoucherByIdRichiesta, { ...args, locale: this.locale });
    
    return voucher;
  }

  /**
   * The method to find the transaction information by id
   * @param {number} idVoucher the id of the voucher
   * @param idTransaction
   * @returns {object} of voucher
   */
  async getTransactionById(idTransaction) {
    const transaction = await this.connection.oneOrNone(selectTransactionById, { idTransaction, locale: this.locale });
    
    return transaction;
  }

  /**
   * The method to find the voucher information list by type
   * @param {number} typeVoucher the type of the voucher
   * @param {object} parameters parameters
   * @returns {object[]} of voucher
   */
  getListByType(typeVoucher, parameters = {}) {
    const formattedSelectList = this.voucherFormatter.getList(parameters, this.locale);
    return this.connection.any(formattedSelectList, { ...parameters, typeVoucher, locale: this.locale });
  }

  /**
   * The method to find the list of vouche usable by yser
   * @param {object} parameters parameters
   * @returns {object[]} of voucher
   */
  getUserVouchers(parameters = {}) {
    return this.connection.any(selectUserVoucher, { idRichiesta: parameters.idRichiesta, codiceFiscale: parameters.fiscalCode });
  }

   /** The method to find the voucher information list
    * @param {object} parameters parameters
    * @returns {object[]} of voucher
    */
  async getList(parameters = {}) {
    let {idUtente} = this;
    const formattedSelectList = this.voucherFormatter.getList(parameters, this.locale, idUtente );

    const vouchers = await this.connection.any(formattedSelectList, { ...parameters, locale: this.locale });
    return vouchers;
  }

  /**
   * The method to find the voucher transaction information list
   * @param {object} parameters parameters
   * @returns {object[]} of voucher
   */
  getTransactionList(parameters = {}) {
    let {idUtente} = this;
    const formattedSelectList = this.voucherFormatter.getTransactionList(parameters, this.locale, idUtente);
    return this.connection.any(formattedSelectList, { ...parameters, locale: this.locale });
  }

  /**
   * The method to find voucher state
   * @param {object} parameters parameters
   * @returns {object[]} of voucher state
   */
  getEstraiStatiVoucher(parameters = {}) {
    const formattedSelectList = this.voucherFormatter.getEstraiStatiVoucher(parameters, this.locale);
    return this.connection.any(formattedSelectList, { ...parameters, locale: this.locale });
  }

  
  /**
   * The method to find sostegni economici
   * @param {object} parameters parameters
   * @returns {object[]} of sostegni economici
   */
  getEstraiSostegnoEconomico(parameters = {}) {
    const formattedSelectList = this.voucherFormatter.getEstraiSostegnoEconomico(parameters, this.locale);
    return this.connection.any(formattedSelectList, { ...parameters, locale: this.locale });
  }

  /**
   * The method to annul the voucher by identifier
   * @param {object} voucher the object with id identifier
   * @param idUtente
   * @returns {*} of content
   */
  async annullaVoucher(voucher = {}, idUtente) {
    let idRet = null;
    try {
      const { idVoucher } = voucher;
      const updateQuery = this.voucherFormatter.update(voucher, idUtente);
      idRet = await this.connection.none(updateQuery, { idVoucher: idVoucher.id });
      this.logger.info('annullaVoucher DAO', idRet); 
    } catch (error) {
      // this.context.logger.error(error, "Errore annullaVoucher");
      this.logger.error('Errore su annullo voucher', error);
      throw new ApolloError(ANNULLA_VOUCHER_ERROR.message, ANNULLA_VOUCHER_ERROR.code);
    }
    return idRet;
  }

  /**
   * The method to annul the voucher by identifier
   * @param {object} voucher the object with id identifier
   * @param {number} idInternoTrans the id of transaction
   * @returns {*} of content
   */
  insertVoucherTransaction(voucher = {}) {
    try {
      return this.connection.none(insertVoucherTransaction, voucher);
    } catch (error) {
      throw new ApolloError(INSERT_TRANSACTION_ERROR.message, INSERT_TRANSACTION_ERROR.code);
    }
  };
  /**
   * Function to insert voucher transaction
   * @param {number} idInternoTrans the id of transaction
   * @param idUtente id of the user
   * @returns {*} of content
   */
  divertVoucherTransaction(idInternoTrans, idUtente){
    try {
      return this.connection.none(divertVoucherTransactions, {idInternoTrans, idUtente});
    } catch (error) {
      throw new ApolloError(ANNULLA_VOUCHER_ERROR.message, ANNULLA_VOUCHER_ERROR.code);
    }
  }

  /**
   * The method to annul the voucher by identifier
   * @param {object} parameters  the id of the request
   * @returns {*} of content
   */
  async setTimeStampVoucher(parameters) {
    const availableVouchers = await this.connection.any(selectUserVoucher, { idRichiesta: parameters.idRichiesta, codiceFiscale: this.user.fiscalCode });
    if(Array.isArray(availableVouchers) && availableVouchers.length){
      const idVouchers = availableVouchers.map(x => x.idVoucher);
      return await this.connection.any(updateTimestamp, { idVouchers });
    }
  }

    /**
     * The method to annul the voucher by identifier
     * @param {object} voucher the object with id identifier
     * @param idUtente
     * @returns {*} of content
     */
  async ripristinoVoucher(voucher = {}, idUtente) {
    let idRet = null;
    try {
      const { idVoucher } = voucher;
      const updateQuery = this.voucherFormatter.update(voucher, idUtente);
      let idRet = await this.connection.none(updateQuery, { idVoucher: idVoucher.id });

    } catch (error) {
      throw new ApolloError(RIPRISTINO_VOUCHER_ERROR.message, RIPRISTINO_VOUCHER_ERROR.code);
    }
    return idRet;
  }

  /**
   * The method contabilizza transazione voucher by identifier
   * @param {object} voucher the object with id identifier
   * @param transazioneVoucher
   * @param idUtente
   * @returns {*} of content
   */
  async contabilizzaTransazioneVoucher(transazioneVoucher = {}, idUtente) {
    let idRet = null;
    try {
      const { idTransazioneVoucher } = transazioneVoucher;
      const updateQuery = this.voucherFormatter.updateTransaction(transazioneVoucher, idUtente);
      let idRet = await this.connection.none(updateQuery, { idTransazioneVoucher: idTransazioneVoucher.id });

    } catch (error) {
      throw new ApolloError(CONTABILIZZA_TRANSAZIONE_VOUCHER_ERROR.message, CONTABILIZZA_TRANSAZIONE_VOUCHER_ERROR.code);
    }
    return idRet;
  }

  /**
   * The method contabilizza transazione voucher by identifier
   * @param {object} voucher the object with id identifier
   * @param transazioneVoucher
   * @param idUtente
   * @returns {*} of content
   */
  async stornoTransazioneVoucher(transazioneVoucher = {}, idUtente) {
    let idRet = null;
    try {
      const { idTransazioneVoucher } = transazioneVoucher;
      const updateQuery = this.voucherFormatter.updateTransaction(transazioneVoucher, idUtente);
      let idRet = await this.connection.none(updateQuery, { idTransazioneVoucher: idTransazioneVoucher.id });

    } catch (error) {
      throw new ApolloError(STORNA_TRANSAZIONE_VOUCHER_ERROR.message, STORNA_TRANSAZIONE_VOUCHER_ERROR.code);
    }
    return idRet;
  }

  /**
   * The method contabilizza transazione voucher by identifier
   * @param {object} voucher the object with id identifier
   * @param voucherParameters
   * @param idUtente
   * @returns {*} of content
   */
  async elaboraVouchers(voucherParameters = {}, idUtente) {
    let idRet = null;
    let idFileImportazione = null;
    let importoTotale = 0;
    let linesCsv = null;
    try {
      const { fileBuffer, fileName, state, sostegnoEconomico } = voucherParameters;

      // Carica "netval" per file.
      let validVouchers = [];

      await this.db.tx(async (transaction) => {

        const nextFileImport = await transaction.oneOrNone(selectFileVoucherSeq);
      
        idFileImportazione = parseInt(nextFileImport.nextval);
  
        // Azzera orfanelli importazione, generali del giorno prima e qualsiasi della sessione corrente.
        const dbResult = await transaction.none(eliminaVoucherNonConfermati, { state: state.toString(), idUtente: idUtente });
  
        const csvFile = fileBuffer.toString();
        linesCsv = csvFile ? csvFile.split(/\r?\n/) : [];
  
        if (linesCsv.length > 0) {
  
          let arrayDuplicateValues = this.getDuplicateVlues(linesCsv);
          if (arrayDuplicateValues?.length > 0) {
            this.motivi.push({id: 'notUniqueValues', motivo: `Nel file di importazione sono presenti record duplicati per codice voucher. (${arrayDuplicateValues.join(' - ')})`, row: -1});
          }
  
          for (const line in linesCsv) {
            let valuesCsvLine = linesCsv[line].split(';');
            let voucher = null;
            if (parseInt(line) + 1 === linesCsv.length && linesCsv[line] === '') {
              // Ultima riga
            } else {
              voucher = await this.voucherValidRow(valuesCsvLine, parseInt(line) + 1, transaction );
            }
            if (this.motivi.length === 0) {
              if (voucher) {
                validVouchers.push(voucher);
                importoTotale += parseFloat(valuesCsvLine[fieldsPosition.importoVoucher]);
              }
            }
          }
    
        } else {
          this.motivi.push({id: 'numRecord', motivo: `Nessun record presente nel file caricato (${fileName})`, row: -1});
        }
      });


      if (this.motivi.length === 0) {
        for (const idVoucher in validVouchers) {
          const insertVoucher = await this.voucherFormatter.insertSingleVoucher({voucher: validVouchers[idVoucher], idUtente, sostegnoEconomico, state, idFileImport: idFileImportazione});
          await this.db.tx(async (transactInsert) => {
            try {
              await transactInsert.none(insertVoucher);
            } catch (errInsert) {
              switch (errInsert.code) {
                case '23505':  // unique_violation
                  this.motivi.push({id: 'uniqueViolation', motivo: `Il voucher "${validVouchers[idVoucher].codiceVoucher}" è già presente sul database.(${errInsert.detail})`, row: parseInt(idVoucher) + 1});
                  break;

                default:
                  this.motivi.push({id: 'dbViolation', motivo: `Errore nell'inserimento del voucher "${validVouchers[idVoucher].codiceVoucher}".(${errInsert.message})`, row: parseInt(idVoucher) + 1});
              }
            }
          });

        }

        if (this.motivi.length === 0) {
          idRet = {
            idImportazione: idFileImportazione,
            esito: true,
            numeroVoucher: validVouchers.length,
            importoTotale: importoTotale,
            motivi: [],
          };
        } else {
          idRet = {
            idImportazione: idFileImportazione,
            esito: false,
            numeroVoucher: Array.isArray(validVouchers) ?  validVouchers.length : 0,
            importoTotale: importoTotale,
            motivi: this.motivi,
          };
        }
  
      } else {
        idRet = {
          idImportazione: idFileImportazione,
          esito: false,
          numeroVoucher: Array.isArray(validVouchers) ?  validVouchers.length : 0,
          importoTotale: importoTotale,
          motivi: this.motivi,
        };
      }

    } catch (error) {
      switch (error.code) {
        case '23505':  // unique_violation
          this.motivi.push({id: 'unique_violation', motivo: `Sono presenti delle chiavi nei voucher che si sta importando.(${error.detail})`, row: -1});
          idRet = {
            idImportazione: idFileImportazione,
            esito: false,
            numeroVoucher: Array.isArray(linesCsv) ?  linesCsv.length : 0,
            importoTotale: importoTotale,
            motivi: this.motivi,
          };
          break;
        default:
          throw new ApolloError(ELABORA_IMPORTAZIONE_VOUCHER_ERROR.message, ELABORA_IMPORTAZIONE_VOUCHER_ERROR.code);  
      }

    }

    return idRet;
  }

  
  /**
   * The method conferma importazione voucher
   * @param {object} voucher the object with id identifier
   * @param voucherParameters
   * @param idUtente
   * @returns {*} of content
   */
  async uploadVouchers(voucherParameters = {}, idUtente) {
    let idRet = null;
    try {
      const { state, idImportazione } = voucherParameters;

      const updateVouchers = this.voucherFormatter.updateImportedVouchers({ idUtente, state, idImportazione: idImportazione });

      idRet = await this.connection.none( updateVouchers );

    } catch (error) {
      throw new ApolloError(CONFERMA_IMPORTAZIONE_VOUCHER_ERROR.message, CONFERMA_IMPORTAZIONE_VOUCHER_ERROR.code);
    }
    return idRet;
  }

  /**
   * Verifica validità riga voucher CSV
   * @param {object} voucher the object with id identifier
   * @param valuesCsvLine
   * @param lineNumber
   * @param transaction
   * @returns {*} of content
   */
  async voucherValidRow(valuesCsvLine, lineNumber, transaction) {
    let voucher = {};
    let testDateInizio = null;
    let testDateFine = null;

    let motiviRow = new MotiviRow(lineNumber);

    // Rimuovo spazi a inizio e fine di ogni campo.
    valuesCsvLine.forEach((value, index) => valuesCsvLine[index] = value.trim());
    
    // controlli generali sulla riga
    if (valuesCsvLine.length != 12) {
      motiviRow.add({id: 'numField', motivo: `Numero campi non valido per il record ${lineNumber} (${valuesCsvLine.length})`});
    } else {
      // CODICE VOUCHER: Campo obbligatorio
      if (valuesCsvLine[fieldsPosition.codiceVoucher] === '') {
        motiviRow.add({id: 'codVouReq', motivo: 'Codice Voucher obbligatorio.', col: fieldsPosition.codiceVoucher});
      } else if (valuesCsvLine[fieldsPosition.codiceVoucher].length > 255) {
        motiviRow.add({id: 'codVouReqNotValid', motivo: 'Codice Voucher troppo lungo.', col: fieldsPosition.codiceVoucher});
      }

      // CODICE BANDO: Campo obbligatorio
      if (valuesCsvLine[fieldsPosition.codiceBando] === '') {
        motiviRow.add({id: 'codBanReq', motivo: 'Codice Bando obbligatorio.', col: fieldsPosition.codiceBando});
      } else if (valuesCsvLine[fieldsPosition.codiceBando].length > 255) {
        motiviRow.add({id: 'codBanNotValid', motivo: 'Codice Bando troppo lungo.', col: fieldsPosition.codiceBando});
      }

      // DATA INIZIO VALIDITA': non obbligatorio
      let espressioneData = /^([0-2][0-9]|(3)[0-1])([\-/])(((0)[0-9])|((1)[0-2]))([\-/])\d{4}$/;
      if (valuesCsvLine[fieldsPosition.inizioValidita] === '') {
        // OK la data può essere vuota
        valuesCsvLine[fieldsPosition.inizioValidita] = null;
      } else if (espressioneData.test(valuesCsvLine[fieldsPosition.inizioValidita])) {
        valuesCsvLine[fieldsPosition.inizioValidita] = `${valuesCsvLine[fieldsPosition.inizioValidita].substr(-4)  
                                                        }-${  valuesCsvLine[fieldsPosition.inizioValidita].substr(3,2) 
                                                        }-${  valuesCsvLine[fieldsPosition.inizioValidita].substr(0,2)}`;

        testDateInizio = Date.parse(valuesCsvLine[fieldsPosition.inizioValidita]);
        if (isNaN(testDateInizio)) {
          motiviRow.add({id: 'dataNotValid', motivo: `Data inizio validità non valida. (${valuesCsvLine[fieldsPosition.inizioValidita]})`, col: fieldsPosition.inizioValidita});
        }
      } else {
        motiviRow.add({id: 'dataNotValid', motivo: `Data inizio validità non valida. (${valuesCsvLine[fieldsPosition.inizioValidita]})`, col: fieldsPosition.inizioValidita});
      }

      // DATA FINE VALIDITA': non obbligatorio
      if (valuesCsvLine[fieldsPosition.fineValidita] === '') {
        // OK la data può essere vuota
        valuesCsvLine[fieldsPosition.fineValidita] = null;
      } else if (espressioneData.test(valuesCsvLine[fieldsPosition.fineValidita])) {
        valuesCsvLine[fieldsPosition.fineValidita] = `${valuesCsvLine[fieldsPosition.fineValidita].substr(-4)  
                                                      }-${  valuesCsvLine[fieldsPosition.fineValidita].substr(3,2) 
                                                      }-${  valuesCsvLine[fieldsPosition.fineValidita].substr(0,2)}`;

        testDateFine = Date.parse(valuesCsvLine[fieldsPosition.fineValidita]);
        if (isNaN(testDateFine)) {
          motiviRow.add({id: 'dataNotValid', motivo: `Data fine validità non valida. (${valuesCsvLine[fieldsPosition.fineValidita]})`, col: fieldsPosition.fineValidita});
        } else if (testDateInizio > testDateFine ) {
          motiviRow.add({id: 'dataFineNotValid', motivo: `Data inizio maggiore della data fine validità. (${valuesCsvLine[fieldsPosition.inizioValidita]} - ${valuesCsvLine[fieldsPosition.fineValidita]})`, col: fieldsPosition.fineValidita});
        }
      } else {
        motiviRow.add({id: 'dataNotValid', motivo: `Data fine validità non valida. (${valuesCsvLine[fieldsPosition.fineValidita]})`, col: fieldsPosition.fineValidita});
      }

      // CODICE FISCALE TITOLARE: obbligatorio
      if (valuesCsvLine[fieldsPosition.cfTitolare] === '') {
        motiviRow.add({id: 'cfTitReq', motivo: 'Codice fiscale del titolare obbligatorio.', col: fieldsPosition.cfTitolare});
      } else if (!fiscalCodeRegex.test(valuesCsvLine[fieldsPosition.cfTitolare])) {
        motiviRow.add({id: 'cfTitInv', motivo: `Codice fiscale del titolare non valido (${valuesCsvLine[fieldsPosition.cfTitolare]}).`, col: fieldsPosition.cfTitolare});
      }

      // IMPORTO VOUCHER: maggiorne di zero.
      let espressioneImporto = /^[0-9]+(,|.)[0-9]{1,2}$/;
      let espressioneImporto2 = /^[0-9]+$/;
      let importoIsOk = true;
      valuesCsvLine[fieldsPosition.importoVoucher] = valuesCsvLine[fieldsPosition.importoVoucher].replace(',', '.');

      if (!espressioneImporto.test(valuesCsvLine[fieldsPosition.importoVoucher])) {
        // Non ha la virgola, verifica se solo numeri.
        if (!espressioneImporto2.test(valuesCsvLine[fieldsPosition.importoVoucher])) {
          motiviRow.add({id: 'numberFormatError', motivo: `Importo del voucher non corretto, sono consentiti solo numeri e, se presente la ",", 2 numeri decimali. (${valuesCsvLine[fieldsPosition.importoVoucher]})`, col: fieldsPosition.importoVoucher});
          importoIsOk = false;
        }
      }

      if (importoIsOk && parseFloat(valuesCsvLine[fieldsPosition.importoVoucher]) <= 0) {
        motiviRow.add({id: 'importoError', motivo: `Importo del voucher non corretto, sono consentiti importi maggiori di "0". (${valuesCsvLine[fieldsPosition.importoVoucher]})`, col: fieldsPosition.importoVoucher});
      }

      // TIPO BANDO
      let seTipoDescrVoucher = null;
      if (valuesCsvLine[fieldsPosition.tipoDatoBando] !== '') {
        seTipoDescrVoucher = await transaction.oneOrNone(selectTipoDescrVoucher, {cd_dominio: valuesCsvLine[fieldsPosition.tipoDatoBando]});
        if (seTipoDescrVoucher?.esiste === 1) {
          // OK - il valore è quello corretto. Posso aggiornare il dato.
        } else {
          motiviRow.add({id: 'tipoBandoNotValid', motivo: `Tipo dato non valido. (${valuesCsvLine[fieldsPosition.tipoDatoBando]})`, col: fieldsPosition.tipoDatoBando});
        }
      } else valuesCsvLine[fieldsPosition.tipoDatoBando] = null;

      // CF MINORE
      if (seTipoDescrVoucher?.esiste === 1 && valuesCsvLine[fieldsPosition.cfMinore] !== '') {
        // OK - sono valorizzati entrambi devo controllare il CF
        if (!fiscalCodeRegex.test(valuesCsvLine[fieldsPosition.cfMinore])) motiviRow.add({id: 'cfMinoreNotValid', motivo: `Il cfMinore spcificato non è valido (${valuesCsvLine[fieldsPosition.cfMinore]})`, col: fieldsPosition.cfMinore});
      } else if (seTipoDescrVoucher?.esiste === 1 && valuesCsvLine[fieldsPosition.cfMinore] === '') {
        valuesCsvLine[fieldsPosition.cfMinore] = null;
        motiviRow.add({id: 'cfMinoreEmpty', motivo: `cfMinore non specificato con tipo dato valorizzato (${valuesCsvLine[fieldsPosition.tipoDatoBando]})`, col: fieldsPosition.cfMinore});
      } else if (valuesCsvLine[fieldsPosition.tipoDatoBando] === null && valuesCsvLine[fieldsPosition.cfMinore] !== '') {
        motiviRow.add({id: 'tipoBandoEmpty', motivo: 'Tipo dato e Dato devono essere entrambi presenti o assenti.', col: fieldsPosition.cfMinore});
        valuesCsvLine[fieldsPosition.cfMinore] = null;
      }

      // E-MAIL DI CONTATTO: non obbligatorio
      if (valuesCsvLine[fieldsPosition.emailContatto] === '') {
        valuesCsvLine[fieldsPosition.emailContatto] = null;
      }

      // CELLULARE DI CONTATTO: non obbligatorio
      if (valuesCsvLine[fieldsPosition.cellContatto] === '') {
        valuesCsvLine[fieldsPosition.cellContatto] = null;
      }
    }

    this.motivi.push(...motiviRow.getMotivi());

    if (this.motivi.length === 0) {
      voucher.codiceVoucher = valuesCsvLine[fieldsPosition.codiceVoucher].substr(0,255);
      voucher.codiceBando = valuesCsvLine[fieldsPosition.codiceBando].substr(0,255);
      voucher.inizioValidita = valuesCsvLine[fieldsPosition.inizioValidita];
      voucher.fineValidita = valuesCsvLine[fieldsPosition.fineValidita];
      voucher.nomeTitolare = valuesCsvLine[fieldsPosition.nomeTitolare].substr(0,100);
      voucher.cognomeTitolare = valuesCsvLine[fieldsPosition.cognomeTitolare].substr(0,100);
      voucher.cfTitolare = valuesCsvLine[fieldsPosition.cfTitolare];
      voucher.tipoDatoBando = valuesCsvLine[fieldsPosition.tipoDatoBando];
      voucher.cfMinore = valuesCsvLine[fieldsPosition.cfMinore];
      voucher.importoVoucher = parseFloat(valuesCsvLine[fieldsPosition.importoVoucher].replace(',', '.'));
      voucher.emailContatto = valuesCsvLine[fieldsPosition.emailContatto];
      voucher.cellContatto = valuesCsvLine[fieldsPosition.cellContatto];

    }

    return voucher;

  }

  getUniqueListBy(arr) {
    let arrayApp = [...new Map(arr.map(item => { 
      let keys = item.split(';');
      let key = keys[fieldsPosition.codiceVoucher];
      return [key, item];
    })).values()];

    return arrayApp;
  }

  getDuplicateVlues(arr) {
    let arrayApp = null;
    let arrayReturn = null;

    try {
      arrayApp = arr.map(item => {
        let keys = item.split(';');
        let key = keys[fieldsPosition.codiceVoucher];
        let duplicateValues = null;
  
        let arrayFiltered = arr.filter(item2 => {
          let keys2 = item2.split(';');
          let key2 = keys2[fieldsPosition.codiceVoucher];
          return key2 === key;
        });
  
        if (arrayFiltered.length > 1) {
          // trovato duplicato
          duplicateValues = key;
        }
        
        return duplicateValues;
      });
      
      arrayReturn = [...new Set(arrayApp)];
  
    } catch (err) {
      logger.error(err);
    }
  
    return arrayReturn.filter(e => e);
  }
  
}

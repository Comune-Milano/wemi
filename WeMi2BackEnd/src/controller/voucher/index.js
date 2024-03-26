import { VoucherDomain } from 'domain/voucher/voucher';

/**
 * Class controller for voucher management
 */
export class VoucherManagement {
  /**
   * The constructor of the class
   * @param {object} context the graphql object for the context
   * @param {string} locale the locale
   */
  constructor(context, locale = 'it') {
    const { user = {}, db, logger, formatter, queryBuilder } = context;
    this.context = { ...context, locale };
    this.logger = logger;
    this.user = user;
    this.db = db;
    this.formatter = formatter;
    this.helpers = queryBuilder;
    this.locale = locale;
  }

  /**
   * Function to get the list of vouchers
   * @param {object} args the arguments of the query
   * @returns {object[]} the list of vouchers
   */
  async getVouchers(args) {
    const { filters = {}, page, elementsPerPage } = args;
    return this.db.task((task) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: task });
      return voucherDomain.getList({
        page,
        filters,
        elementsPerPage,
      });
    });
  }

  /**
   * Function to get the list of vouchers
   * @param {object} args the arguments of the query
   * @returns {object[]} the list of vouchers
   */
  async getCitizenVoucherList(args) {
    const { page, elementsPerPage } = args;
    return await this.db.task( async (task) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: task });
      return await voucherDomain.getCitizenVoucherList({
        page,
        elementsPerPage,
      });
    });
  }

  /**
   * Function to get the list of all voucher transaction
   * @param {object} args the arguments of the query
   * @returns {object[]} the list of vouchers
   */
  async getVoucherTransactionList(args) {
    const { filters = {}, idVoucher, page, elementsPerPage } = args;
    if (idVoucher) filters.idVoucher = idVoucher;
    return this.db.task((task) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: task });
      return voucherDomain.getTransactionList({
        page,
        filters,
        elementsPerPage,
      });
    });
  }

    
  /**
   * Function to download the list of all transactions
   * @param {object} args the arguments of the query
   * @returns {object[]} the list of transactions
   */
  async downloadTransactionsCont(args) {
    const { filters = {}, idVoucher, page, elementsPerPage } = args;
    if (idVoucher) filters.idVoucher = idVoucher;
    return this.db.task((task) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: task });
      return voucherDomain.downloadTransactionList({
        page,
        filters,
        elementsPerPage,
      });
    });
  }

  /**
   * Function to download the list of all vouchers
   * @param {object} args the arguments of the query
   * @returns {object[]} the list of vouchers
   */
  async downloadVouchersCont(args) {
    const { filters = {}, page, elementsPerPage } = args;
    return this.db.task((task) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: task });
      return voucherDomain.downloadVoucherList({
        page,
        filters,
        elementsPerPage,
      });
    });
  }

  /**
   * Function to get the list of all transaction of specific voucher for current user 
   * @param {object} args the arguments of the query
   * @returns {object[]} the list of vouchers
   */
  async getCitizenVoucherTransactionsList(args) {
    const { filters = {}, idVoucher, page, elementsPerPage } = args;
    if (idVoucher) filters.idVoucher = idVoucher;

    return this.db.task( async (task) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: task });
      const transactionList = await voucherDomain.getCitizenVoucherTransactionsList({
        page,
        filters,
        elementsPerPage,
      });

      const voucherInfo = await voucherDomain.get(idVoucher);

      const retValue = {
        totalRows: transactionList.totalRows,
        list: transactionList.list,
        voucherInfo: voucherInfo,
      };

      return retValue;
    });
  }

  /** Function to get the list of vouchers usable by a user
   * @param {object} args the arguments of the query
   * @returns {object[]} the list of vouchers
   */
  async getUsableVoucherListByUser(args) {
    return this.db.task((task) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: task });
      const { fiscalCode } = this.user;
      return voucherDomain.getUserVouchers({...args, fiscalCode});
    });
  }


  /**
   * Function to get the list of voucher state
   * @returns {object[]} the list of voucher state
   */
  async getEstraiStatiVoucher() {
    return this.db.task((task) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: task });
      return voucherDomain.getEstraiStatiVoucher();
    });
  }
  
  /**
   * Function to get the list of voucher transaction state
   * @returns {object[]} the list of voucher state
   */
  async getEstraiStatiTransazioneVoucher() {
    return this.db.task((task) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: task });
      return voucherDomain.getEstraiStatiTransazioneVoucher();
    });
  }

  /**
   * Function to get the list of sostegni economici
   * @returns {object[]} the list of sostegni economici
   */
  async getEstraiSostegnoEconomico() {
    return this.db.task((task) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: task });
      return voucherDomain.getEstraiSostegnoEconomico();
    });
  }

  /**
   * Function to get the voucher
   * @param {object} args the args
   * @returns {*} any
   */
  async getVoucher(args) {
    const { idVoucher } = args;
    const voucherDomain = new VoucherDomain(this.context);
    return await voucherDomain.get(idVoucher);
  }
  
  /**
   * Function to get the voucher
   * @param {object} args the args
   * @returns {*} any
   */
  async getTransactionDetails(args) {
    const { idTransaction } = args;
    const voucherDomain = new VoucherDomain(this.context);
    return await voucherDomain.getTransaction(idTransaction);
  }

   /**
    * Function to get the voucher
    * @param {object} args the args
    * @returns {*} any
    */
  async getVoucherByIdRichiesta(args) {
    const voucherDomain = new VoucherDomain(this.context);
    return await voucherDomain.getVoucherByIdRichiesta(args);
  }

  /**
   * Function to check if user has Vouchers
   * @param {object} args the args
   * @returns {*} any
   */
  async hasCitizenVoucher(args) {
    const { page = 0, elementsPerPage = 1 } = args;
    const voucherDomain = new VoucherDomain(this.context);
    return await voucherDomain.hasCitizenVoucher({ page, elementsPerPage });
  }

  /**
   * Function to check if user has Voucher transactions
   * @param {object} args the args
   * @returns {*} any
   */
  async hasTransactionsCont(args) {
    const { page = 0, elementsPerPage = 1 } = args;
    const voucherDomain = new VoucherDomain(this.context);
    return await voucherDomain.hasTransactionsCont({ page, elementsPerPage });
  }

  /**
   * Function to check if user has Vouchers
   * @param {object} args the args
   * @returns {*} any
   */
  async hasVouchersCont(args) {
    const { page = 0, elementsPerPage = 1 } = args;
    const voucherDomain = new VoucherDomain(this.context);
    return await voucherDomain.hasTransactionsCont({ page, elementsPerPage });
  }

  /**
   * Function to get transaction of specific voucher
   * @param {object} args the args
   * @returns {*} any
   */
  async getVoucherTransaction(args) {
    const { idVoucher, page, elementsPerPage } = args;
    let filters = { idVoucher };
    return this.db.task((task) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: task });
      return voucherDomain.getTransactionList({
        page,
        filters,
        elementsPerPage,
      });
    });
  }


  /**
   * Function to get max order
   * @returns {*} any
   */
  async getMaxOrderVoucher() {
    const voucherDomain = new VoucherDomain(this.context);
    const result = await voucherDomain.getMaxOrder(tyContenuto.SEZIONI);
    return (result.order + 1) || 1;
  }

  /**
   * Function to annul the voucher
   * @param {object} args the args
   * @returns {*} any
   */
  async annullaVoucher(args = {}) {
    return this.db.tx(async (transaction) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: transaction });
      return voucherDomain.annullaVoucher({ ...args });
    });
  }

    /**
     * Function to set the use timestamp of the voucher
     * @param {object} args the id of the request
     * @returns {*} any
     */
  async setVoucherTimestamp(args) {
    return this.db.tx(async (transaction) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: transaction });
      return voucherDomain.setVoucherTimestamp(args);
    });
  }

  /**
   * Function to annul the voucher
   * @param {object} args the args
   * @returns {*} any
   */
  async ripristinoVoucher(args = {}) {
    return this.db.tx(async (transaction) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: transaction });
      return voucherDomain.ripristinoVoucher({ ...args });
    });
  }

  /**
   * Function to contabilizza transazione voucher
   * @param {object} args the args
   * @returns {*} any
   */
  async contabilizzaTransazioneVoucher(args = {}) {
    return this.db.tx(async (transaction) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: transaction });
      return voucherDomain.contabilizzaTransazioneVoucher({ ...args });
    });
  }

  /**
   * Function to storna transazione voucher
   * @param {object} args the args
   * @returns {*} any
   */
  async stornoTransazioneVoucher(args = {}) {
    return this.db.tx(async (transaction) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: transaction });
      return voucherDomain.stornoTransazioneVoucher({ ...args });
    });
  }

  /**
   * Function to importa ed elabora file csv voucher
   * @param {object} args the args
   * @returns {*} any
   */
  async elaboraVouchers(args = {}) {
    const voucherDomain = new VoucherDomain({ ...this.context, db: this.db });
    return await voucherDomain.elaboraVouchers({ ...args });
  }

  /**
   * Function to importa ed elabora file csv voucher
   * @param {object} args the args
   * @returns {*} any
   */
  async uploadVouchers(args = {}) {
    return this.db.tx(async (transaction) => {
      const voucherDomain = new VoucherDomain({ ...this.context, db: transaction });
      return await voucherDomain.uploadVouchers({ ...args });
    });
  }
  
}


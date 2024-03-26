
import { insertPagamento, insertPagamentoFree } from '../../sql/pagamento/insertPagamento';
import { insertStatoPagamento } from '../../sql/pagamento/insertPagamentoStt';
import { updatePagamento } from '../../sql/pagamento/updatePagamento';
import { selectLatestSuccessfullPayment } from '../../sql/pagamento/selectLatestSuccessfullPayment';

export class PagamentoDAO {
  constructor(db) {
    this.db = db;
  }

  /**
   * Inserts a payment.
   */
  insertPagamento({ jsDatiFatturazione, jsDatiPagamento }) {
    return this.db.one(insertPagamentoFree, {
      jsDatiFatturazione,
      jsDatiPagamento
    });
  }

  /**
   * Inserts or updates a payment.
   */
  insertOrUpdatePagamento({ jsDatiFatturazione, jsDatiPagamento, idInternoTrans }, idInternoTransazione) {
    // If an internal transaction id is provided, then patch payment entry.
    if (idInternoTransazione) {
      return this.db.one(updatePagamento, {
        jsDatiFatturazione,
        jsDatiPagamento,
        idInternoTransazione,
      });
    }
    // Otherwise insert a new payment entry.
    return this.db.one(insertPagamento, {
      jsDatiFatturazione,
      jsDatiPagamento,
      idInternoTrans
    });
  }

  /**
   * Insert the state of a payment.
   */
  insertPagamentoStt({ idInternoTransazionePagamento, cdStatoPagamento, idUtente }) {
    return this.db.none(insertStatoPagamento, {
      idInternoTransazionePagamento,
      cdStatoPagamento,
      idUtente
    });
  }

  /**
   * Updates a payment.
   */
  updatePagamento({ idInternoTransazione, jsDatiFatturazione, jsDatiPagamento }) {
    return this.db.none(updatePagamento, {
      idInternoTransazione,
      jsDatiFatturazione,
      jsDatiPagamento
    });
  }

  /**
   * Selects the last saved payment for the given user id.
   */
  selectLatestSuccessfullPayment(userId) {
    return this.db.oneOrNone(selectLatestSuccessfullPayment, { userId });
  }
}
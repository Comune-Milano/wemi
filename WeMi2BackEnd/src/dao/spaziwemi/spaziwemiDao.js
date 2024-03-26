import { getMinPriceTCB } from '../../sql/spaziwemi/select';

/**
 * The dao for the space WeMi
 */
export default class SpaziWeMiDao {
  /**
   * The constructor of the class
   * @param {*} db the connection object
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Gets the space WeMi data
   * @param {*} idServizio the id of service
   * @returns {*} the price 
   */
  getSpaziData(idServizio) {
    return this.db.any(getMinPriceTCB, { idServizio });
  }
}
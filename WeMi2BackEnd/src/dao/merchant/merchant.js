import { isNullOrUndefined, isNumber } from 'util';
import { MerchantInstitutionFormatter } from './formatter';
import { Institution } from 'dto/institution/institution';
import { findMerchantInformation } from 'sql/ente/institution';
import { logger } from 'utility/logger/getInstance';

/**
 * The class to define the dao for merchant on institutions
 */
export class MerchantInstitutionDao {
  /**
   * The constructor of the class
   * @param {object} db the connection object
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(db, builder, formatter){
    this.connection = db;
    this.builder = builder;
    this.formatter = formatter;
    this.logger = logger;
    this.merchantFormatter = new MerchantInstitutionFormatter(builder, formatter);
  }
  /**
   * The method to find the merchant of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async findMerchant(institution){
    const institutionId = institution.getId();
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const dbResult = await this.connection.oneOrNone(findMerchantInformation, { institutionId });
      const institutionResult = new Institution({ institutionMerchant: dbResult}, false);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error finding merchant for institution card');
    }
  }
  /**
   * The method to insert the merchant of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async insertMerchant(institution){
    const institutionId = institution.getId();
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId) || !institution.merchant?.id) {
      return;
    }
    try {
      const queryInsert = this.merchantFormatter.formatInsert(institution);
      this.logger.trace(queryInsert);
      return await this.connection.one(queryInsert);
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error inserting merchant for institution card');
    }
  }
  /**
   * The method to insert the merchant of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async updateMerchant(institution){
    const institutionId = institution.getId();
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const queryUpdate = this.merchantFormatter.formatUpdate(institution);
      this.logger.trace(queryUpdate);
      return await this.connection.one(queryUpdate);
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error updating merchant for institution card');
    }
  }

}


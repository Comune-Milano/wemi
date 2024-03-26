import { isNullOrUndefined, isNumber } from 'util';
import { InformationInstitutionFormatter } from './formatter';
import { Institution } from 'dto/institution/institution';
import { findEnteBasicInformation, findLastState } from 'sql/ente/institution';
import { logger } from 'utility/logger/getInstance';
/**
 * The class to define the dao for informations on institutions
 */
export class InformationInstitutionDao {
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
    this.institutionFormatter = new InformationInstitutionFormatter(builder, formatter);
  }
  /**
   * The method to find the last state of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async findLastState(institution){
    const institutionId = institution.getId();

    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const dbResult = await this.connection.one(findLastState, { institutionId });
      const institutionResult = new Institution({ 
        institutionState: dbResult,
      }, false);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error finding the last state for institution card');
    }
  }
  /**
   * The method to find the informations of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async findInformations(institution){
    const institutionId = institution.getId();

    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const dbResult = await this.connection.one(findEnteBasicInformation, { institutionId });
      const institutionResult = new Institution(dbResult, false);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error finding the informations for institution card');
    }
  }
  /**
   * The method to update the corporate data of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async updateCorporateData(institution){
    const institutionId = institution.getId();
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const queryUpdate = this.institutionFormatter.formatCorporateDataUpdate(institution);
      const dbResult = await this.connection.one(queryUpdate);
      const institutionResult = new Institution(dbResult);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error updating the informations for institution card');
    }
  }
  /**
   * The method to update the informations of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async updateState(institution){
    const institutionId = institution.getId();
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const queryInsert = this.institutionFormatter.formatStateInsert(institution);
      const dbResult = await this.connection.one(queryInsert);
      const institutionResult = new Institution(dbResult);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error updating the state for institution card');
    }
  }
}

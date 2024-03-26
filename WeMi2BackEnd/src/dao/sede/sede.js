import { isNullOrUndefined, isNumber } from 'util';
import { OfficeInstitutionFormatter } from './formatter';
import { Institution } from 'dto/institution/institution';
import { findRegisteredOfficeForEnte, findLocationsForEnte } from 'sql/ente/institution';
import { logger } from 'utility/logger/getInstance';
import { TY_SEDE } from 'constants/db/sede';
import { selectSediErogatrici, findSecondaryOfficesByInstitution } from '../../sql/servizioerogatoente/select';
import { deleteSediErogatrici } from '../../sql/servizioerogatoente/delete';
import { insertSedeErogatrice } from '../../sql/servizioerogatoente/insert';

/**
 * The class to define the dao for office on institutions
 */
export class OfficeInstitutionDao {
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
    this.officeFormatter = new OfficeInstitutionFormatter(builder, formatter);
  }
  /**
   * The method to find the primary office of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async findPrimaryOffice(institution){
    const institutionId = institution.getId();
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const dbResult = await this.connection.oneOrNone(findRegisteredOfficeForEnte, { institutionId });
      const institutionResult = new Institution({
        institutionPrincipalLocation: dbResult,
      }, false);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error finding primary office for institution card');
    }
  }
  /**
   * The method to find the secondary offices of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async findSecondaryOffices(institution){
    const institutionId = institution.getId();
  
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const dbResult = await this.connection.any(findLocationsForEnte, { institutionId });
      const institutionResult = new Institution({
        institutionLocations: dbResult,
      }, false);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error finding secondary offices for institution card');
    }
  }
  /**
   * The method to insert the primary office of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async insertPrimaryOffice(institution){
    const institutionId = institution.getId();
  
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const office = [];
      const primaryOffice = institution.getPrimaryOffice();
      office.push(primaryOffice);
      const queryInsert = this.officeFormatter.formatUpdate({
        officeType: TY_SEDE.PRIMARIA,
        officeArray: office,
      }, institutionId);
      this.logger.trace(queryInsert);
      const dbResult = await this.connection.one(queryInsert);
      const institutionResult = new Institution(dbResult);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error inserting primary office for institution card');
    }
  }
  /**
   * The method to insert the primary office of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async updatePrimaryOffice(institution){
    const institutionId = institution.getId();
  
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const office = institution.getPrimaryOffice();
      const queryUpdate= this.officeFormatter.formatUpdate({
        officeType: TY_SEDE.PRIMARIA,
        office,
      }, institutionId);
      this.logger.trace(queryUpdate);
      const dbResult = await this.connection.one(queryUpdate);
      const institutionResult = new Institution(dbResult);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error updating primary office for institution card');
    }
  }
  /**
   * The method to insert the secondary offices of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async insertSecondaryOffices(institution){
    const institutionId = institution.getId();
    const secondaryOffices = institution.getSecondaryOffices();
  
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId) || !(secondaryOffices.length > 0)) {
      return;
    }
    try {
      const queryInsert= this.officeFormatter.formatInsert({
        officeType: TY_SEDE.SECONDARIA,
        officeArray: secondaryOffices,
      }, institutionId);
      this.logger.trace(queryInsert);
      const dbResult = await this.connection.any(queryInsert);
      const institutionResult = new Institution(dbResult);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error inserting secondary offices for institution card');
    }
  }
  /**
   * The method to update the secondary offices of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async updateSecondaryOffices(institution){
    const institutionId = institution.getId();
    const secondaryOffices = institution.getSecondaryOffices();
    
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId) || !(secondaryOffices.length > 0)) {
      return;
    }
    try {
      secondaryOffices.forEach(async office => {
        const queryUpdate= this.officeFormatter.formatUpdate({
          officeType: TY_SEDE.SECONDARIA,
          office,
        }, institutionId);
        this.logger.trace(queryUpdate);
        await this.connection.one(queryUpdate);
      });
     
      return institution;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error updating secondary offices for institution card');
    }
  }
  /**
   * The method to update the secondary offices of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async deleteSecondaryOffices(institution){
    const institutionId = institution.getId();
    const secondaryOffices = institution.getSecondaryOffices();
  
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId) || !(secondaryOffices.length > 0)) {
      return;
    }
    try {
      const queryDelete= this.officeFormatter.formatDelete({
        officeType: TY_SEDE.SECONDARIA,
        officeArray: secondaryOffices,
      }, institutionId);
      this.logger.trace(queryDelete);
      const dbResult = await this.connection.any(queryDelete);
      const institutionResult = new Institution(dbResult);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error deleting secondary offices for institution card');
    }
  }

  async findAllSediErogatrici(institutionId) {
    const risultato = this.connection.any(findSecondaryOfficesByInstitution, { institutionId });
    return risultato || [];
  }
  /**
   * Finds all of the secondary offices by the id of service
   * @param {number} idServizioEnte the id of service
   * @returns {object[]} the result
   */
  async findSediErogatrici(idServizioEnte) {
    const risultato = await this.connection.any(selectSediErogatrici, { idServizioEnte });
    return risultato;
  }

  async updateSediErogazione(idServizioEnte, listaSedi) {
    const result = await this.findSediErogatrici(idServizioEnte);
    const sediSalvate = result.map(el => el.id_sede);

    // Perform the deletion.
    if (sediSalvate.length > 0) {
      await this.connection.none(deleteSediErogatrici, [sediSalvate, idServizioEnte]);
    }
    // Perform the addition.
    if (listaSedi.length > 0) {
      await this.connection.batch(listaSedi.map(sede => this.connection.none(insertSedeErogatrice, {
        idServizioEnte,
        idSedeErogazione: sede.id,
        fgAccompagnamentoSede: sede.checkAccompagnamento ? '1' : '0',
      })));
    }
  }

}

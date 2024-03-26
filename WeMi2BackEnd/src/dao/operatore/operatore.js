import { isNullOrUndefined, isNumber } from 'util';
import { OperatorInstitutionFormatter } from './formatter';
import { Institution } from 'dto/institution/institution';
import { findAuthorizedOperatorsForEnte, findExistentUsers } from 'sql/ente/institution';
import { logger } from 'utility/logger/getInstance';
import { selezionaEnteOperatoreSql } from 'sql/roperatoreente/select';
import { selezionaEnteByOperatoreEnteAdminSql } from 'sql/ente/selezione';

/**
 * The class to define the dao for operators on institutions
 */
export class OperatorInstitutionDao {
  /**
   * The constructor of the class
   * @param {object} db the connection object
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(db, builder, formatter) {
    this.connection = db;
    this.builder = builder;
    this.formatter = formatter;
    this.logger = logger;
    this.operatorFormatter = new OperatorInstitutionFormatter(builder, formatter);
  }
  /**
   * Find a specified operator information
   * @param {object} operator the operator 
   * @returns {object} the operator information
   */
  async findOperator(operator) {
    return await this.connection.oneOrNone(selezionaEnteOperatoreSql, { id_utente: operator.id });
  }
  /**
   * Find a specified admin institution information
   * @param {object} operator the operator 
   * @returns {object} the admin institution information
   */
  async findAdmin(operator) {
    return await this.connection.oneOrNone(selezionaEnteByOperatoreEnteAdminSql, { id_utente: operator.id });
  }
  /**
   * The method to find the operators of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async findOperators(institution) {
    const institutionId = institution.getId();
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const dbResult = await this.connection.any(findAuthorizedOperatorsForEnte, { institutionId });
      const institutionResult = new Institution({ institutionAuthorizedOperators: dbResult }, false);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error finding operators');
    }
  }
  /**
   * The method to insert the operators of an institution
   * @param {object[]} operators the operators object
   * @param {number} institutionId the id of the institution
   * @returns {object[]} the inserted operators
   */
  async insertOperators(operators, institutionId) {
    const queryInsertNew = this.operatorFormatter.formatInsert(operators.map(operator =>
      operator.id), institutionId);
    this.logger.trace(queryInsertNew, 'insert query for operators');
    return await this.connection.any(queryInsertNew);
  }
  /**
   * The method to delete the operators of an institution
   * @param {object[]} operators the operators object
   * @param {number} institutionId the id of the institution
   */
  async deleteOperators(operators, institutionId) {
 
    const queryDelete = this.operatorFormatter.formatDelete(operators.map(operator =>
      operator.id), institutionId);
    this.logger.trace(queryDelete, 'delete query for operators');
    await this.connection.none(queryDelete);
  }
  /**
   * Finds the users to check 
   * @param {object[]} operators email operatori
   * @param {number} institutionId the id of the institution
   * @returns {object[]} lista utenti
   */
  async findExistentUsers(operators, institutionId) {

    const formattedQuery = this.formatter.format(
      findExistentUsers,
      {
        operatorsEmail: operators.length > 0 ? operators.map(operator => operator.email) : ' ',
        institutionId,
      }
    );
    const existentUsers = await this.connection.any(formattedQuery) || {};
    const resultUsers = existentUsers || [];
    this.logger.trace(resultUsers, 'users to update');
    return resultUsers;
  }
  /**
   * Finds the existent operators to delete
   * @param {Institution} institution the institution object
   * @returns {Institution} the institution new object
   */
  async findDeleteOperators(institution) {
    const authorizedOperatorsEmails = institution.getAuthorizedOperatorsEmails();
    const institutionOldState = await this.findOperators(institution);
    const institutionAuthorizedOperators = institutionOldState.getAuthorizedOperators();
    //Users to delete for the institution
    const institutionUsersToDelete = institutionAuthorizedOperators.filter((operatorEmail) => {
      const find = authorizedOperatorsEmails.find(email => operatorEmail.email === email);
      if (!find) {
        return true;
      }
      return false;
    });
    this.logger.trace(institutionUsersToDelete, 'users to delete institution emails');

    return new Institution({ institutionDeletedOperators: institutionUsersToDelete });
  }
  /**
   * Finds the not existent operators to save
   * @param {Institution} institution the institution object
   * @returns {Institution} the institution new object
   */
  async findNewOperators(institution) {
    const authorizedOperatorsEmails = institution.getAuthorizedOperatorsEmails();

    const otherUsers = await this.findExistentUsers(
      institution.getAuthorizedOperators(), 
      institution.id
    );

    const existentEmails = otherUsers;
    const institutionOldState = await this.findOperators(institution);

    const institutionAuthorizedOperatorsEmails = institutionOldState.getAuthorizedOperatorsEmails();

    const notExistentEmailsPartials = authorizedOperatorsEmails.filter((operatorEmail) => {
      const find = existentEmails.find(operator => operatorEmail === operator.email);
      if (!find) {
        return true;
      }
      return false;
    });
    const notExistentEmails = notExistentEmailsPartials.filter((operatorEmail) => {

      const find = institutionAuthorizedOperatorsEmails.find(email => operatorEmail
        === email);
      if (!find) {
        return true;
      }
      return false;
    });

    this.logger.trace(notExistentEmails, 'not existent emails');
    const mappedNotExistentEmails = notExistentEmails.map(email => ({ email }));
    return new Institution({ institutionAuthorizedOperators: mappedNotExistentEmails });
  }
}


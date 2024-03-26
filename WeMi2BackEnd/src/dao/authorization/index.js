import { UserExtended } from 'dto/user';
import { findProfileAuthorizations, findUserAuthorizations } from 'sql/authorization';

/**
 * The Dao for authorization domain
 */
export class AuthorizationDAO {
  /**
   * The constructor of the class
   * @param {object} connection the connection object
   * @param {object} formatter the formatter
   * @param {object} helpers the helpers for formatting
   */
  constructor(connection, formatter, helpers){
    this.connection = connection;
    this.formatter = formatter;
    this.helpers = helpers;
  }
  /**
   * Method to find all the authorization for a user
   * @param {UserExtended} userDTO the user with profile code inside
   * @returns {object[]} the authorizations for a profile
   */
  async findAuthorizations(userDTO = new UserExtended()){
    if(!userDTO.idUtente){
      return [];
    }
    const authorizationsDb = await this.connection.any(findProfileAuthorizations, { user: userDTO });
    const authorizations = authorizationsDb || [];
    return authorizations;
  }
  /**
   * Method to find all the authorization for a user
   * @param {UserExtended} userDTO the user with inside profile and id
   * @returns {object[]} the authorizations for a profile
   */
  async findByUser(userDTO = new UserExtended()){
    if(!userDTO.idUtente){
      return [];
    }
    const authorizationsDb = await this.connection.any(findUserAuthorizations, { user: userDTO });
    const authorizations = authorizationsDb || [];
    return authorizations;
  }
}

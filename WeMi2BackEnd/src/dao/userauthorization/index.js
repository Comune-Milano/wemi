import { AuthorizationDTO } from 'dto/authorization';
import { UserExtended } from 'dto/user';
import { deleteAuthorization, insertAuthorization, selectSaveAuthorization } from 'sql/authorization';
import { deleteAllAuthorizationsByUser, findAllAuthorizationsByUser } from 'sql/utente/selectUtenti';

/**
 * The Dao for authorization - user 
 */
export class UserAuthorizationDAO {
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
   * Method to find the authorization for a user
   * @param {UserExtended} userDTO the user
   * @returns {object} the authorizations
   */
  async findAll(userDTO = new UserExtended()){
    if(!userDTO.idUtente){
      return;
    }
    return this.connection.any(findAllAuthorizationsByUser, { user: userDTO });
  }
  /**
   * Method to find the authorization for a user
   * @param {UserExtended} userDTO the user with profile code inside
   * @param {AuthorizationDTO} authorization the user with profile code inside
   * @returns {object} the authorizations for a profile
   */
  async find(userDTO = new UserExtended(), authorization = new AuthorizationDTO()){
    if(!userDTO.profile){
      return;
    }
    return this.connection.oneOrNone(selectSaveAuthorization, { user: userDTO, authorization });
  }
  /**
   * Method to delete the authorization for a user
   * @param {UserExtended} userDTO the user with profile code inside
   * @param {AuthorizationDTO} authorization the user with profile code inside
   * @returns {object} the authorizations for a profile
   */
  async delete(userDTO = new UserExtended(), authorization = new AuthorizationDTO()){
    if(!userDTO.profile){
      return [];
    }
    const authorizationsDb = await this.connection.one(deleteAuthorization, { user: userDTO, authorization });
    const authorizationToReturn = authorizationsDb || {};
    return authorizationToReturn;
  }
  /**
   * Method to delete all the authorization for a user
   * @param {UserExtended} userDTO the user with profile code inside
   * @returns {*} the return
   */
  deleteAll(userDTO = new UserExtended()){
    if(!userDTO.idUtente){
      return;
    }
    return this.connection.none(deleteAllAuthorizationsByUser, { user: userDTO });
  }
  /**
   * Method to insert the authorization for a user
   * @param {UserExtended} userDTO the user with profile code inside
   * @param {AuthorizationDTO} authorization the user with profile code inside
   * @returns {*} the return
   */
  insert(userDTO = new UserExtended(), authorization = new AuthorizationDTO()){
    if(!userDTO.idUtente){
      return;
    }
    return this.connection.none(insertAuthorization, { user: userDTO, authorization });
  }
}

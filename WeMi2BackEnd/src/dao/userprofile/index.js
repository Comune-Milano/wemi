import { UserProfileFormatter } from './formatter';
import { UserExtended } from 'dto/user';
import { findUsersByProfile, findUserValidityDates } from 'sql/userprofile';

/**
 * The Dao for profile - user 
 */
export class UserProfileDAO {
  /**
   * The constructor of the class
   * @param {object} connection the connection object
   * @param {object} formatter the formatter
   * @param {object} helpers the helpers for formatting
   */
  constructor(connection, formatter, helpers){
    this.connection = connection;
    this.formatter = new UserProfileFormatter(helpers, formatter);
    this.helpers = helpers;
  }
  /**
   * Method to update the validity of profile for a user
   * @param {UserExtended} params the params
   * @returns {*} the return
   */
  update(params = {}){
    if(!params.idUtente){
      return;
    }
    const query = this.formatter.formatUpdate(params);
    return this.connection.none(query, { user: params });
  }
  /**
   * Method to check the validation dates for a profile
   * @param {UserExtended} params the params
   * @returns {*} the return
   */
  checkValidationDate(params = {}){
    return this.connection.one(findUserValidityDates, { user: params });
  }
  /** 
   * The method to insert the profiles users
   * @param {object[]} users the users to insert
   * @param {object} user the user that made the last modify
   * @returns {object[]} the inserted users
   */
  async insertProfiles(users, user){
    const queryInsertOperators = this.formatter.formatInsert(users.map(userToInsert => ({
      id:userToInsert.id,
      code:userToInsert.code,
    }) ), user);
    return await this.connection.any(queryInsertOperators);

  }
  /**
   * The method to find the profiles users
   * @param {object[]} users the users to find
   * @param {string} profile the profile to find
   * @returns {object[]} the users found
   */
  async findProfiles(users, profile){
    return await this.connection.any(findUsersByProfile, { users: users.map((userToUpdate) => (userToUpdate.id)), profile});
  }
/**
 * The method to update the profiles users
 * @param {object[]} users the users to update
 * @param {object} user the last user
 * @param {string} oldProfile the old profile
 * @param {string} newProfile the new profile
 * @returns {object[]} the updated users
 */
  async updateProfiles(users, user, oldProfile,newProfile){
    const queryUpdateProfiles = this.formatter.formatUpdates(newProfile, user);
    return await this.connection.none(queryUpdateProfiles, {
      usersId: users.map((userToUpdate) => (userToUpdate.id)),
      profile: oldProfile,
    });
  }
}

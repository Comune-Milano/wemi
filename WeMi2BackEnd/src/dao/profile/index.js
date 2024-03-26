import { ProfileVO } from 'dto/profile';
import { findAllProfile, findProfileByAuthorization } from 'sql/profile';

/**
 * DAO Profile 
 */
export class ProfileDAO {
  /**
   * The constructor of the class
   * @param {object} db the connection object
   * @param {object} formatter the formatter object
   * @param {object} helpers the queryBuilder object
   */
  constructor(db, formatter, helpers){
    this.db = db;
    this.formatter = formatter;
    this.helpers = helpers;
  }
  /**
   * The method to get the profiles
   * @returns {*} the user to return
   */
  async findAll(){
    const profilesDb = await this.db.any(findAllProfile);
    const profiles = profilesDb || [];
    return profiles.map(profile => new ProfileVO(profile));
  }
  /**
   * Method to find the profile for a user with an authorization
   * @param {object} authorization the authorization
   * @returns {object} the profile of the authorization
   */
  async findByAuthorization(authorization = {}){
    if(!authorization.code){
      return {};
    }
    const authorizationDb = await this.db.oneOrNone(findProfileByAuthorization, { authorization });
    const authorizationToReturn = authorizationDb;
    return authorizationToReturn;
  }
}
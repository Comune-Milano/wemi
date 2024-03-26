import { ApolloError } from 'apollo-server';
import { AuthorizationDAO } from 'dao/authorization';
import { ProfileDAO } from 'dao/profile';
import { UserAuthorizationDAO } from 'dao/userauthorization';
import { UserProfileDAO } from 'dao/userprofile';
import { AuthorizationDTO } from 'dto/authorization';
import { UserExtended } from 'dto/user';
import { DELETE_AUTHORIZATION_ERROR, INSERT_AUTHORIZATION_ERROR } from 'errors/authorization';

/**
 * Authorization Manager Domain class
 */
export class AuthorizationManagerDomain {
  /**
   * The constructor of the class
   * @param {object} context thecontext
   */
  constructor(context = {}) {
    const {
      db: connection,
      formatter,
      queryBuilder: helpers,
      logger,
    } = context;
    this.db = connection;
    this.formatter = formatter;
    this.helpers = helpers;
    this.logger = logger;
  }
  /**
   * The method to get the authorizations for a user
   * @param {UserExtended} userDTO the user
   * @returns {AuthorizationDTO[]} the authorizations
   */
  async getUserAuthorizations(userDTO = new UserExtended()) {
    const authorizationDAO = new AuthorizationDAO(this.db, this.formatter, this.helpers);
    const authorizations = await authorizationDAO.findByUser(userDTO);
    return authorizations.map((authorization) => new AuthorizationDTO(authorization));
  }
  /**
   * The method to get the authorizations for a specific user profile
   * @param {UserExtended} userDTO the user
   * @returns {UserExtended} the user to return
   */
  async getAuthorizationsForUser(userDTO = new UserExtended()) {
    const authorizationDAO = new AuthorizationDAO(this.db, this.formatter, this.helpers);
    const authorizations = await authorizationDAO.findAuthorizations(userDTO);
    // const authorizationsActive = await authorizationDAO.findByUser(userDTO);
    const mappedAuth = authorizations.map((authorization) => new AuthorizationDTO(authorization));
    // const mappedAuthActive = authorizationsActive.map((authorization) => new AuthorizationDTO(authorization));
    // const filteredAuth = mappedAuth.filter(authorization => {
    //   const authorizationActive = mappedAuthActive.find(authorizationToFind => authorizationToFind.code === authorization.code);
    //   if(authorizationActive){
    //     return true;
    //   }
    //   return false;
    // });
    return mappedAuth;
  }
  /**
   * Checks if an authorization is valid or not
   * @param {AuthorizationDTO} authorization the authorization
   * @param {UserExtended} userDTO the user dto 
   * @returns {boolean} a boolean
   */
  async checkUserAuthorization(authorization = new AuthorizationDTO(), userDTO = {}) {
    const authorizationDAO = new AuthorizationDAO(this.db, this.formatter, this.helpers);
    const authorizationsForProfileMapped = await authorizationDAO.findAuthorizations(userDTO) || [];
    const authorizationsForProfile = authorizationsForProfileMapped.map((authorizationDb) => new AuthorizationDTO(authorizationDb));
    const authorizationFound = !!authorizationsForProfile.find(authorizationProfile => authorization.code === authorizationProfile.code);
    
    if (!authorizationFound) {
      throw new ApolloError(INSERT_AUTHORIZATION_ERROR.message, INSERT_AUTHORIZATION_ERROR.code);
    }
  }
  /**
   * Checks if an authorization is enabled
   * @param {AuthorizationDTO} authorizations the authorization
   * @param {UserExtended} userDTO the user dto 
   */
  async isAuthorized(authorizations = [], userDTO = {}) {
    const authorizationsUser = await this.getUserAuthorizations(userDTO);
    
    let foundAuthorization = false;
    
    authorizationsUser.forEach(authorizationUser => {
      const found = authorizations.find(authorization => authorization === authorizationUser.code);
      if(found){
        foundAuthorization = !!found;
      }
    });

    if(!foundAuthorization){
      this.logger.error(foundAuthorization, 'Error while checking the user permissions');
      throw new Error('Authorization not found');
    }
  }
  /**
   * The method to get the authorizations for a specific user profile
   * @param {AuthorizationDTO[]} authorizations the authorizations to save
   * @param {object} params the params
   * @returns {UserExtended} the user to return
   */
  async saveUserAuthorization(authorizations = [], params) {
    const userAuthorizationDAO = new UserAuthorizationDAO(this.db, this.formatter, this.helpers);
    const userProfileDAO = new UserProfileDAO(this.db, this.formatter, this.helpers);
    //Finds the profile from the authorization
    await userAuthorizationDAO.deleteAll({ ...params, idUtente: params.userId });
    for(const authorization of authorizations){
      
      // Check if it's possible to add the authorization with that profile
      await this.checkUserAuthorization(authorization, { idUtente: params.userId, profile: params.profileCode });
      // Find the authorization
      const authorizationNewDb = await userAuthorizationDAO.find({ ...params, idUtente: params.userId, profile: params.profileCode  }, authorization);
      // If exist error
      if (authorizationNewDb) {
        throw new ApolloError(INSERT_AUTHORIZATION_ERROR.message, INSERT_AUTHORIZATION_ERROR.code, { data: authorization });
      }
      // insert new authorization
      await userAuthorizationDAO.insert({ ...params, idUtente: params.userId, profile: params.profileCode  }, authorization);
    }
    //The update on validation date for profile
    await userProfileDAO.update({ ...params, idUtente: params.userId, profile: params.profileCode });
    return authorizations;
  }
  /**
   * The method to get the authorizations for a specific user profile
   * @param {UserExtended} authorization the user
   * @param {UserExtended} user the user
   * @returns {UserExtended} the user to return
   */
  async deleteUserAuthorization(authorization = {}, user = {}) {
    const profileDAO = new ProfileDAO(this.db, this.formatter, this.helpers);
    const profile = await profileDAO.findByAuthorization(authorization);
    if (!profile) {
      return;
    }
    const userAuthorizationDAO = new UserAuthorizationDAO(this.db, this.formatter, this.helpers);
    // Find the authorization
    const authorizationDb = await userAuthorizationDAO.find({ ...user, idUtente: user.userId, profile: profile.code }, authorization);
    // If not exist error
    if (!authorizationDb) {
      throw new ApolloError(DELETE_AUTHORIZATION_ERROR.message, DELETE_AUTHORIZATION_ERROR.code);
    }
    // Delete the row authorization
    await userAuthorizationDAO.delete({ ...user, idUtente: user.userId, profile: profile.code }, authorization);
    return authorization;
  }
}
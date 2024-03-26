import { AuthorizationManagerDomain } from 'domain/authorizationmanager';
import UserDomain from 'domain/UtenteDomain';
import { UserExtended } from 'dto/user';
import { FiltersUserListInput } from 'dto/user/filtersuserlistinput';

/**
 * Users Manager Controller Class
 */
export class UsersManagerController {
  /**
   * The constructor of the class
   * @param {object} context the db object
   */
  constructor(context = {}) {
    this.context = context;
    this.logger = context.logger;
  }
  /**
   * Gets the user list with profiles
   * @param {object} parameters the parameters
   * @returns {UserExtended[]} the users
   */
  async getUsers(parameters = {}) {
    const filtersUserList = new FiltersUserListInput(parameters);
    const userDomain = new UserDomain(this.context);
    const users = await userDomain.getUsers(filtersUserList);
    return users;
  }
  /**
   * Gets the user detail
   * @param {object} parameters the parameters
   * @returns {UserExtended} the user with authorizations
   */
  getUserDetail(parameters = {}) {
    return this.context.db.task(async task => {
      const userDTO = new UserExtended(parameters);
      const userDomain = new UserDomain({ ...this.context, db: task });
      const authManagerDomain = new AuthorizationManagerDomain({ ...this.context, db: task });
      const user = await userDomain.getUser(userDTO) || {};
      const authorizations = await authManagerDomain.getUserAuthorizations(userDTO);
      const userToReturn = new UserExtended({
        ...user,
        authorizations,
      });
      return {
        ...userToReturn,
        profile: userToReturn.profileObject,
      };
    });
  }
  /**
   * Deletes the authorization of the user
   * @param {object} parameters the informations for the user
   * @returns {UserExtended} the user with authorizations
   */
  deleteUserAuthorization(parameters = {}) {
    return this.context.db.tx(async transaction => {
      const authManagerDomain = new AuthorizationManagerDomain({ ...this.context, db: transaction });
      const authorization = await authManagerDomain.deleteUserAuthorization(parameters.authorization, parameters);
      return {
        ...parameters,
        idUtente: parameters.userId,
        profile: {
          code: parameters.profileCode,
        },
        authorizations: [authorization],
      };
    });
  }
  /**
   * Save and delete the new and old user authorization
   * @param {UserExtended} parameters the user to bring the details
   * @returns {UserExtended} the user with authorizations
   */
  async saveUserAuthorization(parameters = {}) {
    return this.context.db.tx(async transaction => {
      const authManagerDomain = new AuthorizationManagerDomain({ ...this.context, db: transaction });
      //user logged
      const idUserMod = this.context.user.idUtente;
      const authorizations = await authManagerDomain.saveUserAuthorization(parameters.authorizations, { ...parameters, idUserMod });
      return {
        ...parameters,
        idUtente: parameters.userId,
        profile: {
          code: parameters.profileCode,
        },
        authorizations,
        startValidDate: parameters.startValidityDate,
        endValidDate: parameters.endValidityDate,
      };
    });
  }
}
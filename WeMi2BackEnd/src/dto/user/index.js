import { AuthorizationDTO } from 'dto/authorization';
import User from 'dto/UtenteDTO';

/**
 * User extended DTO
 */
export class UserExtended extends User {
  authorizations = [];
  /**
   * The constructor of the class
   * @param {object} dbObject the db object
   */
  constructor(dbObject = {}) {
    super(dbObject);
    const {
      authorizations = [],
      dt_inizio_val,
      dt_fine_val,
      ts_ultima_modifica,
      ptx_username_last_modified,
      cd_profilo,
      tx_descrizione,
    } = dbObject;
    this.startValidDate = dt_inizio_val;
    this.endValidDate = dt_fine_val;
    this.dateLastModified = ts_ultima_modifica;
    this.profile = this.profile;
    this.profileObject = { code: cd_profilo, description: tx_descrizione };
    this.userLastModified = ptx_username_last_modified ? new User({
      ptx_username: ptx_username_last_modified,
    }) : undefined;
    this.authorizations = authorizations;
  }
  /**
   * Add authorization on the user
   * @param {AuthorizationDTO} authorizationToAdd the authorization to add
   */
  addAuthorization(authorizationToAdd) {
    if (!authorizationToAdd) {
      return;
    }
    this.authorizations.push(authorizationToAdd);
    this.authorizations.sort((authA, authB) => authA.code < authB.code);
  }
  /**
   * Remove authorization on the user
   * @param {AuthorizationDTO} authorizationToRemove the authorization to remove
   */
  removeAuthorization(authorizationToRemove = new AuthorizationDTO()) {
    this.authorizations.filter(authorization => authorizationToRemove.code !== authorization.code);
  }
  /**
   * set Authorizations
   * @param {AuthorizationDTO[]} authorizations the authorizations for the user
   */
  setAuthorizations(authorizations = []) {
    this.authorizations = authorizations;
  }
}
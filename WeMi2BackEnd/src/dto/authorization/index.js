/**
 * Authorization DTO
 */
export class AuthorizationDTO {
  /**
   * The constructor of the class
   * @param {object} dbObject the db object
   * @param {string} dbObject.cd_autorizzazione the authorization code
   * @param {string} dbObject.tx_descrizione the authorization description
   */
  constructor(dbObject = {}){
    this.code = dbObject.cd_autorizzazione;
    this.description = dbObject.tx_descrizione;
  }
}
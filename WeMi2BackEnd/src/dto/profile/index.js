/**
 * VO Profile 
 */
export class ProfileVO {
  /**
   * The constructor of the class
   * @param {*} dbObject the db object
   */
  constructor(dbObject = {}){
    const {
      cd_profilo,
      tx_descrizione,
    } = dbObject;
    this.code = cd_profilo;
    this.description = tx_descrizione;
  }
}

/**
 * DTO Profile 
 */
export class ProfileDTO {
  /**
   * The constructor of the class
   * @param {*} code the code
   * @param {*} description the description
   */
  constructor(code, description){
    this.code = code;
    this.description = description;
  }
}
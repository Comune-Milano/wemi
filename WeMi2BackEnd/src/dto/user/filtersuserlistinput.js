/**
 * Class to define User Profile to return to the client 
 * 
 */
export class FiltersUserListInput {
  /**
   * The constructor of the class
   * @param {object} params the user from db
   * @param {string} params.tx_nome_utente the name of the user
   * @param {string} params.tx_cognome_utente the surname of the user
   */
  constructor(params = {}) {
    const {
    name,
    surname,
    startValidDate,
    endValidDate,
    username,
    email,
    profile,
    order,
    elementsNumber,
    page,
  } = params;
 
    this.filters = { surname, name, username, email, startDate: startValidDate, endDate: endValidDate, profileCode: profile, order };
    this.limit = { elementsNumber, page };

  }
}

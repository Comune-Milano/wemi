import { ApolloError } from 'apollo-server';
import User from 'dto/UtenteDTO';
import UserDAO from 'dao/utente/UtenteDAO';
import psqlAdapter from 'helpers/psqlAdapter';
import { UserExtended } from 'dto/user';
import { FiltersUserListInput } from 'dto/user/filtersuserlistinput';
import { UserProfileDAO } from 'dao/userprofile';
import { FLAG_LAVORATORE, TY_AMMINISTRATORE_ENTE, TY_OPERATORE_ENTE } from 'constants/userroles';
import { AMMINISTRATORE, LAVORATORE, OPERATORE_ENTE } from 'constants/usercode';
import { CustomError } from 'router/errors';
import { UTENTE_NON_VALIDO, UTENTE_NON_RICONOSCIUTO } from 'errors/authorization';

const { db } = psqlAdapter;
/**
 * Class to calculate information on the user
 */
class UserDomain {
  /**
   * The constructor of the class
   * @param {*} context the context of graphql
   */
  constructor(context = {}) {
    const {
      db: connection,
      formatter,
      queryBuilder: helpers,
      logger,
    } = context;
    this.db = connection || db;
    this.formatter = formatter;
    this.helpers = helpers;
    this.logger = logger;
  }
  /**
   * Verify the existence of the user and the role of the user in the system
   * @param {User} utente the user to validate
   * @returns {User} the user validated
   */
  verificaUtente(utente) {
    return new UserDAO(this.db).verificaUtenza(utente);
  }
  /**
   * Verify if the user is Administrator
   * @param {User} utente the user to validate
   * @returns {User} the user validated
   */
  async verificaUtenteAdmin(utente) {
    const userDao = new UserDAO(this.db);
    let risultato;
    try {
      risultato = await userDao.verificaUtenteAdmin(utente);
    }
    catch(error){
      throw new CustomError(0, 'Impossibile verificare l\'utente');
    }
    if (risultato) {
      let userFound;
      try {
        userFound = await userDao.findUser(new User(risultato));
      } catch(error){
        throw new CustomError(0, 'Impossibile trovare l\'utente');
      }
      await this.checkUser(userFound);
      return userFound;
    }
    return null;
  }
  /**
   * The method to get the users 
   * @param {FiltersUserListInput} parameters the parameters
   * @returns {User[]} the users details
   */
  async getUsers(parameters = new FiltersUserListInput({})) {
    const userDao = new UserDAO(this.db, this.helpers, this.formatter);
    const offset = (parameters.limit.page - 1) * parameters.limit.elementsNumber;
    const usersDb = await userDao.findUsersByProfile(parameters.filters, { ...parameters.limit, offset });
    const users = usersDb || [];
    return users.reduce((acc, user) => ({
      totalRows: user.totalRows || 0,
      data: [
        ...acc.data, { ...new UserExtended(user), profile: { code: user.cd_profilo, description: user.tx_descrizione }},
      ],
    }), { data: [] });
  }
  /**
   * The method to get a user
   * @param {User} user the user 
   * @returns {User} the user with details
   */
  getUser(user = new User()) {
    return new UserDAO(this.db).findUser(user);
  }
  /**
   * The method to check the validation of the user
   * @param {User} user the user 
   * @returns {*} the user checked
   */
  async checkUser(user) {
    try {
      const userProfileDAO = new UserProfileDAO(this.db);
      return await userProfileDAO.checkValidationDate(new UserExtended(user));
    } catch(error){
      throw new CustomError(UTENTE_NON_VALIDO.code, UTENTE_NON_VALIDO.message);
    }
  }

  /**
   * The method to check the validation of the user
   * @param {string} email the user email 
   * @returns {UserExtended} the user
   */
  async loginLocal(email = '') {
    const utenteDao = new UserDAO(this.db);
    const utenteDTO = new User();
    utenteDTO.setEmail(email);
    const utente = await utenteDao.trovaUtenteByEmail(utenteDTO);
    if (!utente) {
      throw new ApolloError(UTENTE_NON_RICONOSCIUTO.message, UTENTE_NON_RICONOSCIUTO.code);
    }
    if (utente.fg_lavoratore === FLAG_LAVORATORE && utente.cd_profilo_utente !== AMMINISTRATORE) {
      utente.cd_profilo_utente = LAVORATORE;
    }
    else if (utente.cd_profilo_utente !== AMMINISTRATORE && (utente.ty_operatore_ente === TY_OPERATORE_ENTE || utente.ty_operatore_ente === TY_AMMINISTRATORE_ENTE)) {
      utente.cd_profilo_utente = OPERATORE_ENTE;
    }
    const user = new UserExtended();
    user.setIdUtente(utente.id_utente);
    user.setName(utente.tx_nome_utente);
    user.setIdEnte(utente.id_ente);
    user.setSurname(utente.tx_cognome_utente);
    user.setUsername(utente.ptx_username);
    user.setProfile(utente.cd_profilo_utente);
    user.profileObject = { code: utente.cd_profilo_utente };
    user.setPersonalData(utente.js_anagrafica_residenza);
    user.setFiscalCode(utente.ptx_codice_fiscale);
    user.setEmail(utente.ptx_email);
    user.setAuthorizations(utente.authorizations);
    // user.setGender(utente.cd_sesso_utente);
    user.setBirthday(utente.dt_nascita);
    if (utente.cd_profilo_utente === AMMINISTRATORE) {
      try {
        const validationDates = await this.checkUser({ ...utente, cd_profilo: utente.cd_profilo_utente });
        user.startValidDate = validationDates.dt_inizio_val;
        user.endValidDate = validationDates.dt_fine_val;
      } catch (error){
        throw new ApolloError(UTENTE_NON_VALIDO.message, UTENTE_NON_VALIDO.code);
      }

    }
    return user;
  }



}

export default UserDomain;

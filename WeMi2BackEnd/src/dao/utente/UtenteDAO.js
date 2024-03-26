import { isNull } from 'util';
import User from '../../dto/UtenteDTO';
import { InserimentoUtente, inserisciRutenteProfilo } from '../../sql/utente/inserimento';
import { selezionaByEmail, selezionaByUsername, selezionaByTyOperatoreAndEmail, selezionaByTyOperatoreAndUsername, findAllUsersAdministrators, verificaLavoratore, selezionaByIdUtenteSql } from '../../sql/utente/selezione';
import { updateUtente } from '../../sql/utente/update';
import { AMMINISTRATORE_ENTE, OPERATORE_ENTE, CITTADINO, LAVORATORE } from '../../constants/usercode';
import { TY_AMMINISTRATORE_ENTE, TY_OPERATORE_ENTE, TY_CITTADINO, FLAG_LAVORATORE } from '../../constants/userroles';
import { UserFormatter } from './formatter';
import { logger } from 'utility/logger/getInstance';
import { updateTimestampPrimoLoginSql } from 'sql/utente/update';
import { 
  selectUtenti,
  orderDefault,
  orderByUser,
  orderByProfile,
  selectFindUser,
} from 'sql/utente/selectUtenti';
import { ORDER_BY } from 'constants/db/gestioneutenze';
import { updateTyOperatoreEnteSql } from 'sql/utente/update';

/**
 * Class to interact with User Table 
 */
class UserDAO {
  /**
   * The constructor of the class
   * @param {object} db the connection object
   * @param {object} helpers the connection object
   * @param {object} formatter the connection object
   */
  constructor(db, helpers, formatter) {
    this.connection = db;
    if (formatter && helpers) {
      this.userFormatter = new UserFormatter(helpers, formatter);
    }
  }
  /**
   * Insert a user
   * @param {User} utente the user to insert 
   * @returns {User} the user inserted
   */
  async inserisciUtente(utente) {
    if (isNull(await this.trovaUtenteByEmail(utente))) {
      //Inserisci
      const risultato = await this.connection.oneOrNone(InserimentoUtente(utente), utente);
      await this.connection.none(inserisciRutenteProfilo, {risultato, utente });
      if (isNull(risultato)) {
        return null;
      }
      else {
        return risultato;
      }
    }
    else {
      const updatedUtente = await this.updateUtente(utente);
      return updatedUtente;
    }
  }
  /**
   * Finds the user by username
   * @param {User} utente the user
   * @returns {User} the result user
   */
  async trovaUtenteByUsername(utente) {
    const username = utente.getUsername();
    try {
      return await this.connection.oneOrNone(selezionaByUsername, { username });
    }
    catch (error) {
      logger.error(error, 'errore trovaUtenteByUsername');
      throw new Error(error);
    }

  }

  /**
   * Finds the user by email
   * @param {User} utente the user
   * @returns {User} the result user
   */
  async trovaUtenteByEmail(utente) {
    //TROVA UTENTE
    const email = utente.getEmail();
    try {
      return await this.connection.oneOrNone(selezionaByEmail, { email });
    }
    catch (error) {
      logger.error(error, 'trovaUtenteByEmail');
    }

  }

  /**
   * Update a user
   * @param {User} utente update the information of the user
   * @returns {User} the result user
   */
  async updateUtente(utente) {
    try {
      return await this.connection.oneOrNone(updateUtente(utente), utente);
    }
    catch (error) {
      logger.error(error, 'errore in UpdateUtente');
    }

  }
  /**
   * Verify the user logged with spid
   * @param {User} utenteInput verify the user and it's role
   * @returns {User} the user is trying to login
   */
  async verificaUtenza(utenteInput) {
    /**
     * Verifica se user è admin ente
     */
    if (await this.isAdminEnte(utenteInput)) {
      logger.info('Admin Ente');
      utenteInput.setOperatoreEnte(TY_AMMINISTRATORE_ENTE);
      try {
        const adminEnte = await this.trovaAmministratoreEnte(utenteInput);
        logger.info(adminEnte);
        utenteInput.setIdEnte(adminEnte.id_ente);
        utenteInput.setProfile(AMMINISTRATORE_ENTE);
        utenteInput.setIdUtente(adminEnte.id_utente);
        return utenteInput;
      }
      catch (error) {
        logger.error(error);
      }

    }
    /**
     * Verifica se user è operatore ente
     */
    else if (await this.isOperatoreEnte(utenteInput)) {
      logger.info('Operatore Ente');
      utenteInput.setOperatoreEnte(TY_OPERATORE_ENTE);
      try {
        const operatoreEnte = await this.trovaOperatoreEnte(utenteInput);
        utenteInput.setIdEnte(operatoreEnte.id_ente);
        utenteInput.setProfile(OPERATORE_ENTE);
        utenteInput.setIdUtente(operatoreEnte.id_utente);
        return utenteInput;
      }
      catch (error) {
        logger.error(error);
      }
    }
    /**
     * Verifica se user è lavoratore
     */
    else if (await this.isLavoratore(utenteInput)) {
      logger.info('Lavoratore ');
      try {
        const lavoratore = await this.trovaLavoratore(utenteInput);
        utenteInput.setFlagLavoratore(lavoratore.fg_lavoratore);
        utenteInput.setProfile(LAVORATORE);
        utenteInput.setOperatoreEnte(TY_CITTADINO);
        utenteInput.setIdUtente(lavoratore.id_utente);
        return utenteInput;
      }
      catch (error) {
        logger.error(error);
        throw new Error('Errore registrazione lavoratore');
      }
    }
    /**
     * Se non è nessuno degli altri, allora è un cittadino
     * INSERISCI UTENTE COME CITTADINO E TY_OPERATORE_ENTE = 0
     */
    else {
      logger.info('Cittadino');
      utenteInput.setOperatoreEnte(TY_CITTADINO);
      utenteInput.setProfile(CITTADINO);
      const risultato = await this.inserisciUtente(utenteInput);
      utenteInput.setIdUtente(risultato.id_utente);
      return utenteInput;
    }

  }
  /**
   * Verify if the user it's a Lavoratore
   * @param {User} utente the user
   * @returns {boolean} the validity of the test
   */
  async isLavoratore(utente) {
    try {
      const username = utente.getUsername();
      const risultato = await this.connection.oneOrNone(verificaLavoratore, { username, tyOperatore: TY_CITTADINO, fgLavoratore: FLAG_LAVORATORE });
      if (risultato !== null) {
        return true;
      }
      return false;
    }
    catch (error) {
      logger.error(error);
      return false;
    }
  }
  /**
   * Find the information of a user Lavoratore
   * @param {User} utente the user
   * @returns {User} the information of a user Lavoratore
   */
  async trovaLavoratore(utente) {
    try {
      const username = utente.getUsername();
      await this.updateUtente(utente);
      return await this.connection.oneOrNone(verificaLavoratore, { username, tyOperatore: TY_CITTADINO, fgLavoratore: FLAG_LAVORATORE });
    }
    catch (error) {
      logger.error(error);
    }
  }
  /**
   * Verify if the user is an admin
   * @param {User} utente the user
   * @returns {User} the admin user
   */
  async verificaUtenteAdmin(utente) {
    try {
      return await this.inserisciUtente(utente);
    }
    catch (error) {
      logger.error(error);
      throw (error);
    }
  }
  /**
   * Find the user operatore ente
   * @param {User} utente the user
   * @returns {User} the user
   */
  async trovaOperatoreEnte(utente) {
    try {
      const email = utente.getEmail();
      await this.updateUtente(utente);
      const operatoreEnte = await this.connection.oneOrNone(selezionaByTyOperatoreAndUsername, { email, tyOperatore: TY_OPERATORE_ENTE });
      if (!operatoreEnte.ts_primo_login) {
        await this.connection.none(updateTimestampPrimoLoginSql, { id_utente: operatoreEnte.id_utente });
      }

      return operatoreEnte;

    }
    catch (error) {
      logger.error(error);
    }
  }
  /**
   * Find the user admin ente
   * @param {User} utente the user
   * @returns {User} the user
   */
  async trovaAmministratoreEnte(utente) {
    try {
      const email = utente.getEmail();
      await this.updateUtente(utente);
      const adminEnte = await this.connection.oneOrNone(selezionaByTyOperatoreAndEmail, { email, tyOperatore: TY_AMMINISTRATORE_ENTE });
      if (!adminEnte.ts_primo_login) {
        await this.connection.none(updateTimestampPrimoLoginSql, { id_utente: adminEnte.id_utente });
      }

      return adminEnte;
    }
    catch (error) {
      logger.error(error);
    }
  }
  /**
   * Verify if the user is an admin ente
   * @param {User} utente the user
   * @returns {boolean} the validity of the test
   */
  async isAdminEnte(utente) {
    try {
      const email = utente.getEmail();
      const risultato = await this.connection.oneOrNone(selezionaByTyOperatoreAndEmail, { email, tyOperatore: TY_AMMINISTRATORE_ENTE });
      if (isNull(risultato)) {
        return false;
      }
      else {
        return true;
      }
    }
    catch (error) {
      logger.error(error);
    }
  }
  /**
   * Verify if the user is an operatore ente
   * @param {User} utente the user
   * @returns {boolean} the validity of the test
   */
  async isOperatoreEnte(utente) {
    try {
      const email = utente.getEmail();
      const risultato = await this.connection.oneOrNone(selezionaByTyOperatoreAndUsername, { email, tyOperatore: TY_OPERATORE_ENTE });
      if (isNull(risultato)) {
        return false;
      }
      else {
        return true;
      }
    }
    catch (error) {
      logger.error(error);
    }
  }

  /**
   * Find all the users that are administrators
   * @returns {User[]} an array of user
   */
  async findAllAdminUsers() {
    try {
      return await this.connection.many(findAllUsersAdministrators);
    }
    catch (error) {
      logger.error(error);
    }
  }

  /**
   * Insert an array of users
   * @param {User[]} users the users to insert
   * @returns {number[]} the ids of the users
   */
  async insertUsers(users) {
    const queryInsertOperators = this.userFormatter.formatInsert(users);
    logger.trace(queryInsertOperators, 'insert query for operators');
    const result = await this.connection.any(queryInsertOperators);
    return result;
  }
  /**
   * Update an array of users
   * @param {User[]} users the users to insert
   * @param {number} type the type of the user
   */
  async updateUsers(users, type) {
    const queryUpdateOperators = this.userFormatter.formatUpdate(users, type);
    logger.trace(queryUpdateOperators, 'update query for operators');
    await this.connection.none(queryUpdateOperators);
  }
  /**
   * Find all the users that are administrators
   * @param {object} filters the parameters to filter the users
   * @param {object} limit the parameters to limit the records
   * @returns {User[]} an array of user
   */
  async findUsersByProfile(filters, limit) {
    try {
      const select = selectUtenti;
      let queryOrder = orderDefault;
      const isCittadino = filters.profileCode === CITTADINO;

      const { conditions, limitQuery } = this.userFormatter.formatSelectFindUsers(filters, limit);    
      if(!filters.order){
        queryOrder = orderDefault;
      }
      if(!filters.order && isCittadino){
        queryOrder = orderByProfile;
      }
      if(filters.order === ORDER_BY.PROFILE){
        queryOrder = orderByProfile;
      }
      if(filters.order === ORDER_BY.SURNAME_NAME){
        queryOrder = orderByUser;
      }
      const query = select + conditions + queryOrder + limitQuery;
      return this.connection.any(query);
    }
    catch (error) {
      logger.error(error);
    }
  }
  /**
   * Find a user information
   * @param {User} user the user with id inside
   * @returns {User} an array of user
   */
  async findUser(user = new User()) {
    if(!user.idUtente){
      return user;
    }
    try {
      return await this.connection.one(selectFindUser, { user });
    }
    catch (error) {
      logger.error(error);
    }
  }

   /**
    * Find a user information
    * @param {User} user the user with id inside
    * @returns {User} an array of user
    */
  async findUserById(user = new User()) {
    if(!user.idUtente){
      return user;
    }
    try {
      return await this.connection.one(selezionaByIdUtenteSql, { id_utente: user.idUtente });
    }
    catch (error) {
      logger.error(error);
    }
  }
  updateTyOperatoreEnte(userId, newOperatoreEnte){
    this.connection.oneOrNone(updateTyOperatoreEnteSql, { id_utente: userId, ty_operatore_ente: newOperatoreEnte });
  }
}

export default UserDAO;

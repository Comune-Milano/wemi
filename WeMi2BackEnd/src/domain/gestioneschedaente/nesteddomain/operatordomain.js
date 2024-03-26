import path from 'path';
import { isNullOrUndefined } from 'util';
import { ApolloError } from 'apollo-server';
import { Institution } from 'dto/institution/institution';
import { AMMINISTRATORE, CITTADINO, OPERATORE_ENTE } from 'constants/usercode';
import { TY_OPERATORE_ENTE, TY_AMMINISTRATORE_ENTE, TY_CITTADINO, FLAG_LAVORATORE } from 'constants/userroles';
import { OperatorInstitutionDao } from 'dao/operatore/operatore';
import { STORAGE_BOUND_PATH } from 'environment';
import { logger } from 'utility/logger/getInstance';
import { INSERT_OPERATORE_WEMI_ADMIN_VALIDATION_ERROR, 
  INSERT_OPERATORE_VALIDATION_ERROR, 
  INSERT_OPERATORE_ADMIN_VALIDATION_ERROR,
  DELETE_OPERATORE_ASSOCIATO_VALIDATION_ERROR,
  INSERT_LAVORATORE_VALIDATION_ERROR
 } from 'errors/schedaente';
import UserDAO from 'dao/utente/UtenteDAO';
import { ProfileManager } from 'domain/profiles';
/**
 * Class to interact with scheda ente manager
 */
class OperatorDomain {
  /**
   * The constructor of the class
   * @param {object} context the graphql object for the context
   */
  constructor(context) {
    const { user, db, formatter, helpers } = context;
    this.logger = logger;
    this.user = user;
    this.db = db;
    this.formatter = formatter;
    this.helpers = helpers;
    const wemiMediaFilesPath = path.join(__dirname, STORAGE_BOUND_PATH, 'media');
    this.mediaPath = wemiMediaFilesPath;
  }
  /**
   * Checks the validity of the operators to insert
   * @param {object[]} operators the operators to insert
   * @param {number} institutionId the id of the institution
   * @returns {object[]} the users checked
   */
  async checkInsertUsersValidity(operators, institutionId){
    const users = operators || [];
    const operatorDao = new OperatorInstitutionDao( 
      this.db, 
      this.helpers, 
      this.formatter, 
      this.user
    );
    
    const resultUsers = await operatorDao.findExistentUsers(operators, institutionId || this.user.idEnte);
    
    for(const user of resultUsers){
      // è un lavoratore
      if ( user.fgLavoratore === FLAG_LAVORATORE ) {
        throw new ApolloError(
          INSERT_LAVORATORE_VALIDATION_ERROR.message,
          INSERT_LAVORATORE_VALIDATION_ERROR.code,
          { data: { userName: user.email } }
        );
      }
      if (user.profile === AMMINISTRATORE) {
        // è un admin wemi error
        throw new ApolloError(
          INSERT_OPERATORE_WEMI_ADMIN_VALIDATION_ERROR.message,
          INSERT_OPERATORE_WEMI_ADMIN_VALIDATION_ERROR.code,
          { data: { userName: user.email } }
        );
      }
      if (user.type === TY_OPERATORE_ENTE) {
        const operator = await operatorDao.findOperator(user);
        // è un operatore di un altro ente errore
        throw new ApolloError(
          INSERT_OPERATORE_VALIDATION_ERROR.message,
          INSERT_OPERATORE_VALIDATION_ERROR.code,
          { data: { nomeEnte: operator.nm_ente, userName: user.email } }
        );
      }
      if (user.type === TY_AMMINISTRATORE_ENTE) {
        const operator = await operatorDao.findAdmin(user);
        // è admin di un altro ente errore
        throw new ApolloError(
          INSERT_OPERATORE_ADMIN_VALIDATION_ERROR.message,
          INSERT_OPERATORE_ADMIN_VALIDATION_ERROR.code,
          { data: { nomeEnte: operator.nm_ente, userName: user.email } }
        );
      }
    };

    return users;
  }
  /**
   * Checks the validity of the operators to delete
   * @param {object[]} operators the operators to delete
   * @returns {object[]} the users checked
   */
  checkDeleteUsersValidity(operators){
    const users = operators || [];
    users.forEach(user => {
      if (user.id === this.user.idUtente) {
        //non posso eliminare utente corrente errore
        throw new ApolloError(
          DELETE_OPERATORE_ASSOCIATO_VALIDATION_ERROR.message,
          DELETE_OPERATORE_ASSOCIATO_VALIDATION_ERROR.code,
          { data: { user } }
        );
      }
    });
    return users;
  }
  /**
   * The tasks to perform the insert of the authorized operators
   * @param {Institution} institutionDTO the dto for the query
   */
  async insertAuthorizedOperators(institutionDTO) {
    const id = institutionDTO.getId();
    const operatorDao = new OperatorInstitutionDao(
      this.db, 
      this.helpers, 
      this.formatter, 
      this.user,
    );
    const userDao = new UserDAO(
      this.db, 
      this.helpers, 
      this.formatter, 
    );
    const userProfileManager = new ProfileManager({
      db: this.db,
      formatter: this.formatter,
      helpers: this.helpers,
      logger: this.logger,
    });
    /**
     * Checking the operators to delete and to add
     */
    const institutionDeletedOp = await operatorDao.findDeleteOperators(institutionDTO);
    this.checkDeleteUsersValidity(institutionDeletedOp.getDeletedOperators());
    const institutionNewOp = await operatorDao.findNewOperators(institutionDTO);
    const otherUsers = await operatorDao.findExistentUsers(
      institutionDTO.getAuthorizedOperators(),
      institutionDTO.id
    );
    this.checkInsertUsersValidity(otherUsers);
  
    const { deletedOperators } = institutionDeletedOp;
    const updatedOperators = otherUsers;
    const { authorizedOperators: insertOperators } = institutionNewOp;

    if (isNullOrUndefined(insertOperators)) {
      return;
    }
    if (updatedOperators.length > 0) {
      await userDao.updateUsers(updatedOperators, TY_OPERATORE_ENTE);
      await operatorDao.insertOperators(updatedOperators, id);
      await userProfileManager.updateProfiles(updatedOperators.map(operator => ({
        id:operator.id,
        code: CITTADINO,
      }) ), OPERATORE_ENTE, this.user);
    }

    if (deletedOperators.length > 0) {
      await operatorDao.deleteOperators(deletedOperators, id);
      await userDao.updateUsers(deletedOperators, TY_CITTADINO);
      await userProfileManager.updateProfiles(deletedOperators.map(operator => ({
        id:operator.id,
        code:OPERATORE_ENTE,
      }) ), CITTADINO, this.user);
    }

    if (insertOperators.length > 0) {

      const result = await userDao.insertUsers(insertOperators);
      await operatorDao.insertOperators(result, id);
      await userProfileManager.updateProfiles(result.map(operator => ({
        id:operator.id,
        code: CITTADINO,
      }) ), OPERATORE_ENTE, this.user);
    }
  }

}

export default OperatorDomain;

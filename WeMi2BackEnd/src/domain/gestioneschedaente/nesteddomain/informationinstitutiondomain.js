import path from 'path';
import { STORAGE_BOUND_PATH } from 'environment';
import { InformationInstitutionDao } from 'dao/institution/ente';
import { Institution } from 'dto/institution/institution';
import { STATO_SCHEDA_ENTE } from 'constants/db/statoschedaente';
/**
 * Class to interact with scheda ente manager
 */
class InformationInstitutionDomain {
  /**
   * The constructor of the class
   * @param {object} context the graphql object for the context
   */
  constructor(context) {
    const { user, db, logger, formatter, helpers } = context;
    this.logger = logger;
    this.user = user;
    this.db = db;
    this.formatter = formatter;
    this.helpers = helpers;
    const wemiMediaFilesPath = path.join(__dirname, STORAGE_BOUND_PATH, 'media');
    this.mediaPath = wemiMediaFilesPath;
  }
  /**
   * The tasks to perform the insert of the authorized operators
   * @param {Institution} institutionDTO the dto for the query
   */
  async insertInformations(institutionDTO){
    const institutionDao = new InformationInstitutionDao(
      this.db, 
      this.helpers, 
      this.formatter, 
      this.user,
    );
    await institutionDao.updateCorporateData(institutionDTO);
  }
  /**
   * The tasks to perform the insert of the authorized operators
   * @param {number} institutionId the institution id
   * @param {number} state the state for the institution
   * @returns {Institution} the result institution
   */
  async changeState(institutionId, state){
    const informationInstitutionDao = new InformationInstitutionDao(
      this.db,
      this.helpers,
      this.formatter
    );
    const institutionSaved = await informationInstitutionDao.findLastState(new Institution({
      institutionId,
    }));

    const { state: objectState } = institutionSaved;
    
    /**
     * Se la scheda è stata compilata non cambio più lo stato a compilata
     */
    if ((objectState.code <= STATO_SCHEDA_ENTE.COMPILATA && state <= STATO_SCHEDA_ENTE.COMPILATA) 
    && (objectState.code === STATO_SCHEDA_ENTE.DISATTIVATA)){
      return undefined;
    }
    /**
     * Se scheda è da correggere cambio lo stato
     */
    if (objectState.code === STATO_SCHEDA_ENTE.DA_CORREGGERE) {
      return await informationInstitutionDao.updateState(new Institution({
        institutionState: {
          code: state,
          userModified: this.user.idUtente,
        },
        institutionId,
      }));
    }
    /**
     * Se scheda è da disattivare cambio lo stato
     */
    if (state === STATO_SCHEDA_ENTE.DISATTIVATA) {
      return await informationInstitutionDao.updateState(new Institution({
        institutionState: {
          code: state,
          userModified: this.user.idUtente,
        },
        institutionId,
      }));
    }
    /**
     * Se la scheda non è mai stata compilata allora cambia stato
     */
    if (objectState.code < STATO_SCHEDA_ENTE.COMPILATA && state < STATO_SCHEDA_ENTE.COMPILATA) {
      return await informationInstitutionDao.updateState(new Institution({
        institutionState: {
          code: state,
          userModified: this.user.idUtente,
        },
        institutionId,
      }));
    }
    /**
     * Se la scheda è stata compilata non cambio più lo stato a compilata
     */
    if (objectState.code >= STATO_SCHEDA_ENTE.COMPILATA && state <= STATO_SCHEDA_ENTE.COMPILATA){
      return undefined;
    }

    return await informationInstitutionDao.updateState(new Institution({
      institutionState: {
        code: state,
        userModified: this.user.idUtente,
      },
      institutionId,
    }));
  }

}

export default InformationInstitutionDomain;

import path from 'path';
import { ApolloError } from 'apollo-server';
import { Institution } from 'dto/institution/institution';
import { STORAGE_BOUND_PATH } from 'environment';
import { OfficeInstitutionDao } from 'dao/sede/sede';
import { ServizioErogatoEnteController } from 'controller/servizioErogatoEnte/ServizioErogatoEnteController';
import { DELETE_SECONDARY_OFFICE_VALIDATION_ERROR } from 'errors/schedaente';

/**
 * Class to interact with scheda ente manager
 */
class OfficeDomain {
  /**
   * The constructor of the class
   * @param {object} context the graphql object for the context
   */
  constructor(context) {
    const { user, db, logger, formatter, helpers, queryBuilder } = context;
    this.logger = logger;
    this.user = user;
    this.db = db;
    this.formatter = formatter;
    this.helpers = helpers;
    const wemiMediaFilesPath = path.join(__dirname, STORAGE_BOUND_PATH, 'media');
    this.mediaPath = wemiMediaFilesPath;
    this.queryBuilder = queryBuilder;
  }
  /**
   * The tasks to perform the insert of the authorized operators
   * @param {Institution} institutionDTO the dto for the query
   * @returns {Institution} the result object
   */
  async insertPrimaryOffice(institutionDTO){
    const officeInstitutionDao = new OfficeInstitutionDao(
      this.db, 
      this.helpers, 
      this.formatter, 
      this.user,
    );

    const institutionOffice = await officeInstitutionDao.findPrimaryOffice(institutionDTO);
    const primaryOffice = institutionOffice.getPrimaryOffice();
    if(!!(primaryOffice)){
      return await officeInstitutionDao.updatePrimaryOffice(institutionDTO);
    }
    return await officeInstitutionDao.insertPrimaryOffice(institutionDTO);
  }
  /**
   * The tasks to perform the validation of offices to delete
   * @param {number} institutionId the id of the institution
   * @param {object} offices the dto for the query
   * @returns {null} the result object
   */
  async checkDeleteSecondaryOffices(institutionId, offices){
    const officeInstitutionDao = new OfficeInstitutionDao(
      this.db, 
      this.helpers, 
      this.formatter, 
      this.user,
    );
    const officesForServices = await officeInstitutionDao.findAllSediErogatrici(this.user.idEnte || institutionId);
    const officesToValidate = offices || [];
    officesToValidate.forEach(office => {
      const foundOffice = officesForServices.find(serviceOffice => serviceOffice.id === office.id);

      if (foundOffice) {
        //non posso eliminare la sede perchè collegata a più servizi
        throw new ApolloError(
          DELETE_SECONDARY_OFFICE_VALIDATION_ERROR.message,
          DELETE_SECONDARY_OFFICE_VALIDATION_ERROR.code,
          { data: { office } }
        );
      }
    });
  
    return offices;
   
  }
  /**
   * The tasks to perform the insert of the authorized operators
   * @param {Institution} institutionDTO the dto for the query
   * @returns {Institution} the result object
   */
  async insertSecondaryOffices(institutionDTO){
    const officeInstitutionDao = new OfficeInstitutionDao(
      this.db, 
      this.helpers, 
      this.formatter, 
      this.user,
    );
    //Trova sedi secondarie
    const institution = await officeInstitutionDao.findSecondaryOffices(institutionDTO);
    const allSecondaryOffices = institution.getSecondaryOffices();
    const secondaryOffices = institutionDTO.getSecondaryOffices();
    //Vedi quelle da eliminare
    //Elimina
    const secondaryToDelete = allSecondaryOffices.filter(office => {
      const found = secondaryOffices.find(secOffice => secOffice.id === office.id);
      if(!found){
        return true;
      }
      return false;
    });
    this.logger.trace(secondaryToDelete, 'deleted offices');
    await this.checkDeleteSecondaryOffices(institutionDTO.id, secondaryToDelete);
    await officeInstitutionDao.deleteSecondaryOffices(new Institution({
      institutionLocations: secondaryToDelete,
      institutionId: institutionDTO.id,
    }));
    //Vedi quelle da inserire
    //Inserisci
    const secondaryToInsert = secondaryOffices.filter(office => {
      if(office.id){
        return false;
      }
      return true;
    });
    this.logger.trace(secondaryToInsert, 'to insert offices');
    await officeInstitutionDao.insertSecondaryOffices(new Institution( {
      institutionLocations: secondaryToInsert,
      institutionId: institutionDTO.id,
    }));
    //Vedi quelle da aggiornare
    //Aggiorna
    const secondaryToUpdate = secondaryOffices.filter(office => {
      if(office.id){
        return true;
      }
      return false;
    });
    this.logger.trace(secondaryToUpdate, 'to update offices');
    await officeInstitutionDao.updateSecondaryOffices(new Institution( {
      institutionLocations: secondaryToUpdate,
      institutionId: institutionDTO.id,
    }));
    return secondaryOffices;
    
  }
}

export default OfficeDomain;

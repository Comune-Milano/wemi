import { ApolloError } from 'apollo-server';
import RicercaServiziDao from '../../dao/ricercaServizi/ricercaServiziDao';
import { TOKEN_DATA_NOT_VALID } from 'errors/token';
/**
 * The class to map the domain of filters
 */
export class FiltersDomain {
  /**
   * The constructor of the class
   * @param {object} context the context
   */
  constructor(context = {}) {
    this.logger = context.logger;  
    this.db = context.db;  
    this.formatter = context.formatter;  
  }
  /**
   * Check if the first array has elements in the other
   * @param {number[]} firstArray the first array
   * @param {number[]} secondArray the first array
   */
  checkArrayFilter (firstArray = [], secondArray = []) {
    firstArray.forEach(elementFirst => {
      const foundElement = secondArray.find(elementSecond => elementFirst === elementSecond);
      if(!foundElement){
        throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
      }
    });
  };
  /**
   * Checks if the tasks of a required category are valid
   * @param {object} idService the id of the category
   * @param {object} filters the filters object
   */
  async validateTasks(idService, filters = {}){
    const { mansioni = [] } = filters;
    if(!mansioni.length > 0){
      return;
    }
    const ricercaServiziDao = new RicercaServiziDao(this.db, this.formatter);
    const filterMansioniDb = await ricercaServiziDao.getMansioni(idService);
    if(!filterMansioniDb.length > 0){
      throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
    }
    const filtersMansioni = filterMansioniDb || [];
    const mappedMansioni = filtersMansioni.map(mansione => mansione.id);
    this.checkArrayFilter(mansioni, mappedMansioni);
  }
  /**
   * Checks if the recipient of a required category are valid
   * @param {object} idService the id of the category
   * @param {object} filters the filters object
   */
  async validateRecipient(idService, filters = {}){
    const { destinatari = [] } = filters;
    if(!destinatari.length > 0){
      return;
    }
    const ricercaServiziDao = new RicercaServiziDao(this.db, this.formatter);
    const filterDestinariDb = await ricercaServiziDao.getDestinatari(idService);
    if(!filterDestinariDb.length > 0){
      throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
    }
    this.logger.info(filterDestinariDb, 'filters destinatari');
    const filterDestinari = filterDestinariDb || [];
    const mappedDestinatari = filterDestinari.map(destinatario => destinatario.id);
    this.checkArrayFilter(destinatari, mappedDestinatari);
  }
  /**
   * Checks if the time slots of a required category are valid
   * @param {object} idService the id of the category
   * @param {object} filters the filters object
   */
  async validateTimeSlots(idService, filters = {}){
    const { fasceOrarie = [] } = filters;
    if(!fasceOrarie.length > 0){
      return;
    }
    const ricercaServiziDao = new RicercaServiziDao(this.db, this.formatter);
    const filterFasceOrarieDb = await ricercaServiziDao.getFasceOrarie(idService);
    if(!filterFasceOrarieDb.length > 0){
      throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
    }
    this.logger.info(filterFasceOrarieDb, 'filters fasce orarie');
    const filterFasceOrarie = filterFasceOrarieDb || [];
    const mappedFasceOrarie = filterFasceOrarie.map(fasciaOraria => fasciaOraria.id);
    this.checkArrayFilter(fasceOrarie, mappedFasceOrarie);
  }
  /**
   * Checks if the services status of a required category are valid
   * @param {object} idService the id of the category
   * @param {object} filters the filters object
   */
  async validateServicesStatus(idService, filters = {}){
    const { cdStatoServizi = [] } = filters;
    if(!cdStatoServizi.length > 0){
      return;
    }
    const ricercaServiziDao = new RicercaServiziDao(this.db, this.formatter);
    const filterStatoServiziDb = await ricercaServiziDao.getCdStatoServizi(idService);
    if(!filterStatoServiziDb.length > 0){
      throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
    }
    this.logger.info(filterStatoServiziDb, 'filter state services');
    const filterStatoServizi = filterStatoServiziDb || [];
    const mappedStatiServizi = filterStatoServizi.map(statoServizio => statoServizio.id);
    this.checkArrayFilter(cdStatoServizi, mappedStatiServizi);
  }
  /**
   * Checks if the price of a required category is valid
   * @param {object} idService the id of the category
   * @param {object} filters the filters object
   */
  async validatePrice(idService, filters = {}){
    const { prezzo } = filters;
    if(!prezzo){
      return;
    }
    const ricercaServiziDao = new RicercaServiziDao(this.db, this.formatter);
    
    const filterPrezzoMaxMin = await ricercaServiziDao.getPrezzoMaxMin(idService, filters);
    if(!filterPrezzoMaxMin){
      return;
    }
    this.logger.info(filterPrezzoMaxMin, 'filter max price');
    
    const { prezzoMax, prezzoMin } = filterPrezzoMaxMin;

    if(!(prezzo >= prezzoMin)) {
      throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
    }
    if(!(prezzo <= prezzoMax)){
      throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
    }
  }
  /**
   * Checks if the quantity of unit and person of a required category is valid
   * @param {object} idService the id of the category
   * @param {object} filters the filters object
   */
  async validateQuantities(idService, filters = {}){
    const { quantitaPersone, quantitaUnita } = filters;
    if(!quantitaPersone || !quantitaUnita){
      return;
    }
    const ricercaServiziDao = new RicercaServiziDao(this.db, this.formatter);
    
    const filterMinQtPersone = await ricercaServiziDao.getMinPersoneQuantita(idService);
    this.logger.info(filterMinQtPersone, 'filter min person');
    if(!filterMinQtPersone){
      return;
    }
    const { numeroMinimoPersone, 
        numeroMinimoUnita, 
        limiteMinimoPersoneAssoluto,
        limiteMassimoPersoneAssoluto,
    } = filterMinQtPersone;
    
    if(!(quantitaUnita >= numeroMinimoUnita)) {
      throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
    } 
    if(!(quantitaPersone >= numeroMinimoPersone)){
      throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
    } 
    if(!(quantitaPersone >= limiteMinimoPersoneAssoluto)){
      throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
    } 
    if(!(quantitaPersone <= limiteMassimoPersoneAssoluto)){
      throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
    }
  }
  /**
   * Checks if the services of a required service are valid
   * @param {object[]} services the id of the category
   * @param {object} filters the filters object
   * @param {number} idService the filters the id of the category
   */
  async validateServices(services = [], filters = {}, idService){
    if(!services.length > 0){
      return;
    }
    const ricercaServiziDao = new RicercaServiziDao(this.db, this.formatter);
    const filterServicesDb = await ricercaServiziDao.getServices(services, filters, idService);
    if(!filterServicesDb.length > 0){
      throw new ApolloError(TOKEN_DATA_NOT_VALID.message, TOKEN_DATA_NOT_VALID.code);
    }
    this.logger.info(filterServicesDb, 'services valid');
    const filterServices = filterServicesDb || [];
    const mappedServicesDb = filterServices.map(service => service.idServizioEnte);
    const mappedServices = services.map(service => service.idServizioEnte);
    this.checkArrayFilter(mappedServices, mappedServicesDb);
  }
  /**
   * Checks the payload of the token
   * @param {object} data the payload
   */
  async validatePayload(data = {}){
    const { services = [], filters = {}, idService } = data;
    await this.validateTasks(idService, filters);
    await this.validateRecipient(idService, filters);
    await this.validateTimeSlots(idService, filters);
    await this.validateServicesStatus(idService, filters);
    await this.validatePrice(idService, filters);
    await this.validateQuantities(idService, filters);
    await this.validateServices(services, filters, idService);
  }
}

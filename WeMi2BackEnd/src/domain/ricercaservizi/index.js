// import { ApolloError } from 'apollo-server';
import { createToken, decodeToken } from './utils';
import { FiltersDomain } from './filters';
// import { TOKEN_SERVICE_EXPIRED } from 'errors/token';
/**
 * The class to map the domain of search services
 */
export class RicercaServiziDomain {
  /**
   * The constructor of the class
   * @param {object} context the context
   */
  constructor(context = {}) {
    this.context = context;  
    this.logger = context.logger;
  }
  /**
   * Checks the payload of the token
   * @param {object} data the payload
   * @returns {string} the token
   */
  async createToken(data = {}){
    const { services = [], filters = {}, idService, page, ...rest } = data;
    // await this.validatePayload(data);
    const token = createToken({ services, filters, idService, page, ...rest });
    this.logger.info(token, 'the jwt to return');
    return token;
  }
  /**
   * Checks the payload of the token
   * @param {object} payload the payload
   * @returns {object} the payload mapped
   */
  mapPayLoad(payload = {}){
    const { filters: payloadFilters = {}, services = [], ...others } = payload;
    const { ...rest } = payloadFilters;
    const newPayload = { filters: { ...rest }, ...others };
    newPayload.filters.gratuito = payloadFilters.gratuito || false;
    newPayload.filters.prezzo = payloadFilters.prezzo;
    newPayload.filters.cdStatoServizi = payloadFilters.cdStatoServizi || [];
    newPayload.filters.mansioni = payloadFilters.mansioni || [];
    newPayload.filters.destinatari = payloadFilters.destinatari || [];
    newPayload.filters.fasceOrarie = payloadFilters.fasceOrarie || [];
    newPayload.filters.quantitaPersone = payloadFilters.quantitaPersone || 1;
    newPayload.filters.quantitaUnita = payloadFilters.quantitaUnita || 1;
    newPayload.filters.municipio = payloadFilters.municipio;
    newPayload.filters.indirizzo = payloadFilters.indirizzo || '';
    newPayload.services = services;
    newPayload.idService = payload.idService;
    newPayload.page = payload.page;
    return newPayload;
  }
  /**
   * Checks the token and verify the payload
   * @param {string} token the token
   * @returns {string} the token
   */
  async validateData(token = ''){
    const payload = this.checkToken(token);
    await this.validatePayload(payload);
    return this.mapPayLoad(payload);
  }
/**
 * Check and extract the data from the token
 * @param {string} token the token
 * @returns {object} of the token decoded  
 */
  checkToken(token = ''){
    /**
     * If not exist the token can't validate
     */
    if(!token){
      // throw new ApolloError(TOKEN_SERVICE_EXPIRED.message, TOKEN_SERVICE_EXPIRED.code);
      return;
    }
    const decodedObject = decodeToken(token);
    this.logger.info(decodedObject, 'the decoded object from jwt');
      /**
       * If the token has expired return empty
       */
    if (!decodedObject){
      // throw new ApolloError(TOKEN_SERVICE_EXPIRED.message, TOKEN_SERVICE_EXPIRED.code);
      return;
    }
    return decodedObject;
  }
  /**
   * Checks the payload of the token
   * @param {object} data the payload
   */
  checkPayload(data = {}) {
    const { services = [], filters = {}, idService } = data;
    if(!(services.length > 0) || !(Object.keys(filters).length > 0 || !idService)){
      // throw new ApolloError(TOKEN_SERVICE_EXPIRED.message, TOKEN_SERVICE_EXPIRED.code);
      return;
    }
  }
  /**
   * Checks the payload of the token
   * @param {object} data the payload
   */
  async validatePayload(data = {}){
    this.checkPayload(data);
    const filterDomain = new FiltersDomain(this.context);
    await filterDomain.validatePayload(data);
  }
}

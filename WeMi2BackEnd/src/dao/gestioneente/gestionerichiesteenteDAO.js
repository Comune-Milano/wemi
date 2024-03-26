import { countFeedbackNotRequested, countFeedbackToConfirm, countFeedbackConfirmed } from "sql/recensioneente/countfeedback";
import { logger } from "utility/logger/getInstance";
import { ApolloError } from "apollo-server";
import { selectCountEstraiPerIdEnte } from "sql/richiestaente/selectCountEstraiPerIdEnte";
import { selectListaEstraiPerIdEnte } from "sql/richiestaente/selectListaEstraiPerIdEnte";
import { COUNT_FEEDBACK_ENTE_ERROR, COUNT_RICHIESTE_ENTE_ERROR, GET_RICHIESTE_ENTE_ERROR } from "errors/gestionerichieste";


export class GestioneRichiesteEnteDAO {
  constructor(db) {
    this.db = db;
    this.logger = logger;
  }

  async countFeedbackToConfirmForEnte(idEnte){
    try{
      const { count } = await this.db.one(countFeedbackToConfirm, { idEnte } );
      return count;
    }
    catch(error){
      this.logger.error(error, "errore nel count dei feedback non richiesti");
      throw new ApolloError(COUNT_FEEDBACK_ENTE_ERROR.message, COUNT_FEEDBACK_ENTE_ERROR.code);
    }
  }

  async countFeedbackConfirmedForEnte(idEnte){
    try{
      const { count } = await this.db.one(countFeedbackConfirmed, { idEnte } );
      return count;
    }
    catch(error){
      this.logger.error(error, "errore nel count dei feedback confermati");
      throw new ApolloError(COUNT_FEEDBACK_ENTE_ERROR.message, COUNT_FEEDBACK_ENTE_ERROR.code);
    }
  }
  /**
   * @param {Int} idEnte l'id dell'ente
   */
  async countFeedbackNotRequestedForEnte(idEnte) {
    try{
      const { count } = await this.db.one(countFeedbackNotRequested, { idEnte } );
      return count;
    }
    catch(error){
      this.logger.error(error, "errore nel count dei feedback non richiesti");
      throw new ApolloError(COUNT_FEEDBACK_ENTE_ERROR.message, COUNT_FEEDBACK_ENTE_ERROR.code);
    }
  }

  /**
   * @param {Int} idEnte l'id dell'ente
   * @param {Object} parameters the parameters for the query
   */
  async countRequestsForEnte(idEnte, parameters) {
    try{
      const { richiedente } = parameters;
      const userParameter = richiedente? richiedente : "";
      const [nome, cognome] = userParameter.split(" ");
      const selectCountEstraiPerIdEnteConst = selectCountEstraiPerIdEnte(parameters, nome, cognome);
      const queryParameters = {
        ...parameters, 
        idEnteErogatore: idEnte, 
        nome, 
        cognome,
      };
      const { count } = await this.db.one(selectCountEstraiPerIdEnteConst, queryParameters);
      return count;
    }
    catch(error){
      this.logger.error(error, "errore nel count delle richieste ente");
      throw new ApolloError(COUNT_RICHIESTE_ENTE_ERROR.message, COUNT_RICHIESTE_ENTE_ERROR.code);
    }
  }

   /**
   * @param {Int} idEnte l'id dell'ente
   * @param {Object} parameters the parameters for the query
   */
  async getRequestsForEnte(idEnte, parameters) {
    try{
      const { richiedente } = parameters;
      const userParameter = richiedente? richiedente : "";
      const [nome, cognome] = userParameter.split(" ");
      const selectListaEstraiPerIdEnteConst = selectListaEstraiPerIdEnte(parameters, nome, cognome);
      const queryParameters = {
        ...parameters, 
        idEnteErogatore: idEnte, 
        nome, 
        cognome,
      };
      return await this.db.any(selectListaEstraiPerIdEnteConst, queryParameters);
    }
    catch(error){
      this.logger.error(error, "errore nel trovare le richieste ente");
      throw new ApolloError(GET_RICHIESTE_ENTE_ERROR.message, GET_RICHIESTE_ENTE_ERROR.code);
    }
  }

}
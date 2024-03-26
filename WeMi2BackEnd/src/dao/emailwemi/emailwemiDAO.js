import { findWemiEmail, findEmailServizioWeMI, findWemiNumeroVerde, findUserInfoByIdWorker, findServiziCandidato, findIdServizio, findUserInfoByIdRichiesta, findName, findDatiLavoratore, findDatiEnte, selectNumeroFamiglia, selectNumerolavoratore, selectEmailWemi} from "../../sql/emailwemi/selezione";
import { logger } from "utility/logger/getInstance";
import { selectLogoHeaderWeMi } from "sql/contenuto/selectlogoheaderwemi";
import { ID_ENTE_WEMI } from 'constants/db/enteWeMi';

/**
 * Class to interact with parametro_generale Table 
 */

class EmailWeMiDAO {
    /**
    * @param {db} indicates the connection object
    *
    */
    constructor(db) {
        this.connection = db;
    }
    /**
    *
    *
    */
    async findWeMiBaseInfo() {

        try {
            const emailWeMi = await this.connection.one(findWemiEmail);
            const emailServizioWeMi = await this.connection.one(findEmailServizioWeMI);
            const numeroVerde = await this.connection.one(findWemiNumeroVerde);
            const risultato = { 
                emailWeMi: emailWeMi.valore_tx_parametro, 
                numeroVerdeWeMi: numeroVerde.valore_tx_parametro,
                emailServizioWeMi: emailServizioWeMi.valore_tx_parametro, 
            };
            return risultato;  
        }
        catch (error) {
            logger.error(error);
        }
    }

    
    async findContatti() {
        try {
             const famiglia= await this.connection.one(selectNumeroFamiglia);
             const lavoratore= await this.connection.one(selectNumerolavoratore);
             const email= await this.connection.one(selectEmailWemi);

             const risultato = { emailWeMi: email.valore_tx_parametro, telefonoFamiglie: famiglia.valore_tx_parametro, telefonoLavoratori: lavoratore.valore_tx_parametro };
            return risultato;
        }
        catch (error) {
            logger.error(error);
        }
    }

    async findUserInfo(idLavoratore) {
        try {
             return await this.connection.one(findUserInfoByIdWorker, { idLavoratore });
        }
        catch (error) {
            logger.error(error);
        }
    }

    async findLogoFileWeMi() {
        try {
             return await this.connection.one(findDatiEnte, {idEnte : ID_ENTE_WEMI});
        }
        catch (error) {
            logger.error(error, 'error finding logo wemi');
        }
    }

    async findLogoFileEnte(idEnte) {
        try {
             return await this.connection.one(findDatiEnte, {idEnte});
        }
        catch (error) {
            logger.error(error, 'error finding logo ente');
        }
    }

    async findLogoHeaderEmail() {
        try {
             return await this.connection.one(selectLogoHeaderWeMi);
        }
        catch (error) {
            logger.error(error, 'error finding logo header');
        }
    }
    
    async findUserInfoIdRichiesta(idRichiesta) {
        try {
             return await this.connection.one(findUserInfoByIdRichiesta, { idRichiesta });
        }
        catch (error) {
            logger.error(error);
        }
    }

    async findNameServiceByIdService(idServizio) {
        try {
             return await this.connection.one(findName, { idServizio });
        }
        catch (error) {
            logger.error(error);
        }
    }
    
    async findServiziCandidatoByIdLavoratore(idLavoratore) {
        try {
             const risQ= await this.connection.one(findServiziCandidato, { idLavoratore });
             const keys= Object.keys(risQ);
             const ris= [];
             keys.forEach(el=> { if(risQ[el]) ris.push(el) });
             return ris
        }
        catch (error) {
            logger.error(error);
        }
    }

    async findIdServizioByIdRichiesta(idRichiesta) {

        try {
            return this.connection.oneOrNone(findIdServizio, { idRichiesta });
        }
        catch (error) {
            logger.error(error);
        }
    }

    async findDatiLavoratoreById(idLavoratore) {
        try {
             return await this.connection.one(findDatiLavoratore, { idLavoratore });
        }
        catch (error) {
            logger.error(error);
        }
    }
    
}

export default EmailWeMiDAO;

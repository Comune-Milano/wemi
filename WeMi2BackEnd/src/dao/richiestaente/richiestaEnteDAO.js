import { isNull } from "util";
import { findByIdRichiesta, findEnteInfoByIdRichiesta, findIdServizio, findEnte, findEmailPagamento, findNomeServizio, EstraiLogoWeMi, estraiIdRichiestaBase, findByIdServizioEnte, findDescrServizio} from "../../sql/richiestaente/selezione";
import { logger } from "utility/logger/getInstance";

/**
 * Class to interact with richiesta_servizio_ente Table 
 */

class RichiestaEnteDAO {
    /**
    * @param {db} indicates the connection object
    *
    */
    constructor(db) {
        this.connection = db;
    }
    /**
    * @param {Integer} idRichiesta the id of the request
    *
    */
    async findUserByIdRichiesta(idRichiesta) {

        try {
            const risultato = this.connection.oneOrNone(findByIdRichiesta, { idRichiesta });
            if (isNull(risultato)) {
                return null;
            }
            else {
                return risultato;
            }
        }
        catch (error) {
            logger.error(error);
        }
    }

    async findIdRichiestaBase(idRichiestaEnte) {

        try {
            return this.connection.oneOrNone(estraiIdRichiestaBase, { idRichiestaEnte }); 
        }
        catch (error) {
            logger.error(error);
        }
    }

    async findLogoWeMi() {

        try {
            return this.connection.oneOrNone(EstraiLogoWeMi);
        }
        catch (error) {
            logger.error(error);
        }
    }

    async findAllEnteByIdRichiesta(idRichiesta) {

        try {
            return this.connection.oneOrNone(findEnte, { idRichiesta });
        }
        catch (error) {
            logger.error(error);
        }
    }

    /**
    * @param {Integer} idRichiesta the id of the request
    *
    */
   async findEnteInfoByIdRichiesta(idRichiesta) {

    try {
        const risultato = this.connection.oneOrNone(findEnteInfoByIdRichiesta, { idRichiesta });
        if (isNull(risultato)) {
            return null;
        }
        else {
            return risultato;
        }
    }
    catch (error) {
        logger.error(error);
    }
}

async findIdServizioByIdRichiesta(idRichiesta) {
    try {
        const risultato = this.connection.oneOrNone(findIdServizio, { idRichiesta });
        if (isNull(risultato)) {
            return null;
        }
        else {
            return risultato;
        }
    }
    catch (error) {
        logger.error(error);
    }
}

async findDescrServizioByIdServizio(idServizio) {

    try {
        const risultato = this.connection.oneOrNone(findDescrServizio, { idServizio });
        if (isNull(risultato)) {
            return null;
        }
        else {
            return risultato;
        }
    }
    catch (error) {
        logger.error(error);
    }
}

async findNomeServizioByIdRichiesta(idRichiesta) {

    try {
        return this.connection.oneOrNone(findNomeServizio, { idRichiesta });
        }
    catch (error) {
        logger.error(error);
    }
}

async findEmailPagamentoByIdRichiesta(idRichiesta) {

    try {
        return this.connection.oneOrNone(findEmailPagamento, { idRichiesta });
    }
    catch (error) {
        logger.error(error);
    }
}

async findDatiByIdServizioEnte(idServizioEnte) {

    try {
        return this.connection.oneOrNone(findByIdServizioEnte, { idServizioEnte });
    }
    catch (error) {
        logger.error(error);
    }
}


}

export default RichiestaEnteDAO;

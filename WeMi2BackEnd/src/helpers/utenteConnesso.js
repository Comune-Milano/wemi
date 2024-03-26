import { HEADER_NAME } from '../constants/authentication/cookie';
import { isNullOrUndefined } from 'util';
import { mockUtente as dati } from "../mocks/utenteConnesso";
import { verifyUser } from '../utility/user/verifyuser';
import { logger } from "utility/logger/getInstance";

export const tradeUserInformation = async (request) => {

    let objUser = {
        isAmministratore: dati.isAmministratore
    };

    try {
        const session = request.session;

        const user = verifyUser(session.user);

        objUser = { ...objUser, ...user };

        logger.info(objUser)
    }
    catch (error) {
        logger.info(error, 'utente non autenticato');
    }

    objUser.onlyAmministratore = () => {}

    return objUser;
}


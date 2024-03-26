import { TY_OPERATORE_ENTE, TY_AMMINISTRATORE_ENTE, TY_CITTADINO } from "../constants/userroles";
import { CITTADINO, AMMINISTRATORE_ENTE, OPERATORE_ENTE, AMMINISTRATORE } from '../constants/usercode';
import { logger } from "utility/logger/getInstance";

/**
 * @deprecated
 * @param {String} profile
 * @param {Integer} role 
 * Check the role of the user Cittadino
 */
const checkUserRole = (profile,role) =>{
    if (profile === CITTADINO) {
        if (role === TY_CITTADINO) {
            return CITTADINO;
        }
        else if (role === TY_AMMINISTRATORE_ENTE) {
            return AMMINISTRATORE_ENTE;
        }
        else if (role === TY_OPERATORE_ENTE) {
            return OPERATORE_ENTE;
        }
        else {
            logger.error('The citizen user profile does not match any of the allowed roles.');
            //throw Errore
        }
    }
    else if (profile === AMMINISTRATORE) {
        return AMMINISTRATORE;
    }
    else {
        logger.error('The user profile does not match any of the allowed profiles.');
    }
};

export default checkUserRole;
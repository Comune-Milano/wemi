import { TY_AMMINISTRATORE_ENTE, TY_OPERATORE_ENTE } from "../constants/userroles";
import { CITTADINO } from '../constants/usercode';
/**
 * @deprecated
 * @param {String} profile
 * @param {Integer} role 
 * Check the role of the user Amministratore Ente and Operatore Ente
 */
const validateCittadino = (profile, role) =>{
    if (profile === CITTADINO) {
        if (role === TY_OPERATORE_ENTE) {
            return true;
        }
        else if(role === TY_AMMINISTRATORE_ENTE){
            return true;
        }
        else{
            return false;
        }
    }
    else {
        return false;
    }
};

export default validateCittadino;
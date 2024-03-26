import { TY_CITTADINO } from "../constants/userroles";
import { CITTADINO } from '../constants/usercode';
/**
 * @deprecated
 * @param {String} profile
 * @param {Integer} role 
 * Check the role of the user Cittadino
 */
const validateCittadino = (profile, role) =>{
    if (profile === CITTADINO) {
        if (role === TY_CITTADINO) {
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
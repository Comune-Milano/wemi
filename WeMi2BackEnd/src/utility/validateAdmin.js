import { AMMINISTRATORE } from '../constants/usercode';
/**@deprecated
 * @param {String} profile
 * @param {Integer} role 
 * Check the role of the user Amministratore WeMi
 */
const validateAdmin = (profile, _) =>{
    if (profile === AMMINISTRATORE) {
        return true;
    }
    else {
        return false;
    }
};

export default validateAdmin;
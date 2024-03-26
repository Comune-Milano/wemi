import { isNull } from "util";
import { AMMINISTRATORE } from "types/userRole";

const checkAdmin = (datiLogin) => {
    if(!isNull(datiLogin)){
       return datiLogin.Profilo === AMMINISTRATORE;
    }
    return false;
    
}

export default checkAdmin;
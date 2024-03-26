import { isNull } from "util";
import { CITTADINO, LAVORATORE } from "types/userRole";

const checkCittadino = (datiLogin) => {
    if(!isNull(datiLogin)){
        return datiLogin.Profilo === CITTADINO || datiLogin.Profilo === LAVORATORE;
    }
    return false;
    
}

export default checkCittadino;
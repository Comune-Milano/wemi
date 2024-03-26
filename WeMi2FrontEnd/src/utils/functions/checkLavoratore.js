import { isNull } from "util";
import { LAVORATORE } from "types/userRole";

const checkLavoratore = (datiLogin) => {
    if(!isNull(datiLogin)){
        return datiLogin.Profilo === LAVORATORE;
    }
    return false;
    
}

export default checkLavoratore;
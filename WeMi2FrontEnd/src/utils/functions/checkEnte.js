import { isNull } from "util";
import { OPERATORE_ENTE, AMMINISTRATORE_ENTE } from "types/userRole";

const checkEnte = (datiLogin) => {
    if(!isNull(datiLogin)){
        if(datiLogin.Profilo === OPERATORE_ENTE){
            return true;
        }
        else if(datiLogin.Profilo === AMMINISTRATORE_ENTE){
            return true;
        }
        else{
            return false;
        }
    }
    return false;
    
}

export default checkEnte;
import { CITTADINO, AMMINISTRATORE_ENTE, AMMINISTRATORE, OPERATORE_ENTE, LAVORATORE } from "types/userRole";

const checkProfile = (profile) =>{
    let resultProfile;
    switch(profile){
        case CITTADINO:
            resultProfile=CITTADINO;
            break;
        case AMMINISTRATORE_ENTE:
            resultProfile = AMMINISTRATORE_ENTE;
            break; 
       case AMMINISTRATORE: 
            resultProfile=AMMINISTRATORE;
            break;
        case OPERATORE_ENTE:
            resultProfile=OPERATORE_ENTE;
            break;
        case LAVORATORE:
            resultProfile = LAVORATORE;
            break;
        default:
            break;
    }
    return resultProfile;
};

export default checkProfile;
import { checkValidityForm6_1_1, checkValidityForm6_1, checkValidityForm6_2 } from './';
import { isNullOrUndefined } from 'util';

const checkValidity = (configDisponibilita) => {
    let validita1, validita2, validita11;
    if (configDisponibilita.tipologiaOrario) {
        if (configDisponibilita.tipologiaOrario.id === 1 ||
            configDisponibilita.tipologiaOrario.id === 5) {
            validita1 = checkValidityForm6_1(configDisponibilita);
            validita2 = checkValidityForm6_2(configDisponibilita);
        }

        else {
            validita1 = checkValidityForm6_1(configDisponibilita);
            validita2 = checkValidityForm6_2(configDisponibilita);
            validita11 = checkValidityForm6_1_1(configDisponibilita);
        }
    }
    let jsonValidita ={form1:false,form2:false};
    if (validita1) {
        jsonValidita.form1 = true;
    }
    if(!isNullOrUndefined(validita11)){
        jsonValidita.form11 = validita11;
    }
    
    if(validita2){
        jsonValidita.form2 = true;
    }
    // else if(configDisponibilita.stepper.id===4){
    //     jsonValidita.form3 = true;
    // }
    jsonValidita.form3=true;
    return jsonValidita;
    
}

export default checkValidity;
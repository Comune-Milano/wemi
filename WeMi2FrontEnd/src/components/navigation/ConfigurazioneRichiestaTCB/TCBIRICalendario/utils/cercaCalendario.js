import { isNullOrUndefined } from "util";

const cercaCalendario = (arrayDisponibilita) => {
    let risultato = [];
    if(arrayDisponibilita){
      for(let i=0; i<arrayDisponibilita.length; i+=1){  
          if(!isNullOrUndefined(arrayDisponibilita[i].calendarioTCB)){
            risultato= arrayDisponibilita[i].calendarioTCB;
          }
      };
    } 

    return risultato;
}

export default cercaCalendario;
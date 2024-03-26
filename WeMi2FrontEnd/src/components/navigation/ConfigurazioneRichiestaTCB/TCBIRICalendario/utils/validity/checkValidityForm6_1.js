const checkValidityForm6_1 = (configDisponibilita) =>{
    if(configDisponibilita.tipologiaOrario){
        if(configDisponibilita.tipologiaOrario.id===1
            &&configDisponibilita.stipendio
            &&configDisponibilita.stipendio.id!==-1
            &&configDisponibilita.giorniSettimana
            &&configDisponibilita.giorniSettimana.length>0){
            return true;
        }
        else if(configDisponibilita.tipologiaOrario.id===2
            &&configDisponibilita.stipendio
            &&configDisponibilita.spaziPrevisti&&configDisponibilita.spaziPrevisti.length>0){
                return true;
        }
        else if(configDisponibilita.tipologiaOrario.id===3&&configDisponibilita.stipendio&&configDisponibilita.stipendio.id!==-1){
            return true;
        }
        else if(configDisponibilita.tipologiaOrario.id===4&&configDisponibilita.stipendio&&configDisponibilita.stipendio.id!==-1){
            return true;
        }
        else if(configDisponibilita.tipologiaOrario.id===5&&configDisponibilita.stipendio&&configDisponibilita.stipendio.id!==-1){
            return true;
        }
        else if(configDisponibilita.tipologiaOrario.id===6&&configDisponibilita.stipendio&&configDisponibilita.stipendio.id!==-1){
            return true;
        }
    }
    return false;
}

export default checkValidityForm6_1;
const checkValidityForm6_1_1 = (configDisponibilita) => {
    if(configDisponibilita.nrOreRichieste&&configDisponibilita.nrOreRichieste>0){
        return true;
    }
    return false;
}

export default checkValidityForm6_1_1;
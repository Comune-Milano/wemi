const checkValidityForm6_2 = (configDisponibilita) =>{
    if(configDisponibilita.tipoContratto&&configDisponibilita.tipoContratto.id!==-1){
        return true;
    }
    return false;
}

export default checkValidityForm6_2;
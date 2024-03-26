const cercaValore = (arrayDisponibilita, cd_attributo) => {

    if (arrayDisponibilita) {
        for (let i = 0; i < arrayDisponibilita.length; i += 1) {
            if (arrayDisponibilita[i].cd_attributo === cd_attributo) {
                if (arrayDisponibilita[i].tx_val !== null){
                     return {
                        id: arrayDisponibilita[i].cd_val_attributo,
                        value: arrayDisponibilita[i].tx_val
                    };
                   
                }
                
    
                if (arrayDisponibilita[i].tx_nota !== null)
                    return arrayDisponibilita[i].tx_nota;

                if (arrayDisponibilita[i].nr_val !== null)
                   return arrayDisponibilita[i].nr_val
                   

                if (arrayDisponibilita[i].fg_val !== null)
                    return {
                        id: arrayDisponibilita[i].cd_val_attributo,
                        value: arrayDisponibilita[i].fg_val
                    };
                    if (arrayDisponibilita[i].dt_val !== null)
                    return arrayDisponibilita[i].dt_val

            }
        }
    }
    return null
}

export default cercaValore;
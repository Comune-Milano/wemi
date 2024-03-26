

const cercaValore = (arrayDisponibilita, cd_attributo, dominio) => {

    if (arrayDisponibilita) {
        for (let i = 0; i < arrayDisponibilita.length; i += 1) {
            if (arrayDisponibilita[i].cd_attributo === cd_attributo) {
                if (arrayDisponibilita[i].tx_val !== null && dominio === true) {
                    return {
                        id: arrayDisponibilita[i].cd_val_attributo,
                        value: arrayDisponibilita[i].tx_val
                    };
                }
                if (arrayDisponibilita[i].tx_val !== null && dominio === false) {
                    return arrayDisponibilita[i].tx_val;
                }
                if (arrayDisponibilita[i].tx_nota !== null){
                    return arrayDisponibilita[i].tx_nota;
                }
                    
                if (arrayDisponibilita[i].dt_val !== null){
                    return arrayDisponibilita[i].dt_val;
                }
                
                if (arrayDisponibilita[i].fg_val !== null){
                    return {
                        id: arrayDisponibilita[i].fg_val==='1'? 1 : 0,
                        value: arrayDisponibilita[i].fg_val==='1'? 'Si' : 'No'
                    };
                }

                if (arrayDisponibilita[i].nr_val !== null){
                    return arrayDisponibilita[i].nr_val;
                }


                

            }
        }
    }
    return null;
}

export default cercaValore;
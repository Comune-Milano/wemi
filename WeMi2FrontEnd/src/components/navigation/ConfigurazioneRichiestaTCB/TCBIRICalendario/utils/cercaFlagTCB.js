const cercaFlagTCBConNota = (disponibilita,cd_attributo)=>{
    if(disponibilita)
    for(let i=0; i<disponibilita.length; i+=1)
        if(disponibilita[i].cd_attributo===cd_attributo)
            return {
                id: disponibilita[i].cd_val_attributo,
                value: disponibilita[i].fg_val,
                nota: disponibilita[i].tx_nota
            }
}

export default cercaFlagTCBConNota;
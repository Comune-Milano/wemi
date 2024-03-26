export const crea_calendario= (data)=>{
    let giorni = [
        "Lunedì",
        "Martedì",
        "Mercoledì",
        "Giovedì",
        "Venerdì",
        "Sabato",
        "Domenica"]
    let calendario = []
    if(data.length>0){
        for(el of data){
            calendario[el.data] = el.disponibilita
        }
    }
    if(data)
    for (let i = 0; i < disponibilita.length; i++) {
        let MA, MD, PD, PA
        for (let y = 0; y < disponibilita[i].fascia.length; y++) {

            let cont1 = 0
            let cont2 = 0

            for (let t = 0; t < disponibilita[i].fascia[y].ore.length; t++) {

                if (y == 0) {
                    if (disponibilita[i].fascia[y].ore[t].attivo == true) {
                        cont1++
                        if (cont1 == 1)
                            MD = disponibilita[i].fascia[y].ore[t].txValue
                        if (cont1 == 2) {
                            MA = disponibilita[i].fascia[y].ore[t].txValue
                        }
                    }
                } else
                    if (y == 1) {
                        if (disponibilita[i].fascia[y].ore[t].attivo == true) {
                            cont2++
                            if (cont2 == 1)
                                PD = disponibilita[i].fascia[y].ore[t].txValue
                            if (cont2 == 2) {
                                PA = disponibilita[i].fascia[y].ore[t].txValue
                            }
                        }
                    }
            }




        }
        calendario.push({
            giorno: giorni[i], disponibilita: [
                MD ? {
                    oraDa: MD, fascia: "Mattino",
                    oraA: MA
                } : null,
                PD ? {
                    oraDa: PD, fascia: "Pomeriggio",
                    oraA: PA
                } : null,
            ],
        })
}}
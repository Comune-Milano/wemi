import React from 'react';
import Calendario from 'components/ui/Calendario';
import Text from 'components/ui/Text';
import Input from 'components/ui/Input';
import {Row} from 'components/ui/Grid';
import { connect } from 'react-redux';
import { TCBDispConfig,TCBMenuNavigazione } from 'redux-modules/actions/tcbActions';
import {cercaValore, attributi,cercaCalendario} from '../../../utils';
import { isNullOrUndefined } from 'util';
const calcolaNumeroOreRichieste = (calendario) =>{
    let numeroOreRichieste=0;
   
    if(calendario){
        for(let i=0; i<calendario.length; i+=1){
            let fascia = calendario[i].fascia;
            for(let j=0; j<fascia.length; j+=1){
                let orario = fascia[j].ore;
                for(let z=0; z<orario.length; z+=1){
                    if(orario[z].compreso||orario[z].attivo){
                        numeroOreRichieste++;
                
                    }
                }
            }
                
        }  
    }
    return numeroOreRichieste;
}

const JsonDisponibilita = (disponibilita) => {

    let giorni = [
        "Lunedì",
        "Martedì",
        "Mercoledì",
        "Giovedì",
        "Venerdì",
        "Sabato",
        "Domenica"]
    let calendario = []
    if(disponibilita)
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

    }



let calendario2={
                 'calendario': calendario.length > 0 ?calendario :''

               }

    return (
        calendario2
    )

}



const Disponibilita = ({ disponibilita, TCBMenuNavigazione,menuNavigazione,TCBDispConfig, configDisponibilita}) =>(
    <>
    {configDisponibilita.tipologiaOrario && (
        configDisponibilita.tipologiaOrario.id===2 ||
        configDisponibilita.tipologiaOrario.id===3 ||
        configDisponibilita.tipologiaOrario.id===4 ||
        configDisponibilita.tipologiaOrario.id===6
        ) ?
        <>
         <Row fluid flex alignitems="center" justifycontent="space-between">
            <Text value="Numero ore richieste" color="darkGrey" size="f7" />
            <Input disabled type="disabled" initialValue={!isNullOrUndefined(configDisponibilita.nrOreRichieste)? 
                configDisponibilita.nrOreRichieste :  
                cercaValore(disponibilita,attributi.NR_ORE_RICHIESTE.cd_attributo)} />
        </Row>
    <Row fluid padding="1em 0">
     {/* CONVINVENZA RIDOTTA, NON CONVIVENTE, ASSISTENZA NOTTURNA */}
     <Text value="Qual'è la disponibilità settimanale richiesta? *" size="f7" color="darkGrey" />
     <Calendario 
        getValue={(value)=>{
            TCBDispConfig({...configDisponibilita,calendario: value, 
            calendario1: JsonDisponibilita(value),
            nrOreRichieste: calcolaNumeroOreRichieste(value)});
            TCBMenuNavigazione({...menuNavigazione, unsaved:true});
        }}
            ValoriDaAttivare = { !isNullOrUndefined(configDisponibilita.calendario1)? configDisponibilita.calendario1: 
           {calendario:  cercaCalendario(disponibilita,configDisponibilita.tipologiaOrario)}
        }
        sizeLabelDay="f6"
        sizeLabelTimeSlot="f10"
        sizeLabelHour="f9"
     
     />
             {/* CONVINVENZA RIDOTTA, NON CONVIVENTE, ASSISTENZA NOTTURNA */}
    </Row>
    </>
    : null}
    </>);
Disponibilita.displayName = ' Disponibilita';  
const mapStoreToProps = store => ({
    sistemazioni: store.graphql.infoDisponibilita && store.graphql.infoDisponibilita.EstraiSistemazione,
    locale: store.locale,
    configDisponibilita: store.requestTCB.configDisponibilita,
    menuNavigazione: store.requestTCB.menuNavigazione,
    
});
const mapDispatchToProps = ({
    TCBDispConfig,
    TCBMenuNavigazione
})
export default connect(mapStoreToProps,mapDispatchToProps)(Disponibilita);
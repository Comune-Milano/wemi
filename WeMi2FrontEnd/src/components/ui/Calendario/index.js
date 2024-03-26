/** @format */

import React, { useEffect,useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import styled, {css} from 'styled-components';
import { colors } from 'theme';
import { connect } from 'react-redux';
import { TCBSecondStepper } from 'redux-modules/actions/authActions';
import { isNullOrUndefined } from 'util';

const TestColumn = styled(Column)`
text-align:center;
`

const MyDiv = styled.div`
text-align:center;
width:100%;
border-style: solid;
border-color:  ${colors.grey} ;
border-width: 1px 1px 0px 1px;
&:last-child {
border-width: 1px 1px 1px 1px;
};
${props => props.pom && css`
border-width: 1px 1px 0px 0px;
&:last-child {
    border-width: 1px 1px 1px 0px;
    }
`}
background-color: ${props => (props.attivo ? colors.primary :props.compreso ? colors.primary: 'unset')}  !important;
color: ${props => (props.attivo ? colors.white : 'unset')}  !important;
transition: all .2s ease-in-out;
`

const SpecialColumn = styled.div`
width: calc(100%/7.1);
padding-right: .5em;
`



let GiorniSettimana = [{attivo: false,txValue:"Lunedì", contM:0,contP:0,fascia:
 [{attivo: false,txValue:"Mattino",ore:[{txValue:"01"},{ txValue: "02"},
{ txValue: "03"},{ txValue: "04"},{ txValue: "05"},
{ txValue: "06"},{ txValue: "07"},{ txValue: "08"},
{ txValue: "09"},{ txValue: "10"},{ txValue: "11"}, 
{ txValue:"12"}]},
{attivo: false,txValue: "Pomeriggio", ore: [{txValue:"13"},{ txValue: "14"},
{ txValue: "15"},{ txValue: "16"},{ txValue: "17"},
{ txValue: "18"},{ txValue: "19"},{ txValue: "20"},
{ txValue: "21"},{ txValue: "22"},{ txValue: "23"}, 
{ txValue:"24"}]}]}, 
{attivo: false,txValue:"Martedì",contM:0,contP:0,fascia: [{attivo: false,txValue:"Mattino",ore:[{txValue:"01"},{ txValue: "02"},
{ txValue: "03"},{ txValue: "04"},{ txValue: "05"},
{ txValue: "06"},{ txValue: "07"},{ txValue: "08"},
{ txValue: "09"},{ txValue: "10"},{ txValue: "11"}, 
{ txValue:"12"}]},
{attivo: false,txValue: "Pomeriggio", ore: [{txValue:"13"},{ txValue: "14"},
{ txValue: "15"},{ txValue: "16"},{ txValue: "17"},
{ txValue: "18"},{ txValue: "19"},{ txValue: "20"},
{ txValue: "21"},{ txValue: "22"},{ txValue: "23"}, 
{ txValue:"24"}]}]}, 
{attivo: false,txValue:"Mercoledì",contM:0,contP:0,fascia: [{attivo: false,txValue:"Mattino",ore:[{txValue:"01"},{ txValue: "02"},
{ txValue: "03"},{ txValue: "04"},{ txValue: "05"},
{ txValue: "06"},{ txValue: "07"},{ txValue: "08"},
{ txValue: "09"},{ txValue: "10"},{ txValue: "11"}, 
{ txValue:"12"}]},
{attivo: false,txValue: "Pomeriggio", ore: [{txValue:"13"},{ txValue: "14"},
{ txValue: "15"},{ txValue: "16"},{ txValue: "17"},
{ txValue: "18"},{ txValue: "19"},{ txValue: "20"},
{ txValue: "21"},{ txValue: "22"},{ txValue: "23"}, 
{ txValue:"24"}]}]},
 {attivo: false,txValue:"Giovedì",contM:0,contP:0,fascia: [{attivo: false,txValue:"Mattino",ore:[{txValue:"01"},{ txValue: "02"},
 { txValue: "03"},{ txValue: "04"},{ txValue: "05"},
 { txValue: "06"},{ txValue: "07"},{ txValue: "08"},
 { txValue: "09"},{ txValue: "10"},{ txValue: "11"}, 
 { txValue:"12"}]},
 {attivo: false,txValue: "Pomeriggio", ore: [{txValue:"13"},{ txValue: "14"},
{ txValue: "15"},{ txValue: "16"},{ txValue: "17"},
{ txValue: "18"},{ txValue: "19"},{ txValue: "20"},
{ txValue: "21"},{ txValue: "22"},{ txValue: "23"}, 
{ txValue:"24"}]}
]},
 {attivo: false,txValue: "Venerdì",contM:0,contP:0,fascia: [{attivo: false,txValue:"Mattino",ore:[{txValue:"01"},{ txValue: "02"},
 { txValue: "03"},{ txValue: "04"},{ txValue: "05"},
 { txValue: "06"},{ txValue: "07"},{ txValue: "08"},
 { txValue: "09"},{ txValue: "10"},{ txValue: "11"}, 
 { txValue:"12"}]},
 {attivo: false,txValue: "Pomeriggio", ore: [{txValue:"13"},{ txValue: "14"},
 { txValue: "15"},{ txValue: "16"},{ txValue: "17"},
 { txValue: "18"},{ txValue: "19"},{ txValue: "20"},
 { txValue: "21"},{ txValue: "22"},{ txValue: "23"}, 
 { txValue:"24"}]}
]},
{attivo: false,txValue: "Sabato",contM:0,contP:0,fascia: [{attivo: false,txValue:"Mattino",
ore:[{txValue:"01"},{ txValue: "02"},
{ txValue: "03"},{ txValue: "04"},{ txValue: "05"},
{ txValue: "06"},{ txValue: "07"},{ txValue: "08"},
{ txValue: "09"},{ txValue: "10"},{ txValue: "11"}, 
{ txValue:"12"}]},
{attivo: false,txValue: "Pomeriggio", ore: [{txValue:"13"},{ txValue: "14"},
{ txValue: "15"},{ txValue: "16"},{ txValue: "17"},
{ txValue: "18"},{ txValue: "19"},{ txValue: "20"},
{ txValue: "21"},{ txValue: "22"},{ txValue: "23"}, 
{ txValue:"24"}]}
]},
{attivo: false,txValue: "Domenica",contM:0,contP:0,fascia: [{attivo: false,txValue:"Mattino",ore:[{txValue:"01"},{ txValue: "02"},
{ txValue: "03"},{ txValue: "04"},{ txValue: "05"},
{ txValue: "06"},{ txValue: "07"},{ txValue: "08"},
{ txValue: "09"},{ txValue: "10"},{ txValue: "11"}, 
{ txValue:"12"}]},
{attivo: false,txValue: "Pomeriggio", ore: [{txValue:"13"},{ txValue: "14"},
{ txValue: "15"},{ txValue: "16"},{ txValue: "17"},
{ txValue: "18"},{ txValue: "19"},{ txValue: "20"},
{ txValue: "21"},{ txValue: "22"},{ txValue: "23"}, 
{ txValue:"24"}]}]}];

const Calendario = ({ getValue,ValoriDaAttivare,Deseleziona,Disabilita,sizeLabelDay,sizeLabelTimeSlot,sizeLabelHour }) => {

    useEffect(()=>{
   if(ValoriDaAttivare){
        DeselezionaOra()
              if(ValoriDaAttivare.calendario) {
                for(let i=0; i<ValoriDaAttivare.calendario.length;i++){
                    if(!isNullOrUndefined(ValoriDaAttivare.calendario[i])){
                    for(let y=0;  y<ValoriDaAttivare.calendario[i].disponibilita.length;y++){
                        if(!isNullOrUndefined(ValoriDaAttivare.calendario[i].disponibilita[y])){
                                               
                                     OraSelezionata( ValoriDaAttivare.calendario[i].disponibilita[y].oraA,
                                                        ValoriDaAttivare.calendario[i].disponibilita[y].fascia, 
                                                        ValoriDaAttivare.calendario[i].giorno)
                       
                                        OraSelezionata( ValoriDaAttivare.calendario[i].disponibilita[y].oraDa,
                                                        ValoriDaAttivare.calendario[i].disponibilita[y].fascia, 
                                                        ValoriDaAttivare.calendario[i].giorno)
                                        }
        
                    }
                }
                }
              }
        
    }
    
    if(Deseleziona){
       DeselezionaOra()
    }
       
    },[])
    const DeselezionaOra=() => {
        let array = GiorniSettimana;
        
        for(let i=0; i<array.length; i+=1){
            if(array[i].contM)
            array[i].contM=0
            if(array[i].contP)
            array[i].contP=0
            for(let j=0; j<array[i].fascia.length; j+=1){
                for(let z=0; z<array[i].fascia[j].ore.length; z+=1){
                    if(array[i].fascia[j].ore[z].attivo===true)
                    array[i].fascia[j].ore[z].attivo=false;
                       if( array[i].fascia[j].ore[z].compreso===true){
                        array[i].fascia[j].ore[z].compreso=false
                        
                      
                    }
                }
            }
        }
        getValue([...array])
       //return true
    }


    const eliminaCompresi=(i,j)=>{
        let via=0
        let array = GiorniSettimana;
       
                for(let z=0; z<array[i].fascia[j].ore.length; z+=1){
                    if (array[i].fascia[j].ore[z] ) 
                
                    if(array[i].fascia[j].ore[z].attivo===true){
                        via=via+1
                        
                    }
                    if(array[i].fascia[j].ore[z])
                    if(via===1){
                        array[i].fascia[j].ore[z].compreso=false
                    }
         
        }
        getValue([...array])
    }
    const selezionaCompresi=(i,j)=>{
        let via=0
        let array = GiorniSettimana;
        
      
     
        
                for(let z=0; z<array[i].fascia[j].ore.length; z+=1){
                   if (array[i].fascia[j].ore[z] ) 
                    if(array[i].fascia[j].ore[z].attivo===true){
                        via=via+1
                       
                    }
                    if(array[i].fascia[j].ore[z])
                    if(via===1){
                        array[i].fascia[j].ore[z].compreso=true
                    }
                }

        getValue([...array])
    }



    const OraSelezionata = (ora,fascia,giorno) => {
      
        let array = GiorniSettimana;
        

        for(let i=0; i<array.length; i+=1){
        

            for(let j=0; j<array[i].fascia.length; j+=1){
                for(let z=0; z<array[i].fascia[j].ore.length; z+=1){
                      
                   
                    if(array[i].txValue===giorno&& array[i].fascia[j].txValue===fascia&&array[i].fascia[j].ore[z].txValue===ora ){
                        
                        if (array[i].fascia[j].ore[z].attivo===true){

                            if(j===0)
                            array[i].contM= array[i].contM-1 
                            else 
                            array[i].contP= array[i].contP-1 
                            eliminaCompresi(i,j)
                        
                        array[i].fascia[j].ore[z].attivo=false;}
                        else{
                            if (j===0 && array[i].contM!=2){
                            array[i].contM= array[i].contM+1 
                        array[i].fascia[j].ore[z].attivo=true;
                        array[i].fascia[j].attivo=true;

                       
                    
                    }
                        else if (j===1 && array[i].contP!=2){
                            array[i].contP= array[i].contP+1 
                        array[i].fascia[j].ore[z].attivo=true;

                       
                        }
                    }
                     }
                     if (array[i].contM===2&&j===0){

                          
                       selezionaCompresi(i,j)
                     } 
                    
                    if(array[i].contP===2&&j===1){
                    
                   selezionaCompresi(i,j)
                }
                    
                }

            }
            
        }
      
        getValue([...array])
    }
    
    return (
            <Row fluid justifycontent="space-between" direction="row">
              
                {  GiorniSettimana.map((giorno,index) => (
                   
                        <SpecialColumn key={index.toString()}>
                            <Text value={giorno.txValue} size={sizeLabelDay? sizeLabelDay:"f6"} weight="bold" color="primary" />
                            <Row fluid justifycontent="flex-start" direction="row">
                                { giorno.fascia.map((fascia, index2) => (
                                
                                        <TestColumn key={index2.toString()} xs="6" justifycontent="center" padding="0">
                                        <Row fluid justifycontent="flex-start">
                                            <Text value={fascia.txValue} size={sizeLabelTimeSlot? sizeLabelTimeSlot:"f9"} weight="bold" />
                                            </Row>
                                            <Row fluid>
                                            {fascia.ore.map((ora,index) => (
                                                        <MyDiv key={index} attivo={ora.attivo} compreso={ora.compreso} pom={index2 === 1}  onClick={()=>{  !Disabilita&& OraSelezionata(ora.txValue,fascia.txValue,giorno.txValue)}}>
                                                            <Text value={ora.txValue} size={sizeLabelHour?sizeLabelHour:"f7"} />
                                                        </MyDiv>
                                            ))}
                                            </Row>
                                        </TestColumn>
                                   
                                ))}
                            </Row>
                        </SpecialColumn>
                
                ))}
            </Row>
            
     
    );
    
}


Calendario.displayName = ' Calendario';

const mapDispatchToProps = ({
    TCBSecondStepper
});

const mapStoreToProps = store => ({
    Stepper: store.stepperTCB
})
export default connect(mapStoreToProps, mapDispatchToProps)(Calendario);
/** @format */

import React, { useState, useEffect } from 'react';
import { Row } from "components/ui/Grid";
import { connect } from "react-redux";
import { graphqlRequest, resetField } from 'redux-modules/actions/authActions';
import { EstraiDettaglioAmministrativoServizioEnte as EstraiDettaglioAmministrativoServizioEnteQ } from './EntGOI005GraphQL';
import Loader from 'components/ui/Loader';
import {
  Destinatari,
  Ente,
  InformazioniServizio,
  PersonaleEsterno, 
 PersonaleInterno, 
 Prezzo, 
 PrimoContatto, 
 PrimoContattoDaCompilare, 
 SedeErogazione,
 Servizio,
 SostegniEconomici,
 Buttons
} from './accordionPartials';
import { isNullOrUndefined } from 'util';

const AccordionServAcc = ({ graphqlRequest,EstraiDettaglioAmministrativoServizioEnte,loaded,resetField }) => {
  let array;


  const [note,setnote]=useState({notedest:"",noteserv:"",notesede:"",notepers:"",noteprezzo:""})
  const [key , setKey]= useState({destinatari1:"",destinatari2:""})
  const [primocont, setprimocont] = useState({numerotelefono:"",email:""})
  const [datacalendario, setData] = useState();
  const [sostec,setsostec]=useState({sostec:""})
  const [datiprezzo,setdatiprezzo] = useState({modalitaPagamento:"",tipoPagamento:"",tipoServizio:"",PrezzoBase:"",ValiditàDal:"",ValiditàAl:"",
  sconto:{maxPersone:"",minPersone:"",perc:""},scontoperunità:{maxUnita:"",minUnita:"",perc:""},orario:""});
  const [datipersonaleint,setdatipersonaleint]=useState({qualifica:[],anni:[]})
  const [datipersonaleest,setdatipersonaleest]=useState({qualifica:[],anni:"",nomefornitore:[]})
  const [datiServizio, setDati] = useState({data1:"",data2:"",municipio:"",mansioni:"",altremansioni:"", periodoerogazione:"",tempomaxservizio:""});
  const [sedeerogazione,setsede] = useState({tipo:"",nomesede:"",indirizzo:"",città:"",cap:"",provincia:"",id_sede:[],altrasede:""})
  const [primo,setPrimo] = useState(false);
 const [bool,setbool]=useState(true)

  if(!primo&&EstraiDettaglioAmministrativoServizioEnte){
    array =EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaDestinatariPrimoLivello
    setPrimo(true);
    setKey(array)
  }

  const id_servizio_erogato=window.location.pathname.split('/')[5];
  const id_ente = window.location.pathname.split('/')[3];

  useEffect( () => {
    if(bool && EstraiDettaglioAmministrativoServizioEnte && loaded===2){
      resetField('EstraiDettaglioAmministrativoServizioEnte')
    setnote({notedest:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio &&
  EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notedest)?""
  :EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notedest,
  noteserv:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio &&
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteserv)?""
    :EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteserv,
  notesede:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio &&
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notesede)?""
    :EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notesede,
  notepers: isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio &&
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notepers)?""
    :EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notepers,
  noteprezzo:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio &&
    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteprezzo)?""
    :EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.noteprezzo,
})
setbool(false)
}
    
    graphqlRequest(EstraiDettaglioAmministrativoServizioEnteQ(id_servizio_erogato,id_ente));
  }, [graphqlRequest, id_servizio_erogato]);
  


  return (
    <Row fluid> 
     
      {EstraiDettaglioAmministrativoServizioEnte? 
        
        <>
           <InformazioniServizio />         
         <Ente />
        <Destinatari setkey1={setKey} key1={key} note={note} setnote={setnote}/>         
        <PrimoContattoDaCompilare setdatacalendario1={setData.bind(this)} setprimocont1 ={setprimocont.bind(this)}/>
     
        <PrimoContatto setprimocont1 ={setprimocont.bind(this)} setdatacalendario1={setData.bind(this)}/>   
       
        <Servizio setDatiServizio ={setDati.bind(this)} DatiServizio1={datiServizio} note={note} setnote={setnote} />
     
        <SedeErogazione sede1={sedeerogazione} setsede1={setsede.bind(this)} note={note} setnote={setnote}/>         
        <PersonaleInterno datip={datipersonaleint} setdatip={setdatipersonaleint.bind(this)}/>
      
        <PersonaleEsterno datis={datipersonaleest} setdatis={setdatipersonaleest.bind(this)} note={note} setnote={setnote}/>         
        <Prezzo datipr={datiprezzo} setdatipr={setdatiprezzo.bind(this)} note={note} setnote={setnote}/>
      
        <SostegniEconomici sostec={sostec} setsostec={setsostec.bind(this)}/> 
        <Buttons note={note} key3={key} primocont={primocont} datiservizio1={datiServizio}
      sede1={sedeerogazione} datip={datipersonaleint} datis={datipersonaleest} datipr={datiprezzo} sostec={sostec} estraidettaglio={EstraiDettaglioAmministrativoServizioEnte}/>  
        </>
        
        : <Loader />}  
            
    
    </Row>
    
  );
};

const mapDispatchToProps = ({
  graphqlRequest,
  resetField
});
const mapStoreToProps = store => ({
  locale: store.locale,
  loaded: store.graphql.loaded,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})


AccordionServAcc.displayName = 'AccordionServAcc';

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(AccordionServAcc);

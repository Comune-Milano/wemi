/** @format */

import React,{useState,useEffect} from 'react';
import {Row, Column } from "components/ui/Grid";
import Accordion from "components/ui/Accordion";
import Text from "components/ui/Text";
import { connect } from "react-redux";
import { isNullOrUndefined } from 'util';
import MultiSelect from "components/ui/MultiSelect";
import TextArea from 'components/ui/TextArea';
import {AccordionBodyWrapper} from '../partials';
import withAuthentication from 'hoc/withAuthentication';







const Destinatari = ({userProfile, EstraiDettaglioAmministrativoServizioEnte,locale,key1,setkey1,setnote,note }) => {
  
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  const { datiLogin } = userProfile;
  const DatiLogin = datiLogin;
  const [arrayPrimoLivello,setarrayprimolivello] = useState(isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaDestinatariPrimoLivello)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaDestinatariPrimoLivello.map(elemento=>({
    id: elemento.idDestinatario,
    value: elemento.txDestinatario[locale]
  }))); 
  
  
  const [array2livello,set2livello]=useState(isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaDestinatariSecondoLivello)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaDestinatariSecondoLivello.map(elemento1=>({
    id:elemento1.idDestinatario,
    value: elemento1.txDestinatario[locale]
  })))
  
  

    const [items,setitems]=useState(isNullOrUndefined( EstraiDettaglioAmministrativoServizioEnte.destinatari)?[]: EstraiDettaglioAmministrativoServizioEnte.destinatari.map((elemento)=>elemento.destinatariSecondoLivello.map((elemento1)=>({
      value:elemento1.idDestinatario,
      textValue:elemento1.txDestinatario[locale]
    }))))

    const idservizio = window.location.pathname.split('/')[5]

    const [serviziostt,setstt]=useState(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiServizioErogatoEnte004.filter(e=>{if(e.cd_stato_dati_servizio_ente===31 && e.id_servizio_ente==idservizio) return e}))


const itemsciclo=()=>{
  let arrayz=[]
  
for(let i=0;i<items.length;i++){
  for(let y=0;y<items[i].length;y++){

  
arrayz.push(
  items[i][y]
)}
}
return arrayz
}


  
    const cambia=(value)=>{
      setarrayprimolivello(value)
     
    }
    
  
    
  
   useEffect(() => {
     setkey1({destinatari1:arrayPrimoLivello,
        destinatari2: array2livello })
   }, []);
  return (
    <Column sm="12" padding="20px">
    <Accordion
       headerBgColorOpen="blue"
       headerBgColor="grey"
       headerColorOpen="white"
       headerColor="blue"
       arrowOpenColor="white"
       arrowClosedColor="blue"
       arrowSize="f1"
       headerPadding="0.75rem 1.25rem"
       aperto={false}
      AccordionHeader={() => (
            <Text weight="bold"  size="f4"  value="Destinatari" intlFormatter />
        )}
        children= {    
             EstraiDettaglioAmministrativoServizioEnte? 
              <AccordionBodyWrapper>
                {DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length===0?
     <Row padding="0" division={12}>
              <Column xs="6">
                 <MultiSelect
                  material
                  disabilitaEliminazione
                  color="blue"
                  name="Categoria Target"
                  items={[]}
                  intlFormatter
                  intlPlaceholder="Destinatari"
                  selectedArrDefault={arrayPrimoLivello?arrayPrimoLivello:null}
                  getValue={()=> {}}
                /> 
              </Column>
              { arrayPrimoLivello && arrayPrimoLivello.length>0?
              <Column xs="6">
           
                  <MultiSelect
                  material
                  color="blue"
                  disabilitaEliminazione
                  name="Target associato di secondo livello"
                  items={[]}
                  intlFormatter
                  selectedArrDefault={array2livello?array2livello:null}
                  getValue={()=>{}}
                  
                />   
              </Column>:null}
            </Row>
            :(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?
            <Row padding="0" division={12}>
              <Column xs="6">
                 <MultiSelect
                  material
                  color="blue"
                  disabilitaEliminazione
                  name="Categoria Target"
                  items={[]}
                  intlFormatter
                  intlPlaceholder="Destinatari"
                  selectedArrDefault={arrayPrimoLivello}
                  getValue={()=> {}}
                /> 
              </Column>
              { arrayPrimoLivello && arrayPrimoLivello.length>0?
              <Column xs="6">
           
                  <MultiSelect
                  material
                  color="blue"
                  disabilitaEliminazione
                  name="Target associato di secondo livello"
                  items={[]}
                  intlFormatter
                  selectedArrDefault={array2livello}
                  getValue={()=>{}}
                  
                />   
              </Column>:null}
            </Row>
            :null}
            {DatiLogin && DatiLogin.Ruolo==="Ente"?
            <Row>
              <Column lg={12} md={12}>
                <TextArea
                  material
                  color="blue"
                  readOnly="true"
                  initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio && 
                  EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notedest?
                  EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notedest:""}
                  name="Note amministrative"
                  intlFormatter
                  getValue={(value)=>{setnote({notedest:value,noteserv:note.noteserv,notesede:note.notesede,notepers:note.notepers,noteprezzo:note.noteprezzo})}}
                />
              </Column>
            </Row> 
            : DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length===0?
            <Row>
            <Column lg={12} md={12}>
              <TextArea
                material
                color="blue"
                initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio && 
                  EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notedest?
                  EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notedest:""}
                name="Note amministrative"
                readOnly="true"
                intlFormatter
                getValue={(value)=>{setnote({notedest:value,noteserv:note.noteserv,notesede:note.notesede,notepers:note.notepers,noteprezzo:note.noteprezzo})}}
              />
            </Column>
          </Row> 
          :
          <Row>
          <Column lg={12} md={12}>
            <TextArea
              material
              color="blue"
              readOnly="true"
              initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio && 
                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notedest?
                EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_note_adminwemi_su_servizio.notedest:""}
              name="Note amministrative"
              readOnly="true"
              intlFormatter
              getValue={(value)=>{setnote({notedest:value,noteserv:note.noteserv,notesede:note.notesede,notepers:note.notepers,noteprezzo:note.noteprezzo})}}
            />
          </Column>
        </Row> }
              </AccordionBodyWrapper>
              :  null
           
        }
      />
      </Column>
  

  );
};


const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})


Destinatari.displayName = 'Destinatari';

export default connect(
  mapStoreToProps
)(withAuthentication(Destinatari));

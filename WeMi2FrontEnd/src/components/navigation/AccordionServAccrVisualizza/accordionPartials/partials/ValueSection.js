import React,{useEffect,useState} from 'react';
import Input from 'components/ui/Input';
import Text from 'components/ui/Text';
import {Row,Column} from 'components/ui/Grid';
import { connect } from "react-redux";
import withAuthentication from 'hoc/withAuthentication';



const ValueSection = ({userProfile,informazioni, setInformazioni,EstraiDettaglioAmministrativoServizioEnte,locale,
  prezzounit, setprezzounit,valoreswitch,setvaloreswitch,datipr,setdatipr,prezzobase,setPrezzoBase,setquantitàmin,setquantitàmax,setfinanz}) =>{


    const idservizio = window.location.pathname.split('/')[5]

    const [serviziostt,setstt]=useState(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiServizioErogatoEnte004.filter(e=>{if(e.cd_stato_dati_servizio_ente===31 && e.id_servizio_ente==idservizio) return e}))

//     const strDatiLogin = sessionStorage.getItem('DatiLogin');
// const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
const DatiLogin = userProfile.datiLogin;



 return(
    <Column lg={8} md={8}>
   
{informazioni && informazioni.tipoPagamento && informazioni.tipoPagamento.id===1 || 3? 
 <>
{informazioni &&informazioni.modalitaPagamento &&informazioni.modalitaPagamento.id===1 &&informazioni &&informazioni.tipoPagamento &&informazioni.tipoPagamento.id===1 && (informazioni &&informazioni.tipoServizio &&informazioni.tipoServizio.id===1 || 2)
   ? 
   
 <Row>
     <Column>
     {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?
       <Input
         material
         color="blue"
         readOnly="true"
         intlPlaceholder="Titolo finanziamento"
         intlLabel="Titolo finanziamento"
         intlFormatter
         getValue={()=>{}}
       />
       : DatiLogin && DatiLogin.Ruolo==="Amministratore Wemi"?
       <Input
         material
         color="blue"
         
         readonly="true"
         intlPlaceholder="Titolo finanziamento"
         intlLabel="Titolo finanziamento"
         intlFormatter
         getValue={()=>{}}
       />
       :null}
     </Column>
   </Row> : null}

{/* // {informazioni && informazioni.tipoPagamento.id === 1 &&  informazioni.tipoServizio.find((element)=> */}
{/* //   element.id===2? */}

    {(informazioni && informazioni.modalitaPagamento && informazioni.modalitaPagamento.id===1||3) && informazioni &&informazioni.tipoPagamento&&informazioni.tipoPagamento.value==="Gratuito" &&  informazioni &&informazioni.tipoServizio &&informazioni.tipoServizio.id===2
     ?  
    
   <>
  {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?
   <Row>
     <Column>
       <Input
         material
         color="blue"
         readOnly="true"
        initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_min_pers?
          EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_min_pers:""}
         intlLabel="Numero persone da"
         intlFormatter
        getValue={()=>{}}

       />
     </Column>
   </Row>
   :DatiLogin && DatiLogin.Ruolo==="Amministratore Wemi"?
   <Row>
   <Column>
     <Input
       material
       color="blue"
      initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_min_pers?
        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_min_pers:""}
       intlLabel="Numero persone da"
       readonly="true"
       intlFormatter
      getValue={()=>{}}

     />
   </Column>
 </Row>
 :null}



{(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?
   <Row>
     <Column>
       <Input
         material
         color="blue"
         readOnly="true"
        initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_max_pers?
          EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_max_pers:""}
         intlLabel="Numero persone a"
         intlFormatter
         getValue={()=>{}}
       />
     </Column>
   </Row>
   : DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?
   <Row>
   <Column>
     <Input
       material
       color="blue"
      readonly="true"
      initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_max_pers?
        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_max_pers:""}
       intlLabel="Numero persone a"
       intlFormatter
       getValue={()=>{}}
     />
   </Column>
 </Row>
 :null}
   </> 
   : null}
 </>
 : null}                    
    
{informazioni &&informazioni.tipoPagamento&&informazioni.tipoPagamento.id === 3 ? 
 <>
   {informazioni && informazioni.tipoServizio && informazioni.tipoServizio.id === 1 || 2 ?
 <div>
 <Row>
   <Column padding=".5em 0">
     <Text value="Unità di prezzo: xxxxxx" size="f6" color="darkGrey" />
   </Column>
 </Row>
 <Row padding=".5em 0" fluid display="flex" justifycontent="space-between">
   <Column md="6" padding="0" >
       <Text
         value="Prezzo unitario minimo base"
         style={{ fontSize:"1.167rem",lineHeight: "50px", paddingRight: "1em", color:"rgb(112, 112, 112)" }}
       />
       </Column>
       {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?
       <Column md="6" padding="0">
       <Input
         material
         intlFormatter
         color="blue"
         readOnly="true"
        initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo?
          EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.prezzoBase?
          EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.prezzoBase:"":""}
         intlLabel="Prezzo unitario minimo base"
        getValue={()=>{}}
         
       />
   </Column>
   :DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?
   <Column md="6" padding="0">
   <Input
     material
     intlFormatter
     color="blue"
     readonly="true"
     initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo?
      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.prezzoBase?
      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo.prezzoBase:"":""}
     intlLabel="Prezzo unitario minimo base"
    getValue={()=>{}}
     
   />
</Column>
:null}
 </Row>
 <Row>
   <Column padding=".5em 0">
     <Text
       value={prezzounit=!undefined? "Prezzo unitario minimo calcolato" + " "+ " " + prezzounit:null}
       color="darkGrey"
       size="f6"
     />
   </Column>
 </Row>
 {informazioni && informazioni.tipoPagamento && informazioni.tipoPagamento.id===3 && informazioni &&informazioni.tipoServizio&&informazioni.tipoServizio.id===2
     ?
     (DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.length>0)?
 <Row>
   <Column lg={6} md={6} padding=".5em .5em 0 0">
     <Input
       material
       initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_min_pers?
        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_min_pers:""}
       intlLabel="Numero persone da"
       color="blue"
       readOnly="true"
       intlFormatter
       getValue={()=>{}}
     />
   </Column>
   <Column lg={6} md={6} padding=".5em .5em 0 0">
     <Input
       material
      initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_max_pers?
        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_max_pers:""}
       color="blue"
       readOnly="true"
       intlLabel="Numero persone a"
       intlFormatter
       getValue={()=>{}}
     />
   </Column>
 </Row>
 :DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?
 <Row>
   <Column lg={6} md={6} padding=".5em .5em 0 0">
     <Input
       material
       initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_min_pers?
        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_min_pers:""}
       intlLabel="Numero persone da"
       color="blue"
       intlFormatter
       readonly="true"
       getValue={()=>{}}
     />
   </Column>
   <Column lg={6} md={6} padding=".5em .5em 0 0">
     <Input
       material
      initialValue={EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_max_pers?
        EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.qt_max_pers:""}
       color="blue"
       readonly="true"
       intlLabel="Numero persone a"
       intlFormatter
       getValue={()=>{}}
     />
   </Column>
 </Row>
 :null
 :null}
</div>
: null}

</>
 
 

:null}




</Column> 
 )
  };
const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})
export default connect(mapStoreToProps) (withAuthentication(ValueSection));
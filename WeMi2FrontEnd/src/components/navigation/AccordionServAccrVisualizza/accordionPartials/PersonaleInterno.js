/** @format */

import React,{useEffect,useState} from 'react';
import { Row, Column } from "components/ui/Grid";
import Accordion from "components/ui/Accordion";
import Text from "components/ui/Text";
import { connect } from "react-redux";
import { isNullOrUndefined } from 'util';
import {AccordionBodyWrapper} from '../partials';
import MultiSelect from "components/ui/MultiSelect";
import Input from 'components/ui/Input';
import { InserisciDatiServizioEnte } from '../EntGOI005GraphQL';
import withAuthentication from 'hoc/withAuthentication';



const PersonaleInterno = ({EstraiDettaglioAmministrativoServizioEnte,locale,datip,setdatip, userProfile }) => {

  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);  const DatiLogin = userProfile.datiLogin;

  
  useEffect(() => {
   setdatip({
     qualifica:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?[]:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qlPersonaleInterno)?[]:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qlPersonaleInterno[locale],
     anni:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?[]:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleInterno)?[]:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleInterno
   })},
     []);


    

  const [qualifica,setqualifica]=useState(isNullOrUndefined( EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?[]:isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qlPersonaleInterno)?[]:EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qlPersonaleInterno.it)
  const [qualificadefault,setqualificadefault]=useState(qualifica? qualifica.map(qualifica=>({id:qualifica,value:qualifica})):[])
  const [annidefault,setanni]=useState(isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?"":isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleInterno)?"":EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleInterno)
  const [switchValue, setSwitchValue] = useState(true);

  const idservizio = window.location.pathname.split('/')[5]

    const [serviziostt,setstt]=useState(EstraiDettaglioAmministrativoServizioEnte && EstraiDettaglioAmministrativoServizioEnte.EstraiServizioErogatoEnte004.filter(e=>{if(e.cd_stato_dati_servizio_ente===31 && e.id_servizio_ente==idservizio) return e}))

  const handlechangeqanni = event =>{
    setanni(event.target.value)
    setdatip({qualifica:datip.qualifica,anni:annidefault})
  }
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
            <Text weight="bold" size="f4" value="Personale interno impiegato" intlFormatter />
        )}
        children =  {    
           
              <AccordionBodyWrapper>
                {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.lenght>0)?
                <Row>
               <Column lg={11}>
                <MultiSelect
                  material
                  color="blue"
                  disabilitaEliminazione
                  name="Qualifiche del personale"
                  items={[]}
                  selectedArrDefault={qualificadefault}
                  intlFormatter
                  intlPlaceholder="Qualifiche del personale"
                  getValue={()=>{}}
                />
              </Column>
            </Row>
            :DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?
            <Row>
            <Column lg={11}>
             <MultiSelect
               material
               color="blue"
               disabilitaEliminazione
               name="Qualifiche del personale"
               items={[]}
               selectedArrDefault={qualificadefault}
               intlFormatter
               intlPlaceholder="Qualifiche del personale"
               getValue={()=>{}}
             />
           </Column>
         </Row>
         :null}
            {(DatiLogin && DatiLogin.Ruolo==="Ente") || (DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi" && serviziostt.lenght>0)?
            <Row>
              <Column lg={6} md={6}>
                <Input
                  material
                
                  readonly="true"
                  type="number"
                  color="blue"
                  initialValue={isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?
                  "": isNullOrUndefined( EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleInterno)?"": EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleInterno}
                  intlLabel="Numero anni di esperienza"
                onChange={handlechangeqanni}
                />
              </Column> 
            </Row>
            :DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?
            <Row>
            <Column lg={6} md={6}>
              <Input
                material
                
                readonly="true"
                type="number"
                color="blue"
                initialValue={isNullOrUndefined(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale)?
                  "": isNullOrUndefined( EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleInterno)?"": EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleInterno}
                intlLabel="Numero anni di esperienza"
                readonly="true"
              onChange={handlechangeqanni}
              />
            </Column> 
          </Row>
          :null}
              </AccordionBodyWrapper>
           
           
        }
      />
      </Column>
  

  );
};


const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})


PersonaleInterno.displayName = 'PersonaleInterno';

export default connect(
  mapStoreToProps
)(withAuthentication(PersonaleInterno));

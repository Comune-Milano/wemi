/** @format */

import React, { useState, useEffect } from 'react';
import { Row, Column } from "components/ui/Grid";
import Accordion from "components/ui/Accordion";
import Text from "components/ui/Text";
import { connect } from "react-redux";
import MultiSelect from "components/ui/MultiSelect";
import { AccordionBodyWrapper } from '../partials';
import withAuthentication from 'hoc/withAuthentication';

const SostegniEconomici = ({EstraiDettaglioAmministrativoServizioEnte,locale,setsostec,sostec, userProfile }) => {

  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const DatiLogin = strDatiLogin && JSON.parse(strDatiLogin);
  const DatiLogin = userProfile.datiLogin;

  useEffect(() => {
    setsostec({sostec:
      EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaSostegniEconomiciSupportati?   EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaSostegniEconomiciSupportati.map(elemento =>
        ({
          id: elemento.idSostegno,
          value: elemento.txSostegno[locale]
        })):[]})
   },
      []);

  const [sostegnidefault] = useState(EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaSostegniEconomiciSupportati?EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.listaSostegniEconomiciSupportati.map(elemento =>
    ({
      id: elemento.idSostegno,
      value: elemento.txSostegno[locale],
    })):[]);
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
            <Text weight="bold" size="f4" value="Sostegni economici" intlFormatter />
        )}
        AccordionBody={() => {    
            return EstraiDettaglioAmministrativoServizioEnte? 
              <AccordionBodyWrapper>
                {DatiLogin && DatiLogin.Ruolo==="Ente"?
              <Row padding="0" division={12}>
              <Column xs="12">
                 <MultiSelect
                  material
                  name="Lista dei Sostegni economici"
                  disabilitaEliminazione
                  items={[]}
                  selectedArrDefault={sostegnidefault}
                  intlFormatter
                  intlPlaceholder="Sostegni"
                  getValue={()=>{}}
                /> 
              </Column>
            </Row>
            :DatiLogin && DatiLogin.Ruolo==="Amministratore WeMi"?
            <Row padding="0" division={12}>
            <Column xs="12">
               <MultiSelect
                material
                name="Lista dei Sostegni economici"
                items={[]}
                selectedArrDefault={sostegnidefault}
                disabilitaEliminazione
                intlFormatter
                intlPlaceholder="Sostegni"
                getValue={()=>{}}
              /> 
            </Column>
          </Row>
          :null}
              </AccordionBodyWrapper>
              :  null
           
        }}
      />
      </Column>
  

  );
};


const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})


SostegniEconomici.displayName = 'SostegniEconomici';

export default connect(
  mapStoreToProps
)(withAuthentication(SostegniEconomici));

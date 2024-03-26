/** @format */

import React from 'react';
import { Row, Column } from "components/ui/Grid";
import Accordion from "components/ui/Accordion";
import Text from "components/ui/Text";
import { connect } from "react-redux";
import Input from 'components/ui/Input';
import { AccordionBodyWrapper } from '../partials';

const Ente = ({EstraiDettaglioAmministrativoServizioEnte }) => {

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
            <Text weight="bold" size="f4" value="Ente" intlFormatter />
        )}
        AccordionBody={() => {    
            return EstraiDettaglioAmministrativoServizioEnte? 
              <AccordionBodyWrapper>
              <Row padding="0" fluid display="flex" alignitems="center" >
               <Column xs="4"  padding="1em .5em">
               <Input material disabled intlLabel="Identificativo" intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte.ente.id_ente} />
               </Column>
               <Column xs="4" padding="1em .5em">
               <Input material disabled intlLabel="Nome chiave" intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente} />
               </Column>
               <Column xs="4" padding="1em .5em">
               <Input material disabled intlLabel="Descrizione" intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente_completo} />
               </Column>
               </Row>
              {/* <Row padding="0" fluid > */}
               {/* <Column xs="4">
                  <Text value={EstraiDettaglioAmministrativoServizioEnte.ente.id_ente} size="f8" color="darkGrey" tag="p" align="center" />
               </Column> */}
               {/* <Column xs="4">
               <Text value={EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente} size="f8" color="darkGrey" tag="p" align="center"/>
               </Column>
               <Column xs="4">
               <Text value={EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente_completo} size="f8" color="darkGrey" tag="p" align="center"/>
               </Column> */}
{/* 
               </Row> */}
              </AccordionBodyWrapper>
              :  null
           
        }}
      />
      </Column>
  

  );
};


const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte && store.graphql.EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte
})


Ente.displayName = 'Ente';

export default connect(
  mapStoreToProps
)(Ente);

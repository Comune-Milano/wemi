/** @format */

import React from 'react';
import { Row, Column } from "components/ui/Grid";
import Accordion from "components/ui/Accordion";
import Text from "components/ui/Text";
import { connect } from "react-redux";
import Input from 'components/ui/Input';
import { AccordionBodyWrapper } from '../partials';

const InformazioniServizio = ({EstraiDettaglioAmministrativoServizioEnte,loaded, locale }) => {

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
            <Text weight="bold" size="f4" value="Informazioni servizio" intlFormatter />
        )}
        AccordionBody={() => { 
          if(EstraiDettaglioAmministrativoServizioEnte && loaded === 2)   
            return  (
              <AccordionBodyWrapper>
              <Row padding="0" fluid display="flex" alignitems="center" >
               <Column xs="3" padding="1em .5em">
               <Input material disabled intlLabel="Identificativo" 
               intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte.id_servizio_ente} />
               </Column>
               <Column xs="3" padding="1em .5em">
               <Input material disabled intlLabel="Nome chiave" intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio ? 
               EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio[locale]
              : null} />
               </Column>
               <Column xs="3" padding="1em .5em">
               {/* 
               Inibizione del campo descrizione servizio ente issue #145
               <Input material disabled intlLabel="Descrizione" intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte.tl_descrizione_serv_erog_ente? 
               EstraiDettaglioAmministrativoServizioEnte.tl_descrizione_serv_erog_ente[locale]:""} /> 
               */}
               </Column>
               <Column xs="3" padding="1em .5em">
               <Input material disabled intlLabel="Categoria accreditamento" intlPlaceholder={EstraiDettaglioAmministrativoServizioEnte &&
                EstraiDettaglioAmministrativoServizioEnte.service &&
                EstraiDettaglioAmministrativoServizioEnte.service.categoriaAccreditamentoServizio &&
                EstraiDettaglioAmministrativoServizioEnte.service.categoriaAccreditamentoServizio[0] &&
                EstraiDettaglioAmministrativoServizioEnte.service.categoriaAccreditamentoServizio[0].txTitoloCategoria?
                EstraiDettaglioAmministrativoServizioEnte.service.categoriaAccreditamentoServizio[0].txTitoloCategoria[locale]:null
              } />
               </Column>
               </Row>
              {/* <Row padding="0" fluid >
               <Column xs="3">
                  <Text value={EstraiDettaglioAmministrativoServizioEnte.id_servizio_ente} size="f8" color="darkGrey" tag="p" align="center" />
               </Column>
               <Column xs="3">
               <Text value={EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio[locale]} size="f8" color="darkGrey" tag="p" align="center"/>
               </Column>
               <Column xs="3">
               <Text value={EstraiDettaglioAmministrativoServizioEnte.tl_descrizione_serv_erog_ente? 
               EstraiDettaglioAmministrativoServizioEnte.tl_descrizione_serv_erog_ente[locale]:""} size="f8" color="darkGrey" tag="p" align="center"/>
               </Column>
               <Column xs="3">
               <Text value={EstraiDettaglioAmministrativoServizioEnte.service.categoriaAccreditamentoServizio[0].txTitoloCategoria[locale]} size="f8" color="darkGrey" tag="p" align="center"/>
               </Column>
               </Row> */}
              </AccordionBodyWrapper>          
            ) 
            else return null
        }}
      />
      </Column>
  

  );
};


const mapStoreToProps = store => ({
  locale: store.locale,
  loaded: store.graphql.loaded,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte && store.graphql.EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte
})


InformazioniServizio.displayName = 'InformazioniServizio';

export default connect(
  mapStoreToProps
)(InformazioniServizio);

/** @format */

import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {graphqlRequest} from 'redux-modules/actions/authActions';
import Loader from 'components/ui/Loader';
import Header from 'components/navigation/Header';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import ServiceCart from 'components/navigation/ServiceCart';
import ServiceCartPagePropTypes from './propTypes';
import {estraiRichiestaEnte as estraiRichiestaEnteQ, RichiestaEnteUtile as RichiestaEnteUtileQ } from './CarrelloGraphQL';

const ServiceCartPage = ({graphqlRequest, estraiCarrello,RichiestaEnteUtile,loaded,cart}) => {

    
    useEffect(() =>{
      if(!estraiCarrello)
      graphqlRequest(estraiRichiestaEnteQ(2));
  
      if(estraiCarrello && estraiCarrello.EstraiCarrello[0]) {
        graphqlRequest(RichiestaEnteUtileQ(estraiCarrello.EstraiCarrello[0].id_richiesta_servizio_ente))
    }
  },[graphqlRequest, estraiCarrello]);

    const BreadcrumbPath = [
      {
        slash:'Home',
        url:''
      },
      {
        slash: 'Area personale',
        url: 'areaPersonale'
      },
      {
        // slash:  'RequestsIndex.header.breadcrumb',
        slash: 'Indice richieste e servizi acquistati',
        url: 'r/idRequestsIndex'
      },
      {
        // slash:  'CarrelloTranslations.header.breadcrumb',
        slash: 'Carrello',
        url: `${window.location.pathname.split('it/')[1]}`
      },
  
    ]
    

   return(
  <Wrapper>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
    {/* <Header title="CarrelloTranslations.header.title" fontSize="f1" titleBold="CarrelloTranslations.header.titleBold" /> */}
     <Header title="CARRELLO SERVIZI PRENOTATI" fontSize="f1" titleBold="" />
    {estraiCarrello? <ServiceCart estraiCarrello={estraiCarrello} RichiestaEnteUtile={RichiestaEnteUtile} />: <Loader />}
    
  </Wrapper>
) 

}
ServiceCartPage.displayName = 'ServiceCartPage';
ServiceCartPage.propTypes = ServiceCartPagePropTypes;
const mapStoreToProps = store => ({
  estraiCarrello: store.graphql.estraiRichiesteEnte,
  cart: store.cart.cart,
  loaded: store.graphql.loaded,
  RichiestaEnteUtile:store.graphql.RichiestaEnteUtile
})
const mapDispatchToProps = ({
  graphqlRequest
})
export default connect(mapStoreToProps,mapDispatchToProps)(ServiceCartPage);

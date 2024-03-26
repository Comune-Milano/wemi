/** @format */

import React from 'react';
import Header from 'components/navigation/Header';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import OrderSummary from 'components/navigation/OrderSummary';
import OrderSummaryPagePropTypes from './propTypes';

const OrderSummaryPage = () => {
  const BreadcrumbPath = [
    {
      slash: 'Home',
      url:''
    },
    {
      slash: 'Area personale',
      url: 'areaPersonale'
    },
    {
      slash:'Indice Richieste e servizi acquistati',
      url: 'r/idRequestsIndex'
    },
    {
      slash:  'Carrello',
      url: `r/idRequestsIndex/cart`
    },
    {
      slash: 'Gestione ordine',
      url: `${window.location.pathname.split('it/')[1].split('/orderSummary')[0]}`
    },
    {
      slash:'Riepilogo ordine',
      url: `${window.location.pathname.split('it/')[1]}`
    }
  ]

  return(
  <Wrapper>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
    {/* <Header title="OrderSummary.header.title" fontSize="f1" titleBold="OrderSummary.header.titleBold" /> */}
    <Header title="Riepilogo ordine" fontSize="f1" titleBold="" />
    <OrderSummary />
  </Wrapper>
)
  };

OrderSummaryPage.displayName = 'OrderSummaryPage';
OrderSummaryPage.propTypes = OrderSummaryPagePropTypes;

export default OrderSummaryPage;

/** @format */

import React from 'react';
import { Wrapper, Info, ListaServizi } from './partials';

const ServiceCart = ({estraiCarrello,RichiestaEnteUtile}) => (
  <Wrapper fluid justifycontent="space-between">
    <Info />
    <ListaServizi listaServizi={estraiCarrello} RichiestaEnteUtile={RichiestaEnteUtile}  />
  </Wrapper>
);

ServiceCart.displayName = 'ServiceCart';
export default ServiceCart;

/** @format */

import React from 'react';
import {connect} from 'react-redux';
import {graphqlRequest} from 'redux-modules/actions/authActions';
import Button from 'components/ui/Button';
import NavLink from 'components/router/NavLink';
import { PAGE_CART_URL, PAGE_CHAT_URL } from 'types/path';
import {estraiRichiestaEnte as estraiRichiestaEnteQ} from 'components/pages/ENTCAR/ENTCAR001_CarrelloServizi/CarrelloGraphQL';

const DrawerButtons = ({request, graphqlRequest}) => {
  if (request.stato == 'Ha accettato la tua richiesta') {
    return (
      <NavLink to={PAGE_CART_URL} width="100%">
        <Button type="primary" fontSize="f9" value={request.button} onClick={() =>  graphqlRequest(estraiRichiestaEnteQ(2))} />
      </NavLink>
    );
  }
  if (request.stato == 'In attesa di risposta') {
    return <Button type="disabled" fontSize="f9" value={request.button} />;
  }
  if (request.stato == 'Ti ha fatto una domanda') {
    return (
      <NavLink to={PAGE_CHAT_URL} margin="auto" width="100%">
        <Button fontSize="f9" value={request.button} />
      </NavLink>
    );
  }
  return null;
};
DrawerButtons.displayName = 'DrawerButtons';


const mapDispatchToProps = ({
  graphqlRequest
})
export default connect(null,mapDispatchToProps)(DrawerButtons);

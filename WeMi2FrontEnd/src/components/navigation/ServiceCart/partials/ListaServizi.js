/** @format */

import React,{useState} from 'react';
import styled from 'styled-components';
import {removeCart} from 'redux-modules/actions/cartActions';
import { Column } from 'components/ui/Grid';
import Loader from 'components/ui/Loader';
import {PAGE_REQUESTSINDEX_URL } from 'types/path';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Servizio from './Servizio';

const WrapperColumn = styled(Column)`
  position: relative;
  height: max-content;
  justify-content: flex-end;
`;

const ListaServizi = ({ listaServizi,RichiestaEnteUtile  }) => {
  const [serviziSelezionati, setServiziSelezionati] = useState(listaServizi.EstraiCarrello);
  return (
  <WrapperColumn xs="12" md="9">
    {listaServizi ? serviziSelezionati.length > 0 ? listaServizi.EstraiCarrello.map(servizio => (
      <Servizio props={servizio}
      serviziSelezionati={serviziSelezionati} 
      setServiziSelezionati={setServiziSelezionati}
      RichiestaEnteUtile={RichiestaEnteUtile}/>
    )):  (window.location.href=PAGE_REQUESTSINDEX_URL) && null : <Loader/>}
  </WrapperColumn>
);
    }

ListaServizi.displayName = 'ListaServizi';

const mapDispatchToProps = ({
  removeCart
})

export default connect(
  null,
mapDispatchToProps)(injectIntl(ListaServizi));

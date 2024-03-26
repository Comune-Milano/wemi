/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import NavLink from 'components/router/NavLink';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import Label from 'components/ui/Label';
import Wrapper from 'components/navigation/NavigationWrapper';
import styled from 'styled-components';
import { MenuTCBJson } from 'mocks/MenuTCBJson';
import RightCittadino from './partials/RightCittadino';
import RightLavoratore from './partials/RightLavoratore';
import { serviziTCB as serviziTCBQ, tipoOrarioTCB as tipoOrarioTCBQ, estraiLivelliContrattuali } from './menuTcbGraphql';
import { getIdServizio } from 'utils/functions/getIdServizio';
import moment from 'moment';

const MyImage = styled.img`
width: 90%;
&:hover {
  width: 95%
}
`;


const MenuTCB = ({ graphqlRequest, serviziTCB, orariTCB, loaded, locale }) => {

  useEffect(() => {
    if (!serviziTCB && loaded === 2)
      graphqlRequest(serviziTCBQ())
  });

  const estraiLivelliContrattualiTipoOrario=()=>{
    graphqlRequest(estraiLivelliContrattuali(servizio, moment().year()));
     if (!orariTCB){
      graphqlRequest(tipoOrarioTCBQ());
     }; 
  };


  return (
    <Wrapper>
      <Row justifycontent="space-between" margin="0 0 1em">
        <Column lg="4" >
          <Text value="Per le famiglie." size="f3" tag="p" />
          <Text value="WeMI Tate Colf Badanti" size="f3" tag="p" />
        </Column>
        <Column lg="8">
          <Text
            value="WeMI Tate Colf Badanti è il servizio del Comune di Milano che in maniera facile, semplice e veloce aiuta le famiglie in cerca di assistenti familiari a trovare la soluzione per la cura dei propri cari, dei bambini e della casa."
            size="f6"
          />
          <Row margin="1em 0" fluid justifycontent="space-around">
            {serviziTCB && MenuTCBJson.cards.map((element, index) => {
              const servizio = getIdServizio(serviziTCB[index].cd_dominio_tcb);
              return (
                <Column xs="12" sm="3" padding="0" justifycontent="center" >
                  <NavLink
                    onClick={() => { estraiLivelliContrattualiTipoOrario() }}
                    to={`/richiestaServizioTcb/${serviziTCB[index].cd_dominio_tcb}`} width="100%" margin="auto">
                    <Row flex direction="column" justifycontent="space-around" alignitems="center">
                      <MyImage
                        onClick={() => { estraiLivelliContrattualiTipoOrario() }}
                        src={element.img} />
                      <Text
                        align="center"
                        onClick={() => { estraiLivelliContrattualiTipoOrario()}}
                        value={serviziTCB[index].tl_valore_testuale[locale]}
                        size="f5"
                        weight="bold" />
                    </Row>
                  </NavLink>
                </Column>
              )
            })}
          </Row>
        </Column>
      </Row>
      <Row padding="2em 20px">
        <Label
          value="Come funziona"
          intlFormatter
          size="f6"
          color="white"
          bgcolor="red"
          transform="uppercase"
        />
      </Row>
      <Row margin="1em 0">
        <Column lg="3" padding="0 20px 1em">
          <Text value="Per il" size="f5" tag="p" />
          <Text value="cittadino" size="f3" color="blue" tag="p" />
        </Column>
        <Column lg="9" padding="0 20px">
          <RightCittadino />
        </Column>
      </Row>
      <Row margin="2em 0 1em">
        <Column lg="3" padding="0 20px 1em">
          <Text value="Per il" size="f5" tag="p" />
          <Text value="lavoratore" size="f3" color="blue" tag="p" />
        </Column>
        <Column lg="9" padding="0 20px">
          <RightLavoratore />
        </Column>
      </Row>

    </Wrapper>
  )
};



const mapStoreToProps = store => ({
  loaded: store.graphql.loaded,
  locale: store.locale,
  serviziTCB: store.graphql.tipoServizioTcbAll,
  orariTCB: store.graphql.tipoOrarioLavoroAll,

});
const mapDispatchToProps = {
  graphqlRequest,
}
MenuTCB.displayName = 'MenuTCB';

export default connect(mapStoreToProps, mapDispatchToProps)(MenuTCB);
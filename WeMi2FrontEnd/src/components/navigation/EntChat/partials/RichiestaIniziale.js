/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import Loader from 'components/ui/Loader';



const RichiestaWrap = styled(Column)`
  border: 0.5px solid ${props => props.e ? `${colors.blue}` : `${colors.primary}`};
  box-sizing: border-box;
`;

const RichiestaIniziale = ({richiestaBase, e}) => {

  return (
  <Row fluid justifycontent="flex-start" margin="2em 0"  >
    <RichiestaWrap e={e} xs ="12" md="6" padding="20px 50px 20px 20px">
      <Text value="Richiesta iniziale: " color={e ? "blue" : "primary"} weight="bold" size="f6" tag="h1"/>
      {richiestaBase && richiestaBase.js_dati_richiesta ?
      <Text value={richiestaBase.js_dati_richiesta.txNotaRichiesta} color="darkGrey" size="f6" tag="p" />
        : <Loader size="2em" margin="0 auto" padding="0" />}

    </RichiestaWrap>
  </Row>
);

}

RichiestaIniziale.displayName = 'RichiestaIniziale';
export default RichiestaIniziale;

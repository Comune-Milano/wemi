import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useNavHeight } from 'hooks/useNavHeight';
import ComeContattarci from './partials/comecontattarci';
import LeftColumn from './partials/leftcolumn';
import { ComeContattarciRow } from '../InfoApprendimentoLingua/components.style';

const ComeFunzionaOrientamentoScolastico = () => {
  const navHeight = useNavHeight();
  return (
    <Row fluid margin="3.5em 0 4em 0">
      <Column md="7" padding="0">
        <Row fluid>
          <LeftColumn />
        </Row>
      </Column>
      <Column md="5" padding="0">
        <ComeContattarciRow sizemargin={{ md: '0 0 0 5em', lg: '0 0 0 5em', xl: '0 0 0 10em' }} fluid top={navHeight || 0}>
          <Column padding="0" md="10">
            <ComeContattarci />
          </Column>
        </ComeContattarciRow>
      </Column>
    </Row>
  );
};

ComeFunzionaOrientamentoScolastico.displayName = 'ComeFunzionaOrientamentoScolasticoNavigation';
export default ComeFunzionaOrientamentoScolastico;

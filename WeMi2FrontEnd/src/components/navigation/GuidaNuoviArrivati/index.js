import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useNavHeight } from 'hooks/useNavHeight';
import LeftColumn from './partials/leftcolumn';
import { ComeContattarciRow } from '../InfoApprendimentoLingua/components.style';
import ComeContattarci from '../InclusioneCorsoItaliano/partials/ComeContattarci';

const GuidaNuoviArrivati = () => {
  const navHeight = useNavHeight();
  return (
    <Row fluid margin="3.5em 0 4em 0">
      <Column md="7" padding="0">
        <Row fluid>
          <LeftColumn />
        </Row>
      </Column>
      <Column md="5" padding="0">
        <ComeContattarciRow sizepadding={{ md: '0 0 0 5em', lg: '0 0 0 5em', xl: '0 0 0 10em' }} fluid top={navHeight || 0}>
          <ComeContattarci color="orange" />
        </ComeContattarciRow>
      </Column>
    </Row>
  );
};

GuidaNuoviArrivati.displayName = 'GuidaNuoviArrivatiNavigation';
export default GuidaNuoviArrivati;

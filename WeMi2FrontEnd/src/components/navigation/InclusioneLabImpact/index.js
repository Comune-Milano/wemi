import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useNavHeight } from 'hooks/useNavHeight';
import LeftColumn from './partials/LeftColumn';
import RightColumn from './partials/RightColumn';
import { ComeContattarciRow } from '../InclusioneRicongiungimentoParente/partials';

const InclusioneLabImpact = () => {
  const navHeight = useNavHeight();
  return (

    <Row fluid margin="3.5em 0 4em 0">
      <Column padding="0" lg="6">
        {/* left */}
        <LeftColumn />
      </Column>
      <Column padding="0" lg="6">
        {/* right */}
        <ComeContattarciRow fluid sizepadding={{ xs: '4em 0 0 0', md: '4em 0 0 0', lg: '0 0 0 8em' }} top={navHeight || 0}>
          <RightColumn />
        </ComeContattarciRow>
      </Column>
    </Row>
  );
};

InclusioneLabImpact.displayName = 'InclusioneLabImpactNavigation';

export default InclusioneLabImpact;

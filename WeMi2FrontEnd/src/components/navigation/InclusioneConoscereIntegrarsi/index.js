import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import { useNavHeight } from 'hooks/useNavHeight';
import RightColumn from './partials/RightColumn';
import LeftColumn from './partials/LeftColumn';

const StickyRow = styled(Row)`
  position: sticky;
  top: ${({ top }) => top}px;
`;

const InclusioneConoscereIntegrarsi = () => {
  const navbarHeight = useNavHeight();

  return (
    <Row fluid margin="3.5em 0 4em 0">
      <Column padding="0" lg="6">
        {/* left */}
        <LeftColumn />
      </Column>
      <Column padding="0" lg="6">
        {/* right */}
        <StickyRow fluid sizepadding={{ xs: '4em 0 0 0', md: '4em 0 0 0', lg: '0 0 0 8em' }} top={navbarHeight || 0}>
          <RightColumn />
        </StickyRow>
      </Column>
    </Row>
  );
};

InclusioneConoscereIntegrarsi.displayName = 'InclusioneConoscereIntegrarsiNavigation';

export default InclusioneConoscereIntegrarsi;

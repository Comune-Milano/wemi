import React from 'react';
import styled from 'styled-components';
import { colors, spacing } from 'theme';
import media from 'utils/media-queries';
import Text from 'components/ui/Text';

const StyledHeader = styled.div`
  background-color: ${colors.greyInput};
  color: ${colors.black};
  box-sizing: border-box;
  padding: 3em ${props => props.mobileFullScreen ? spacing.pagePadding.p1 : '4em'};
  margin: 0;
  width: 100%;

  ${media.md`
    padding: 3em 3em;
  `}
`;

const HeaderMechantComponent = () => (
  <StyledHeader>
    <Text
      tag="h2"
      value="Dati per transazione economica"
      size="f4"
      color="blue"
    />
  </StyledHeader>
);

HeaderMechantComponent.displayName = 'header modal merchant';

export const HeaderMerchant = HeaderMechantComponent;

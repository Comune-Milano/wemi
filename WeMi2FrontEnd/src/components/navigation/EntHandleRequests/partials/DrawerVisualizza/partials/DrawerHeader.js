/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { colors } from 'theme'
import media from 'utils/media-queries';


const StyledHeader = styled.div`
  padding: 3em 3em;
  min-height: 7em;
  background-color: ${colors.greyInput};

  h2 {
    padding-right: 4em;
  }

  ${media.md`
    padding: 3em 6em;

    h2 {
      padding-right: 0;
    }
  `}

`;


const DrawerHeader = ({ headerValue }) => {
  const { text, date } = headerValue;
  return (
    <StyledHeader>
      <Text
        tag="h2"
        value={text}
        color="primary"
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        size="f5"
      />
      <Row fluid>
        <Text
          value={`Data richiesta: ${date}`}
          color="black"
          weight="bold"
          transform="uppercase"
          letterSpacing="0.05em"
          size="f6" 
        />
      </Row>
    </StyledHeader>
  );
};

DrawerHeader.displayName = 'DrawerHeader';
export default DrawerHeader;

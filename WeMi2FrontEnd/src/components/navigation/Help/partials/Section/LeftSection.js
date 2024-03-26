/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';

const LeftSectionColumn = styled(Column)`
    padding: 1rem 0 0 0;
    ${media.md`
    padding: 1rem 1.5rem 1rem 0;
    
    `}
    ${media.lg`
    padding: 1rem 4rem 1rem 0;
    
    `}
`

const LeftSection = ({ HelpJson}) => (
  <LeftSectionColumn sm={12} md={4} lg={3} >
    <Row fluid>
    <Text size="f3" value={HelpJson.Titolo.label} 
      weight={HelpJson.Titolo.weight}
    intlFormatter color="darkgrey" tag="p" padding="0 0.6rem 0 0" />

        <Text
          value={HelpJson.Titolo.labelBold}
          weight={HelpJson.Titolo.weightBold}
          size="f3"
          intlFormatter
          padding="0 0.6rem 0 0"
        />

</Row>
        <Row fluid margin="1rem 0 0">
        <Text
          size="f7"
          value={HelpJson.Sottotitolo.label}
          weight={HelpJson.Sottotitolo.weight}
          intlFormatter
          padding="0 0.6rem 0 0"
          tag="p"
        />
        </Row>

  </LeftSectionColumn>
);

LeftSection.displayName = 'LeftSection';

export default LeftSection;

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

const LeftSection = ({ spaces }) => (
  <LeftSectionColumn sm={12} md={4} lg={3} >
    <Row fluid>
      <Text size="f3" value={spaces.title} intlFormatter color="darkgrey" tag="p" padding="0 0.6rem 0 0" />
      <Text size="f3" value={spaces.titleBold.negli} intlFormatter color="darkgrey" padding="0 0.6rem 0 0" />
      <Text size="f3" value={spaces.titleBold.spazi} intlFormatter color="primary" weight="bold" padding="0 0.6rem 0 0" />
      <Text size="f3" value={spaces.titleBold.WeMi} intlFormatter color="darkgrey" weight="bold" />
    </Row>
    <Row fluid margin="1rem 0 0">
      <Text value={spaces.description} intlFormatter color="darkgrey" tag="p"     size="f7" />
    </Row>
  </LeftSectionColumn>
);

LeftSection.displayName = 'LeftSection';

export default LeftSection;

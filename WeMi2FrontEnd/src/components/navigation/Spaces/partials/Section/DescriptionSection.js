/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import media from 'utils/media-queries';

const DescriptionRow = styled(Row)`
padding: 0 0 1rem;
${media.md`
padding: 1.5rem 0 1rem;
`}

`;
const MyColumn = styled(Column)`
  padding: 0;
`;

const DescriptionSection = ({ spaces }) => (
  <DescriptionRow fluid >
    <MyColumn md={11} lg="8" >
    <Row fluidS>
      <Text value={spaces.descriptionUpper} intlFormatter color="darkgrey" />
      </Row>
      <Row fluid>
      <Text weight="bold" value={spaces.descriptionBold} intlFormatter color="darkgrey" padding="2rem 4.5rem 0 0" />
      </Row>
    </MyColumn>
  </DescriptionRow>
);

DescriptionSection.displayName = 'DescriptionSection';

export default DescriptionSection;

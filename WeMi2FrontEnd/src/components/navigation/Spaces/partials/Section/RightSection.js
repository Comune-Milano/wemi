/** @format */

import React from 'react';
import DescriptionSection from './DescriptionSection';
import ListSection from './ListSection';
import { Column } from 'components/ui/Grid';
import media from 'utils/media-queries';
import styled from 'styled-components';

const RightSectionColumn = styled(Column)`
    padding: 0;
    ${media.md`
    padding="1rem 0 0 1rem"
    
    `}
`


const RightSection = ({ spaces, contenuto }) => (
  <RightSectionColumn sm={12} md={8} lg="9"  >
    <DescriptionSection spaces={spaces} />
    <ListSection contenuto1={contenuto} />
  </RightSectionColumn>
);

RightSection.displayName = 'RightSection';

export default RightSection;

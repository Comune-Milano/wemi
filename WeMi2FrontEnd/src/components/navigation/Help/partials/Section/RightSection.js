/** @format */

import React from 'react';

import { Column } from 'components/ui/Grid';
import media from 'utils/media-queries';
import styled from 'styled-components';
import HelpList from '../HelpList';

const RightSectionColumn = styled(Column)`
    padding: 2em 0;
    ${media.md`
    padding="1rem 0 0 1rem"
    
    `}
`


const RightSection = () => (
  <RightSectionColumn sm={12} md={8} lg={9}  >
  <HelpList />
  </RightSectionColumn>
);

RightSection.displayName = 'RightSection';

export default RightSection;

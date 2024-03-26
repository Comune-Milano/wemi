/** @format */

import React from 'react';

import { Column } from 'components/ui/Grid';
import media from 'utils/media-queries';
import styled from 'styled-components';
import TestimonialsCarousel from '../TestimonialCarousel';

const RightSectionColumn = styled(Column)`
    padding: 0;
    ${media.md`
    padding="1rem 0 0 1rem"
    
    `}
`


const RightSection = ({ contenuto }) => (
  <RightSectionColumn sm={12} md={8} lg="9"  >
      <TestimonialsCarousel contenuto={contenuto} />
  </RightSectionColumn>
);

RightSection.displayName = 'RightSection';

export default RightSection;

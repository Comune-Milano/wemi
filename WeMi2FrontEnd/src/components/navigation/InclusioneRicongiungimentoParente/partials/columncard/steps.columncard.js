import React from 'react';
import { Image, StyledBoxSteps } from '../components.style';

export const ColumnCard = ({ img, title }) => (
  <StyledBoxSteps
    role="group"
    aria-roledescription="slide"
  >
    <Image
      src={img}
      alt={title}
    />
  </StyledBoxSteps>
  );

ColumnCard.displayName = 'HowItWorks - ColumnCard';

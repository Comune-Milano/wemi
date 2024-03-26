
import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from 'theme';

const StyledImageDescription = styled.div`
  > span {
    display: inline-block;
    padding: ${({ padding }) => padding || '0'};
    font-size: ${({ size }) => fonts.size[size || 'f7']};
    color: ${({ color }) => colors[color || 'black']};
    line-height: ${({ lineHeight }) => lineHeight || 1.9};
    letter-spacing: ${({ letterSpacingDescription }) => letterSpacingDescription};
  }
`;

export const HeaderImageDescription = ({
  description,
  size,
  color,
  padding,
  letterSpacingDescription = '0.05',
}) => (
  <StyledImageDescription
    size={size}
    color={color}
    padding={padding}
    letterSpacingDescription={letterSpacingDescription}
  >
    <span>
      {description}
    </span>
  </StyledImageDescription>
);

HeaderImageDescription.displayName = 'HeaderImageDescription';

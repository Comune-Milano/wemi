
import React from 'react';
import media from 'utils/media-queries';
import styled from 'styled-components';

const StyledImageCaptionWrapper = styled.div`
  min-height: 20rem;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: ${props => props.padding.xs};
  margin: ${props => props.margin.xs};

  ${media.md`
      padding: ${props => props.padding.md};
      justify-content: flex-start;
      height: 100%;
      min-height: auto;
      margin: ${props => props.margin.md};
  `};

  ${media.lg`
    padding: ${props => props.padding.lg};
    justify-content: flex-start;
    height: 100%;
    min-height: auto;
    margin: ${props => props.margin.md};
  `};

  ${media.xxxxl`
    padding: ${props => props.padding.xxxxl};
    margin: ${props => props.margin.md};
  `};
`;

export const HeaderImageCaptionWrapper = ({
  height = {
    xs: 'initial',
    md: 'initial',
    lg: '30.85vw',
  },
  maxHeight = {
    xs: 'initial',
    md: 'initial',
    lg: '33.875rem',
  },
  minHeight = {
    xs: '20rem',
    md: '30.85vw',
    lg: 'auto',
  },
  padding = {
    xs: '27vw 0 2rem 0',
    md: '5rem 0',
    lg: '5rem 0',
    xxxxl: '5rem 0',
  },
  margin = {
    xs: '0 2.8rem',
    md: '0 100px',
  },
  mdIsMobile,
  children,
}) => (
  <StyledImageCaptionWrapper
    height={height}
    maxHeight={maxHeight}
    margin={margin}
    minHeight={minHeight}
    padding={padding}
    mdIsMobile={mdIsMobile}
  >
    {children}
  </StyledImageCaptionWrapper>
);

HeaderImageCaptionWrapper.displayName = 'HeaderImageCaptionWrapper';

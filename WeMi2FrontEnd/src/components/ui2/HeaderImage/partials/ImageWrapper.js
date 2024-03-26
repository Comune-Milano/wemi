
import React from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';

export const StyledImgWrapper = styled.div`
  box-sizing: border-box;
  height: auto;
  ${media.md`
    height: 50vw;
  `};
  ${media.lg`
    height: 35.85vw;
  `};
  ${media.xl`
    max-height: 30.85rem;
  `};
  ${media.xxl`
    max-height: 33.8625rem;
  `};
`;

export const StyledImgBackgroundContainer = styled.div`
  background-image: url(${props => props.src});
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-position: top center;
  background-repeat: no-repeat;
  flex-direction: column;
  flex-flow: column;
  min-width: 100%;
  margin: 0;
  position: relative;
  padding: 0;
  display: flex;
  background-size: contain;
  ${media.md`
    background-size: cover;
  `};
`;

export const HeaderImageWrapper = ({
  imageSrc,
  children,
  className,
}) => (
  <StyledImgWrapper className={className}>
    <StyledImgBackgroundContainer src={imageSrc}>
      {children}
    </StyledImgBackgroundContainer>
  </StyledImgWrapper>
  );

HeaderImageWrapper.displayName = 'HeaderImageWrapper';

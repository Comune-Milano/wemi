
import React from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { Carousel } from '../Carousel';

const StyledImagesContainer = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  position: relative;
  list-style: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: transform 350ms ease-in-out;
  transform: translateX(-${props => props.currentSlideIndex * 100}%);
`;

const StyledImageSlot = styled.li`
  background-image: url(${props => props.source});
  background-size: contain;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  background-position: top center;
  background-repeat: no-repeat;
  flex-direction: column;
  flex-flow: column;
  min-width: 100%;
  margin: 0;
  position: relative;
  padding: 0;
  list-style: none;
  display: inline-block;

  ${media.md`
    background-size: ${props => props.backgroundSize};
  `};
`;

const StyledCaptionWrapper = styled.div`
  min-height: 20rem;
  display: flex;
  z-index: 1;
  position:absolute;
  justify-content: initial;
  flex-direction: column;
  padding: 27vw 0 2rem 0;
  margin: 0 2.8rem;

  ${media.md`
    padding: 5rem 0;
    justify-content: ${({ justifyContent }) => justifyContent};
    width: 40%;
    height: 100%;
    min-height: auto;
  `};

  ${media.md`
    margin: 0 100px;
  `};

  ${media.lg`
    margin: 0 100px;
  `};

  ${media.xxxxl`
    margin: 0 100px;
  `};
`;

const StyledDiv = styled.div`
  min-height: 30rem;
  display: flex;
`;

/**
 * A carousel component to show a set of images.
 */
export const FixedTextsImageCarousel = ({
  onSlideChange,
  currentSlideIndex,
  cyclic,
  autoPlay,
  justifyContent,
  marginDots,
  children,
  description,
  autoPlayInterval,
  backgroundSize = 'cover',
  images,
  showDots,
}) => (
  <Carousel
    onSlideChange={onSlideChange}
    marginDots={marginDots}
    currentSlideIndex={currentSlideIndex}
    cyclic={cyclic}
    autoPlay={autoPlay}
    autoPlayInterval={autoPlayInterval}
    slidesLength={images.length}
    description={description}
    showDots={showDots}
  >
    <StyledCaptionWrapper justifyContent={justifyContent}>
      {children}
    </StyledCaptionWrapper>
    <StyledImagesContainer currentSlideIndex={currentSlideIndex}>
      {
        images.map((image, index) => (
          <StyledImageSlot
            role="group"
            aria-roledescription="slide"
            backgroundSize={backgroundSize}
            key={image.id || index}
            aria-label={`${index + 1} di ${images.length}`}
            source={image.source}
          >
            <StyledDiv />
          </StyledImageSlot>
        ))
      }
    </StyledImagesContainer>
  </Carousel>
  );

FixedTextsImageCarousel.displayName = 'FixedTextsImageCarousel';

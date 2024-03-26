
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
  position: ${props => props.positionLi ? props.positionLi : 'relative'};
  padding: 0;
  list-style: none;
  display: inline-block;

  ${media.md`
    background-size: ${props => props.backgroundSize};
  `};
`;

/**
 * A carousel component to show a set of images.
 */
export const ImageCarousel = ({
  onSlideChange,
  currentSlideIndex,
  cyclic,
  autoPlay,
  positionLi,
  description,
  autoPlayInterval,
  backgroundSize = 'cover',
  images,
  showDots,
}) => (
  <Carousel
    onSlideChange={onSlideChange}
    currentSlideIndex={currentSlideIndex}
    cyclic={cyclic}
    autoPlay={autoPlay}
    autoPlayInterval={autoPlayInterval}
    slidesLength={images.length}
    description={description}
    showDots={showDots}
  >
    <StyledImagesContainer currentSlideIndex={currentSlideIndex}>
      {
          images.map((image, index) => (
            <StyledImageSlot
              role="group"
              aria-roledescription="slide"
              positionLi={positionLi}
              backgroundSize={backgroundSize}
              key={image.id || index}
              aria-label={`${index + 1} di ${images.length}`}
              source={image.source}
            >
              {image.caption}
            </StyledImageSlot>
          ))
        }
    </StyledImagesContainer>
  </Carousel>
  );

ImageCarousel.displayName = 'ImageCarousel';

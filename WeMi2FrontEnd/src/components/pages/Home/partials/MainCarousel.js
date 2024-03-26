/** @format */
import React, { useState } from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { ImageCarousel } from 'components/ui2/Carousel/Image/ImageCarousel';
import useWindowSize from 'hooks/useWindowSize';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { MainCarouselCaption } from './MainCarousel.partials/MainCarouselCaption';

const Wrapper = styled.div`
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

/**
 * The hero slider in the home page.
 */
const MainCarousel = ({ data, loading }) => {
  // Controls the visible slide.
  const [visibleSlideNumber, setVisibleSlideNumber] = useState(0);

  // The current window size.
  const windowSize = useWindowSize();

  const isDesktop = ['xs', 'sm'].indexOf(windowSize) === -1;

  // The set of images.
  const images = (data || []).map((item, index) => {
    const title = getObjectValue(item, 'tl_testo_1.it', '');
    const subtitle = getObjectValue(item, 'tl_testo_2.it', '');
    const buttonLabel = getObjectValue(item, 'tl_testo_3.it', '');
    const buttonLink = getObjectValue(item, 'ln_link_1', '');
    const titleSize = index === 0 && isDesktop ? 'f1' : 'f4';
    const justifyContent = index === 0 && isDesktop ? 'center' : 'flex-start';
    const titleWrapperMinHeight = subtitle && buttonLabel ? '6em' : '';

    return {
      id: item.id_contenuto,
      source: item.iw_path_media1,
      caption: (
        <MainCarouselCaption
          title={title}
          subtitle={subtitle}
          buttonLabel={buttonLabel}
          buttonLink={buttonLink}
          titleSize={titleSize}
          justifyContent={justifyContent}
          titleWrapperMinHeight={titleWrapperMinHeight}
        />
      ),
    };
  });

  // Determines if the slides dots should be visible.
  const showSliderDots = ['xs', 'sm'].indexOf(windowSize) > -1;

  return (
    <Wrapper>
      {
        !loading && (
          <ImageCarousel
            autoPlay
            cyclic
            description="WeMi"
            positionLi="unset"
            images={images}
            currentSlideIndex={visibleSlideNumber}
            onSlideChange={index => setVisibleSlideNumber(index)}
            showDots={showSliderDots}
          />
        )
      }
    </Wrapper>
  );
};

MainCarousel.displayName = 'MainCarousel';

export default React.memo(MainCarousel);

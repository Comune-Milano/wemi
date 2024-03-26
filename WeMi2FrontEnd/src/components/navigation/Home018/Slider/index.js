/** @format */
import React, { useState } from 'react';
import { ImageCarousel } from 'components/ui2/Carousel/Image/ImageCarousel';
import useWindowSize from 'hooks/useWindowSize';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { WINDOW_SIZE } from 'types/windowSize';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { SliderCarouselCaption } from './partials';

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
 * The hero slider in the Homepage 0-18.
 */
const SliderCarousel = ({ data, loading, widthDescription }) => {
  // Controls the visible slide.
  const [visibleSlideNumber, setVisibleSlideNumber] = useState(0);

  // The current window size.
  const windowSize = useWindowSize();

  // The set of images.
  const images = React.useMemo(() => (data || []).map((item) => {
    const title = getObjectValue(item, 'title', '');
    const subtitle = getObjectValue(item, 'description', '');

    return {
      id: item.id,
      source: item.iw_path_media1,
      caption: (
        <SliderCarouselCaption
          title={title}
          subtitle={subtitle}
          widthDescription={widthDescription}
        />
      ),
    };
  }), [data]);

  // Determines if the slides dots should be visible.
  const showSliderDots = [...WINDOW_SIZE.windowSizesSmall].indexOf(windowSize) > -1;

  return (
    <Wrapper>
      {
        !loading && (
          <ImageCarousel
            autoPlay
            cyclic
            description="WeMi 0-18"
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

SliderCarousel.displayName = 'SliderCarousel';
export default React.memo(SliderCarousel);

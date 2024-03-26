/** @format */
import React, { useState } from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { ImageCarousel } from 'components/ui2/Carousel/Image/ImageCarousel';

const Wrapper = styled.div`
  height: 30.2vw;

  ${media.md`
    height: 27.7vw;
  `};
  
  ${media.xl`
    max-height: 33.8625rem;
  `};

  &  li {
    background-size: cover;
  }
`;

const ServiceCarousel = ({ loading, data, className }) => {
  // Controls the visible slide.
  const [visibleSlideNumber, setVisibleSlideNumber] = useState(0);

  // The set of images.
  const images = (data || []).map(item => ({
    id: item.id_media,
    source: item.source,
  }));

  return (
    <Wrapper className={className}>
      {
        !loading && (
          <ImageCarousel
            cyclic
            autoPlay
            description="Servizio ente"
            backgroundSize="cover"
            images={images}
            currentSlideIndex={visibleSlideNumber}
            onSlideChange={index => setVisibleSlideNumber(index)}
          />
        )
      }
    </Wrapper>
  );
};

ServiceCarousel.displayName = 'ServiceCarousel';

export default React.memo(ServiceCarousel);

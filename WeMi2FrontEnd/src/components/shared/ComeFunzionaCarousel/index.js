import { Row } from 'components/ui/Grid';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React, { useState } from 'react';
import HowItWorksCarousel from './partials/howitworkscarousel';


const ComeFunzionaCarousel = ({ stepList, color, children }) => {
  const [visibleSlideNumber, setVisibleSlideNumber] = useState(0);


  return (
    <>
      <Row fluid padding="0" sizepadding={{ xs: '5.5rem 0 2rem 0', xsm: '5rem 0 2rem 0', md: '8.6rem 0 2.2rem 0' }}>
        <BackgroundTitle
          label="Come funziona"
          bgColor={color}
          size={bgTitleSizes.small}
        />
      </Row>
      {children}
      <HowItWorksCarousel
        stepList={stepList}
        visibleSlideNumber={visibleSlideNumber}
        setVisibleSlideNumber={setVisibleSlideNumber}
        bgColor={color}
      />
    </>
  );
};

ComeFunzionaCarousel.displayName = 'ComeFunzionaCarousel';
export default ComeFunzionaCarousel;

import React, { useState } from 'react';
import { FixedTextsImageCarousel } from 'components/ui2/Carousel/Image/FixedTextsImageCarousel';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import useWindowSize from 'hooks/useWindowSize';
import { Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Wrapper } from '../components.styled';
import { EstraiSliderEducazioneFinanziaria } from '../graphql';

const FinancialEducationCarousel = () => {

  const [contenutoSlider, getContenutoSlider] = useGraphQLRequest(
    {
      total: 0,
      list: [],
    },
    EstraiSliderEducazioneFinanziaria,
    {
      input: {},
    },
    true,
      response => response.list.map(contenuto => ({
        source: encodeURI(contenuto.image?.path),
        title: contenuto.title,
        description: contenuto.description,
      }))
  );

  const hasToRender = !contenutoSlider.isLoading && !contenutoSlider.pristine && contenutoSlider.data.length > 0;

  const images = hasToRender ? contenutoSlider.data.map(image => ({
    source: image.source,
    title: image.title,
    description: image.description,
  })) : [];


  const [visibleSlideNumber, setVisibleSlideNumber] = useState(0);

  const windowSize = useWindowSize();

  const isMobile = React.useMemo(() => ['xs', 'sm'].indexOf(windowSize) > -1, [windowSize]);

  return (
    <>
      {hasToRender ? (
        <Wrapper>
          <FixedTextsImageCarousel
            cyclic
            autoPlay
            marginDots
            description="Educazione finanziaria"
            images={images}
            currentSlideIndex={visibleSlideNumber}
            onSlideChange={index => setVisibleSlideNumber(index)}
            showDots={isMobile}
          >
            <BackgroundTitle
              label={images[0].title}
              size="small"
              color="white"
              bgColor="purple"
            />
            <Column padding="0" margin="1em 0 0 0" md="9">
              <Text
                size="f7"
                color="black"
                lineHeight="1.9"
                value={images[0].description}
                whitespace={!isMobile ? 'pre-line' : ''}
              />
            </Column>
          </FixedTextsImageCarousel>
        </Wrapper>
      )

        : null }
    </>
  );
};

FinancialEducationCarousel.displayName = 'FinancialEducationCarousel';


export default FinancialEducationCarousel;

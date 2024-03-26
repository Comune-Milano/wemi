import React, { useState } from 'react';
import { Carousel } from 'components/ui2/Carousel';
import useWindowSize from 'hooks/useWindowSize';
import { Column, Row } from 'components/ui/Grid';
import { WINDOW_SIZE } from 'types/windowSize';
import StepperListImages from 'components/ui2/StepperListImages';
import { WrapperUlMobile } from './components.style';
import { ColumnCard } from './columncard/columncard';
import { STEPLIST } from '../constants';

const ComeFunziona = () => {
  const [visibleSlideNumber, setVisibleSlideNumber] = useState(0);

  const windowSize = useWindowSize();
  const isDesktop = [...WINDOW_SIZE.windowSizesSmall, ...WINDOW_SIZE.windowSizesMedium].indexOf(windowSize) === -1;

  return (
    <>
      {isDesktop ?
        // DESKTOP
        (
          <>
            <Row fluid flex margin="0 0 0 2rem" justifycontent="center" alignitems="center">
              <StepperListImages
                content={STEPLIST}
                imgWidth="6em"
                imgHeight="6em"
                mdSize="5"
                lgSize="3"
                widthBorder={{ lg: '2rem', xl: '3.5rem' }}
                marginLastXl="0 2rem 0 0"
                marginLastLg="0"
              />
            </Row>
          </>
        ) :
        // MOBILE
        (
          <Column padding="0" alignitems="center" justifycontent="center">
            <Carousel
              onSlideChange={index => setVisibleSlideNumber(index)}
              currentSlideIndex={visibleSlideNumber}
              slidesLength={STEPLIST.length}
              description="Come funziona?"
              showDots
            >
              <WrapperUlMobile currentSlideIndex={visibleSlideNumber}>
                {STEPLIST.map((step, index) => (
                  <ColumnCard
                    key={`card_${index.toString()}`}
                    img={step.img}
                    title={step.title}
                    link={`#${step.tag}`}
                  />
                ))}
              </WrapperUlMobile>
            </Carousel>
          </Column>
        )
      }
    </>
  );
};

ComeFunziona.displayName = 'ComeFunziona';
export default ComeFunziona;

import React, { useState } from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import StepperListImages from 'components/ui2/StepperListImages';
import useWindowSize from 'hooks/useWindowSize';
import { Carousel } from 'components/ui2/Carousel';
import { WrapperUlMobile } from 'components/navigation/InclusioneRicongiungimentoParente/partials/components.style';
import { ColumnCard } from 'components/navigation/InclusioneRicongiungimentoParente/partials/columncard/columncard';
import { WINDOW_SIZE } from 'types/windowSize';
import { comeCercare, stepList } from './costants';

const ComeCercare = ({
  color = 'blue',
}) => {
  const [visibleSlideNumber, setVisibleSlideNumber] = useState(0);

  const windowSize = useWindowSize();
  const isDesktop = [...WINDOW_SIZE.windowSizesSmall, ...WINDOW_SIZE.windowSizesMedium].indexOf(windowSize) === -1;

  return (
    <Row fluid>
      <BackgroundTitle
        bgColor={color}
        label={comeCercare.comeCercareTitle}
        size={bgTitleSizes.small}
      />
      <Column padding="0" margin="1.8em 0 0 0">
        <Text
          value={comeCercare.comeCercareText1}
          lineHeight="175%"
          tag="div"
          size="f7"
        />
        <Text
          value={comeCercare.comeCercareText2}
          lineHeight="175%"
          size="f7"
        />
      </Column>
      {isDesktop ?
        (
          // Desktop
          <Row fluid margin="1.8em 0 0 0" flex justifycontent="center" alignitems="center">
            <StepperListImages
              content={stepList}
            />
          </Row>
        ) : (
          // Mobile
          <Column padding="2em 0 0 0" alignitems="center" justifycontent="center">
            <Carousel
              onSlideChange={index => setVisibleSlideNumber(index)}
              currentSlideIndex={visibleSlideNumber}
              slidesLength={stepList.length}
              description="Livelli"
              showDots
            >
              <WrapperUlMobile currentSlideIndex={visibleSlideNumber}>
                {stepList.map((step, index) => (
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
    </Row>
  );
};
ComeCercare.displayName = 'ComeCercareNavigation';

export default ComeCercare;

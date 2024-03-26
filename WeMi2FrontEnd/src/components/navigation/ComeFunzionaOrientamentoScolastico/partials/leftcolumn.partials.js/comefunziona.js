import { Row, Column } from 'components/ui/Grid';
import Hr from 'components/ui/Hr';
import Text from 'components/ui/Text';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React, { useState } from 'react';
import { Carousel } from 'components/ui2/Carousel';
import useWindowSize from 'hooks/useWindowSize';
import { WrapperUlMobile } from 'components/navigation/InclusioneRicongiungimentoParente/partials/components.style';
import { ColumnCard } from 'components/navigation/InclusioneRicongiungimentoParente/partials/columncard/columncard';
import StepperListImages from 'components/ui2/StepperListImages';
import { WINDOW_SIZE } from 'types/windowSize';
import { stepList } from '../../costants';

const ComeFunziona = () => {
  const [visibleSlideNumber, setVisibleSlideNumber] = useState(0);

  const windowSize = useWindowSize();

  const isDesktop = [...WINDOW_SIZE.windowSizesSmall, ...WINDOW_SIZE.windowSizesMedium].indexOf(windowSize) === -1;
console.log()
  return (
    <>
      <Row fluid>
        <BackgroundTitle size={bgTitleSizes.small} label="COME FUNZIONA L'ORIENTAMENTO SCOLASTICO" bgColor="purple" />
      </Row>
      <Row fluid margin="1.5em 0 0 0">
        <Text
          value="I tuoi figli stanno per arrivare o sono arrivati in Italia e cercano una scuola?"
          size="f7"
          weight="bold"
          color="black"
          lineHeight="175%"
        />
      </Row>
      <Row fluid>
        <Text
          value="Il Servizio gratuito di orientamento scolastico ed extrascolastico può aiutarvi nella scelta della scuola, nell'iscrizione e nella ricerca di attività extrascolastiche."
          size="f7"
          color="black"
          lineHeight="175%"
        />
      </Row>
      {isDesktop ?
        (
          <>
            <Column padding="0" margin="1.8em 0 0 0" flex justifycontent="center" alignitems="center">
              <StepperListImages content={stepList} />
            </Column>
          </>
        ) : (
          <Column padding="2em 0 0 0" alignitems="center" justifycontent="center">
            <Carousel
              onSlideChange={index => setVisibleSlideNumber(index)}
              currentSlideIndex={visibleSlideNumber}
              slidesLength={stepList.length}
              description="Come funziona?"
              showDots
            >
              <WrapperUlMobile currentSlideIndex={visibleSlideNumber}>
                {stepList.map((step) => (
                  <ColumnCard
                    key={step.tag}
                    img={step.img}
                    title={step.title}
                    link={`#${step.tag}`}
                  />
                ))}
              </WrapperUlMobile>
            </Carousel>
          </Column>
        )}
    </>
  );
};

ComeFunziona.displayName = 'ComeFunziona';
export default ComeFunziona;

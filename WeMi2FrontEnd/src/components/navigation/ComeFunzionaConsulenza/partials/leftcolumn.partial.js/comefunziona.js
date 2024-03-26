import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React, { useState } from 'react';
import { Carousel } from 'components/ui2/Carousel';
import useWindowSize from 'hooks/useWindowSize';
import { WrapperUlMobile } from 'components/navigation/InclusioneRicongiungimentoParente/partials/components.style';
import { ColumnCard } from 'components/navigation/InclusioneRicongiungimentoParente/partials/columncard/columncard';
import StepperListImages from 'components/ui2/StepperListImages';
import { WINDOW_SIZE } from 'types/windowSize';
import { stepList } from '../../constants';

const ComeFunziona = () => {
  const [visibleSlideNumber, setVisibleSlideNumber] = useState(0);

  const windowSize = useWindowSize();

  const isDesktop = [...WINDOW_SIZE.windowSizesSmall, ...WINDOW_SIZE.windowSizesMedium].indexOf(windowSize) === -1;

  return (
    <>
      <Row fluid>
        <Row fluid>
          <BackgroundTitle size={bgTitleSizes.small} label="COME FUNZIONA LA CONSULENZA SOCIALE E GIURIDICA" bgColor="green" />
        </Row>
        <Row fluid margin="1.5em 0 0 0">
          <Text
            value="Sei un cittadina o un cittadino straniero e hai necessità di ricevere informazione e supporto per le pratiche di rilascio, rinnovo e conversione del tuo permesso di soggiorno, di richiesta di cittadinanza o consulenza specialistica su tematiche connesse allo stato civile, al diritto di famiglia e alla tutela dei minori?"
            size="f7"
            weight="bold"
            color="black"
            lineHeight="175%"
          />
        </Row>
        <Row fluid>
          <Text
            value="Il Servizio gratuito di consulenza sociale e giuridica può aiutarti per la corretta presentazione delle istanze, per la raccolta della documentazione utile da allegare e per l'accesso ai portali dedicati."
            size="f7"
            color="black"
            lineHeight="175%"
          />
        </Row>
      </Row>
      {isDesktop ?
        (
          <Row fluid margin="1.8em 0 0 0" flex justifycontent="center" alignitems="center">
            <StepperListImages
              content={stepList}
            />
          </Row>
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

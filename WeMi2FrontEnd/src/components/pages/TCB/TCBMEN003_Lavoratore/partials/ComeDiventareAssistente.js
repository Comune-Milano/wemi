import React, { useState } from 'react';
import CarouselRowImages from 'components/ui2/CarouselRowImages';
import lavoratore01 from 'images2/homeTCB/come-funziona-lavoratore-01.png';
import lavoratore02 from 'images2/homeTCB/come-funziona-lavoratore-02.png';
import lavoratore03 from 'images2/homeTCB/come-funziona-lavoratore-03.png';
import lavoratore04 from 'images2/homeTCB/come-funziona-lavoratore-04.png';
import lavoratore05 from 'images2/homeTCB/come-funziona-lavoratore-05.png';
import { Column, Row } from 'components/ui/Grid';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';

const ComeDiventareAssistente = () => {
  const [visibleSlideNumber, setVisibleSlideNumber] = useState(0);

  const stepList = [
    {
      title: 'step 1',
      img: lavoratore01,
      textbold: 'Scegli per quale servizio candidarti, ',
      text2: ' compila la scheda di candidatura e crea il tuo curriculum.',
    },
    {
      title: 'step 2',
      img: lavoratore02,
      text1: `Fissa un appuntamento per
      validare la tua candidatura
      presso i WeMi center.`,
    },
    {
      title: 'step 3',
      img: lavoratore03,
      text1: `Incontra le famiglie
      che ti hanno scelto/a
      e decidi se accettare
      le proposte di lavoro.`,
    },
    {
      title: 'step 4',
      img: lavoratore04,
      text1: `Inizia a lavorare
      come baby-sitter, colf
      o badante.`,
    },
    {
      title: 'step 5',
      img: lavoratore05,
      text1: `Inviaci il tuo feedback,
      ci aiuterà a migliorare
      il servizio!`,
    },
  ];

  const titolo = 'COME DIVENTARE\nUN ASSISTENTE FAMILIARE WeMi';

  return (
    <>
      <Row fluid margin="2em 0 1.8em 0">
        <BackgroundTitle
          bgColor="green"
          transform="none"
          label={titolo}
          size={bgTitleSizes.small}
        />
      </Row>
      <Column padding="2em 0 0" alignitems="center" justifycontent="center">
        <CarouselRowImages
          stepList={stepList}
          visibleSlideNumber={visibleSlideNumber}
          setVisibleSlideNumber={setVisibleSlideNumber}
        />
      </Column>
    </>
  );
};

ComeDiventareAssistente.displayName = 'ComeDiventareAssistente';
export default ComeDiventareAssistente;

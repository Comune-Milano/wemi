import React, { useState } from 'react';
import CarouselRowImages from 'components/ui2/CarouselRowImages';
import cittadino01 from 'images2/homeTCB/come-funziona-cittadino-01.png';
import cittadino02 from 'images2/homeTCB/come-funziona-cittadino-02.png';
import cittadino03 from 'images2/homeTCB/come-funziona-cittadino-03.png';
import cittadino04 from 'images2/homeTCB/come-funziona-cittadino-04.png';
import cittadino05 from 'images2/homeTCB/come-funziona-cittadino-05.png';
import { Column, Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';


const ComeAccedere = () => {
  const [visibleSlideNumber, setVisibleSlideNumber] = useState(0);

  const stepList = [
    {
      title: 'step 1',
      img: cittadino01,
      textbold: 'Seleziona il servizio ',
      text2: 'di tuo interesse, personalizza la tua richiesta e inviala.*',
    },
    {
      title: 'step 2',
      img: cittadino02,
      text1: "Riceverai un'e-mail di conferma ed entro tre giorni ti invieremo i CV di ",
      textbold: 'tre assistenti familiari selezionati per te.',
    },
    {
      title: 'step 3',
      img: cittadino03,
      textbold: 'Scegli chi incontrare',
      text2: ' e fissa l’appuntamento a casa tua o presso i nostri centri.',
    },
    {
      title: 'step 4',
      img: cittadino04,
      textbold: 'Decidi quale assistente familiare assumere ',
      text2: 'e avvia la collaborazione. Contattaci se hai bisogno di aiuto!',
    },
    {
      title: 'step 5',
      img: cittadino05,
      textbold: 'Inviaci il tuo feedback, ',
      text2: ' ci aiuterà a migliorare il servizio!',
    },
  ];

  const titolo = 'COME ACCEDERE AL SERVIZIO';

  return (
    <>
      <Row fluid margin="2em 0 1.8em 0">
        <BackgroundTitle
          label={titolo}
          bgColor="primary"
          size={bgTitleSizes.small}
        />
      </Row>
      <Column padding="0" alignitems="center" justifycontent="center">
        <CarouselRowImages
          stepList={stepList}
          visibleSlideNumber={visibleSlideNumber}
          setVisibleSlideNumber={setVisibleSlideNumber}
        />
      </Column>
      <Column padding="2.5em 2em 0 2em" alignitems="center">
        <Text
          value="*Accedendo all’Area Riservata potrai gestire in qualsiasi momento la tua richiesta."
          size="f7"
          color="dark"
          tag="div"
          align="center"
        />
      </Column>
    </>
  );
};

ComeAccedere.displayName = 'ComeAccedere';
export default ComeAccedere;

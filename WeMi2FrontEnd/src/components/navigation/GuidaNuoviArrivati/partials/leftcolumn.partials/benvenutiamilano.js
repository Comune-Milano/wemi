import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React from 'react';

const BenvenutiAMilano = () => (
  <>
    <Row fluid>
      <BackgroundTitle size={bgTitleSizes.small} label="BENVENUTI A MILANO - WELCOME GUIDE" bgColor="orange" />
    </Row>
    <Row fluid margin="1.8em 0 0 0">
      <Text
        value="UNA GUIDA PER FORNIRE AI NUOVI ARRIVATI E LE NUOVE ARRIVATE LE INFORMAZIONI NECESSARIE PER VIVERE A MILANO"
        color="orange"
        size="f6"
        weight="bold"
        letterSpacing="0.05em"
        lineHeight="175%"
      />
    </Row>
    <Row fluid>
      <Text
        value="Milano è una città cosmopolita con una vasta popolazione proveniente dai più diversi Paesi. Per questo motivo il Comune di Milano ha pubblicato questa guida che comprende la gamma completa dei servizi offerti e il modo per accedervi con facilità."
        size="f7"
        lineHeight="175%"
        color="black"
      />
    </Row>
    <Row fluid margin="2em 0 2.5em 0">
      <Text
        value="Alcune informazioni sulla modalità di accesso ai servizi contenute nella Welcome Guide potrebbero aver subito delle modifiche, pertanto si consiglia di verificarle utilizzando i link segnati nelle varie sezioni."
        color="orange"
        weight="bold"
        size="f7"
        lineHeight="175%"
      />
    </Row>
  </>
  );

BenvenutiAMilano.displayName = 'BenvenutiAMilano';
export default BenvenutiAMilano;

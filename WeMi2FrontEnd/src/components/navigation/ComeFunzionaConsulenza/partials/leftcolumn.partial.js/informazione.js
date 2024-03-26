import { TextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React from 'react';

const Informazione = () => (
  <div id="informazione">
    <Row fluid>
      <Row fluid margin="2.7em 0 0 0">
        <BackgroundTitle size={bgTitleSizes.small} label="INFORMAZIONE" bgColor="green" />
      </Row>
      <Row fluid margin="1.2em 0 0 0">
        <Text
          value="INCONTRARE GLI OPERATORI PER RICEVERE INFORMAZIONI APPROFONDITE"
          size="f6"
          weight="bold"
          letterSpacing="0.05em"
          color="green"
          lineHeight="175%"
        />
      </Row>
      <Row fluid>
        <TextSpan>
          Il servizio ti accompagna nell&apos;approfondimento della tua richiesta.
          <br />
          Se necessario il servizio si può avvalere dell&apos;intervento di mediatori linguistici per comprendere le problematiche segnalate.
          <br />
          In questa fase è opportuno presentare al Servizio tutta la documentazione in tuo possesso relativa alla pratica che vuoi presentare per consentire di individuare il percorso da seguire.
        </TextSpan>
      </Row>
    </Row>
  </div>
);

Informazione.displayName = 'Informazione';
export default Informazione;

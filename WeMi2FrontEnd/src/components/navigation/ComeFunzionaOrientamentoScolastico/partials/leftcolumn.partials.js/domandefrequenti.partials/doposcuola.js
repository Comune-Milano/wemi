import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import TextAccordion from 'components/ui2/TextAccordion';
import React from 'react';

const DopoScuola = () => (
  <>
    <Row fluid margin="1em 0 0 0">
      <TextAccordion
        label="COSA PUò FARE CHI HA FINITO IL SECONDO CICLO DI ISTRUZIONE?"
        weight="bold"
        size="f6"
        labelTransform="uppercase"
        labelLetterSpacing="0.05em"
        color="purple"
      >
        <Text
          value="Finito il secondo ciclo di istruzione esistono i corsi post-diploma o universitari. Il nostro servizio fornisce informazioni sugli sportelli di orientamento in ingresso presenti in ogni università."
          size="f7"
          color="black"
          lineHeight="175%"
        />
      </TextAccordion>
    </Row>
  </>
);

DopoScuola.displayName = 'DopoScuola';
export default DopoScuola;

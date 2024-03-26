import React from 'react';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import TextAccordion from 'components/ui2/TextAccordion';
import { TextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';
import { StyledUl } from '../components.style';

export const RichiestaRicongiungimento = () => (
  <Row fluid margin="0 0 1em">
    <TextAccordion
      label="CHI PUÒ RICHIEDERE IL RICONGIUNGIMENTO FAMILIARE?"
      weight="bold"
      labelTransform="uppercase"
      labelLetterSpacing="0.05em"
      color="red"
      size="f6"
    >
      <TextSpan>
        Cittadini e cittadine non comunitari in possesso di uno dei seguenti titoli di soggiorno:
      </TextSpan>
      <StyledUl>
        <li>
          <Text
            size="f7"
            value="Carta di soggiorno/permesso di soggiorno CE di lunga durata"
            lineHeight="175%"
          />
        </li>
        <li>
          <Text
            size="f7"
            value="Permesso di soggiorno della durata di almeno 1 anno. In caso di permesso di soggiorno scaduto, quest'ultimo deve essere accompagnato dalla ricevuta di presentazione della domanda di rinnovo"
            lineHeight="175%"
          />
        </li>
      </StyledUl>
    </TextAccordion>
  </Row>
);

RichiestaRicongiungimento.displayName = 'RichiestaRicongiungimento';

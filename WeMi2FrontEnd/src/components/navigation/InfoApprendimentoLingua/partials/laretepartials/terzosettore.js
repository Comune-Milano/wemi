import { Row } from 'components/ui/Grid';
import React from 'react';
import TextAccordion from 'components/ui2/TextAccordion';
import { TextSpan } from '../../components.style';

const TerzoSettore = () => (
  <>
    <Row fluid margin="1em 0 0 0">
      <TextAccordion
        label="TERZO SETTORE"
        size="f6"
        weight="bold"
        labelLetterSpacing="0.05em"
        color="blue"
      >
        <Row fluid>
          <TextSpan>
            <b>Cooperative, Fondazioni, associazioni di volontariato, parrocchie, ...</b>
            <br />
            A Milano è presente una ricca rete di scuole gestite da Enti del Terzo Settore, con una lunga e diversificata esperienza nella progettazione e gestione di corsi di italiano L2 per adulti, mamme con bambini, bambini e ragazzi, persone in situazione di vulnerabilità.
          </TextSpan>
        </Row>
      </TextAccordion>
    </Row>
  </>
);

TerzoSettore.displayName = 'TerzoSettore';
export default TerzoSettore;

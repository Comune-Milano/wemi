import { Row } from 'components/ui/Grid';
import React from 'react';
import TextAccordion from 'components/ui2/TextAccordion';
import { TextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';
import { List } from 'components/ui2/List';
import { cosaOccorreList } from './costants';

const CosaOccorre = () => (
  <>
    <Row fluid margin="1em 0 0 0">
      <TextAccordion
        label="COSA OCCORRE FARE PER ISCRIVERE I FIGLI NEO-ARRIVATI A SCUOLA?"
        weight="bold"
        size="f6"
        labelTransform="uppercase"
        labelLetterSpacing="0.05em"
        color="purple"
      >
        <TextSpan>
          É importante sapere che:
        </TextSpan>
        <List>
          {cosaOccorreList}
        </List>
      </TextAccordion>
    </Row>
  </>
);

CosaOccorre.displayName = 'CosaOccorre';
export default CosaOccorre;

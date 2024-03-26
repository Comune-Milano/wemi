import { Row } from 'components/ui/Grid';
import React from 'react';
import TextAccordion from 'components/ui2/TextAccordion';
import { TextSpan } from '../../components.style';

const Università = () => (
  <>
    <Row fluid margin="1em 0 0 0">
      <TextAccordion
        label="UNIVERSITÀ"
        size="f6"
        weight="bold"
        labelLetterSpacing="0.05em"
        color="blue"
      >
        <Row fluid>
          <TextSpan>
            Le Università offrono Corsi di Italiano per i propri studenti e talvolta anche per esterni per favorire l&apos;inclusione degli studenti internazionali. 
          </TextSpan>
        </Row>
      </TextAccordion>
    </Row>
  </>
  );

Università.displayName = 'Università';
export default Università;

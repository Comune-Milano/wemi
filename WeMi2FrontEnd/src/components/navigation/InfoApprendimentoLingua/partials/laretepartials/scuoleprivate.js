import { Row } from 'components/ui/Grid';
import React from 'react';
import TextAccordion from 'components/ui2/TextAccordion';
import { TextSpan } from '../../components.style';

const ScuolePrivate = () => (
  <>
    <Row fluid margin="1em 0 0 0">
      <TextAccordion
        label="SCUOLE PRIVATE"
        size="f6"
        weight="bold"
        labelLetterSpacing="0.05em"
        color="blue"
      >
        <Row fluid>
          <TextSpan>
            A Milano diverse scuole private offrono Corsi a pagamento e pacchetti specifici per i
            cittadini stranieri che intendono chiedere un visto per motivi di studio in Italia per
            l&apos;apprendimento della lingua italiana.
          </TextSpan>
        </Row>
      </TextAccordion>
    </Row>
  </>
  );

ScuolePrivate.displayName = 'ScuolePrivate';
export default ScuolePrivate;

import React from 'react';
import { Row } from 'components/ui/Grid';
import TextAccordion from 'components/ui2/TextAccordion';
import { colors } from 'theme';
import styled from 'styled-components';

const Wrapper = styled(Row)`
    background-color: ${colors.greyInput};
    padding: ${(props) => props.paddingWrapper};
`;

const DisponibilitaOrariaLavoratoreAccordion = ({
  children, 
  textTipologiaOrario,
  paddingWrapper
}) => (
  <Row padding="2em 0 0 0">
    <TextAccordion
      label={`Seleziona la disponibilità per la tipologia orario ${textTipologiaOrario}`}
      size="f7"
      color="primary"
    >
      <Wrapper justifycontent="space-between" paddingWrapper={paddingWrapper}>
        {children}
      </Wrapper>
    </TextAccordion>
  </Row>
  );

DisponibilitaOrariaLavoratoreAccordion.displayName = 'DisponibilitaOrariaLavoratoreAccordion';
export default DisponibilitaOrariaLavoratoreAccordion;

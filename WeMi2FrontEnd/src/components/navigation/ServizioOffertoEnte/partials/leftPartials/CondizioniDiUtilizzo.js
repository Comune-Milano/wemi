/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import FaIcon from 'components/ui2/FaIcon';
import { colors, fonts } from 'theme';
import styled from 'styled-components';
import { SectionTitle } from '../SectionTitle';
import { SectionWrapperColumn } from '../SectionWrapperColumn';

const StyledButton = styled.button`
  font-size: ${fonts.size.f9};
  text-align: center;
  width: 2em;
  height: 2em
  border-radius: 100%;
  background-color: transparent;
  outline: none !important;
  box-sizing: border-box;
  cursor: default;
  border: 2px solid ${colors.primary};
  color: ${colors.primary};
  padding: 0;
  line-height: 1.8;
`;

const P = styled.p`
margin-top:0.5em;
`;

export const TextIcon = ({ value }) => (
  <P>
    {value}
    <StyledButton
      aria-label="Pulsante della scheda ente"
      tabIndex="-1"
    >
      <FaIcon
        icon="info"
      />
    </StyledButton>
  </P>
);


TextIcon.displayName = 'TextIcon';

const CondizioniDiUtilizzo = ({ sectionsContentPrintWidth }) => (
  <Row fluid margin="3.9rem 0 0 0">
    <SectionTitle
      value="CONDIZIONI DI UTILIZZO"
    />
    <SectionWrapperColumn
      padding="0"
      margin="0"
      xs="12"
      sectionsContentPrintWidth={sectionsContentPrintWidth}
    >
      <TextIcon
        value="Le condizioni di utilizzo/servizio e privacy policy sono scaricabili dalla scheda dell&apos;ente raggiungibile cliccando su "
      />
    </SectionWrapperColumn>
  </Row>
);


CondizioniDiUtilizzo.displayName = 'CondizioniDiUtilizzo';

export default (CondizioniDiUtilizzo);

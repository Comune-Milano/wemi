/** @format */

import React from 'react';
import media from 'utils/media-queries';
import { colors, fonts, spacing } from 'theme';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import InviaCandidatura from './InviaCandidatura';
import { titoloLavoraComeAssistente } from './costants';


const StyledTitle = styled.span`
  > span {
    -webkit-box-decoration-break: clone;
    white-space: pre;
    line-height: 2;
    letter-spacing: 0.05em;
    font-weight: 700;
    background-color: ${props => colors[props.color]};
    font-weight: semi-bold;
    font-size: ${fonts.size.f5};
    color: white;
    padding: 0.2em 0.5em;
  }
`;

const MyRow = styled(Row)`
  background-color: #ECECEC;
  position: relative;
 
  overflow-x: hidden;
  padding: 3em 2.8rem;

  ${media.md`
    padding: 4em 100px 2em 100px;
  `};
`;

const LavoraComeAssistente = ({
  sottoTitolo,
  color,
  setOpenModal,
}) => (
  <MyRow fluid>
    <Column padding="2.8em 0 0 0" lg="3">
      <StyledTitle color={color}>
        <span>{titoloLavoraComeAssistente}</span>
      </StyledTitle>
      <Text
        value={sottoTitolo}
        size="f7"
        tag="div"
        padding="2em 0 0"
      />
    </Column>
    <Column padding="0" lg="9">
      <InviaCandidatura setOpenModal={setOpenModal} />
    </Column>
  </MyRow>
  );

LavoraComeAssistente.displayName = 'LavoraComeAssistente';

export default LavoraComeAssistente;

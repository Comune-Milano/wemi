/** @format */
import styled from 'styled-components';
import { colors } from 'theme';

const DivBackgroundStyled = styled.div`
  background-color: ${props => colors[props.color]};
  margin: 0.5em;
  padding: 1em;
  cursor: default;
`;
DivBackgroundStyled.displayName = 'DivBackgroundStyled';

export const DivBackground = DivBackgroundStyled;

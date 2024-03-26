import styled from 'styled-components';
import { colors } from 'theme';

export const StyledFieldset = styled.fieldset`
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-block-start: 0;
    font-size: 1rem;
    border-color: ${props => props.color ? colors[props.color] : colors.darkGrey};
    border-style: solid;
    border-width: 2px;
  &:hover, &:focus {
    border-color: ${({ hoverColor }) => hoverColor ? colors[hoverColor] : colors.primary};
    outline: none;
    legend {
      color: ${({ hoverColor }) => hoverColor ? colors[hoverColor] : colors.primary};
    }
  }
`;

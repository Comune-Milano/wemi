import styled from 'styled-components';
import { colors, fonts } from 'theme';

export const Legend = styled.legend`
  width: auto;
  max-width: none;
  margin-bottom: 0;
  font-size: ${fonts.size.f8};
  padding: 0 2px;
  text-transform: uppercase;
  font-weight: ${fonts.weight.bold};
  color: ${props => props.color ? colors[props.color] : colors.darkGrey};
  i {
    font-style: normal;
    color: ${colors.red};
  }
`;

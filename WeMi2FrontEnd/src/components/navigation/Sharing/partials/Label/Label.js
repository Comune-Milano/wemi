/** @format */

import styled from 'styled-components';
import Text from 'components/ui/Text';
import { colors } from 'theme';
const Label = styled(Text)`
  background-color: ${props => colors[props.bgcolor]};
  padding: 0.5em 1em;
`;

export default Label;

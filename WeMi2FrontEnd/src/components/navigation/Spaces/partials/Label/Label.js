/** @format */

import styled from 'styled-components';
import Text from 'components/ui/Text';

const Label = styled(Text)`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5em 2em;
  max-height: 40px;
  font-weight: bold;
`;

export default Label;
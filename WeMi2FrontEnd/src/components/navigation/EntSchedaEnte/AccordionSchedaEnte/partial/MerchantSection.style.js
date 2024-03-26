import styled from 'styled-components';

import { Row } from 'components/ui/Grid';
import { colors } from 'theme';
import { hexToRgba } from 'utils/functions/hexToRgba';

export const DataRow = styled(Row)`
  &:last-child {
    border-bottom: 2px solid ${colors.blue};
  }
  width: 100%;
  border-top: 2px solid ${colors.blue};
`;


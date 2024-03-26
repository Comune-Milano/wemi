/** @format */

import styled from 'styled-components';
import { Row } from 'components/ui/Grid';

const Wrapper = styled(Row)`
  background: ${({ theme }) => theme.colors.yellow};
`;

Wrapper.displayName = 'Wrapper';

export default Wrapper;

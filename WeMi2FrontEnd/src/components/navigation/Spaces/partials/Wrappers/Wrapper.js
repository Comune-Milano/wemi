/** @format */

import styled from 'styled-components';
import { Row } from 'components/ui/Grid';

const Wrapper = styled(Row)`
  padding: ${props => props.theme.spacing.p2} ${props => props.theme.spacing.p6};
`;

Wrapper.displayName = 'Wrapper';

export default Wrapper;

/** @format */

import styled,{ css} from 'styled-components';
import { Row } from 'components/ui/Grid';
import {colors} from 'theme';

const WrapperRow = styled(Row)`
  position: relative;
  padding: ${props => props.theme.spacing.p2} 0 0 0;
  ${props => props.paddingActive? css`padding: .34rem .5rem .3rem .5rem` : css`` }
  background-color: ${props => colors[props.bgcolor]}
`;
WrapperRow.displayName = 'WrapperRow';

export default WrapperRow;

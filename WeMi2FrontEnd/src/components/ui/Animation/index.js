/** @format */

import styled from 'styled-components';
import { move, rotate } from './keyframes';

export const UpAndDown = styled.div`
  animation: ${move} 0.5s linear 1.2s infinite alternate;
`;
UpAndDown.displayName = 'UpAndDownAnimation';

export const Rotate = styled.div`
  animation: ${rotate} infinite 20s linear;
`;
Rotate.displayName = 'RotateAnimation';

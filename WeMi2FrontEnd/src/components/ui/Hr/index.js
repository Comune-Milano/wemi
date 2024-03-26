/** @format */

import styled, { css } from 'styled-components';
import { colors } from 'theme';

const Hr = styled.hr`
  width: ${props => props.width};
  margin-top: ${props => props.top};
  margin-bottom: ${props => props.bottom};
  margin-right: ${props => props.right};
  margin-left: ${props => props.left};
  display: ${props => props.display};
  transition: width .3s ease-in-out;
  
  ${props =>
    props.type
      ? css`
          border: ${props => props.height} ${props => props.type} ${props => colors[props.color]};
          background-color: unset;
        `
      : css`
          height: ${props => props.height};
          border: none;
          background-color: ${props => colors[props.color]};
        `}
  ${props =>
    props.absolute &&
    css`
      position: absolute;
      top: ${props => props.top};
      bottom: ${props => props.bottom};
      right: ${props => props.right};
      left: ${props => props.left};
    `}
`;
export default Hr;

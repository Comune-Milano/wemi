/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'theme';
const StyledTooltip = styled.div`
padding: 1.25rem;
    position: relative;
    display: inline-block;
.tooltiptext {
    visibility: hidden;
    width: 300px;
    background-color: ${props => colors[props.bgcolor]};
    color: ${props => colors[props.color]};
    text-align: center;
    border-radius: 6px;
    position: absolute;
    padding: .5rem;
    z-index: 1;
  }
 
  &:hover { .tooltiptext {
    visibility: visible;
  }}
  .tooltiptext {
   
   
  }

  ${props =>
    props.right &&
    css`
      .tooltiptext {
        top: -12px;
        left: 110%;
      }
      .tooltiptext::after {
        content: '';
        position: absolute;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        transform: rotate(360deg);
        border-color: transparent ${props => colors[props.bgcolor]} transparent transparent;
      }
    `}


${props =>
  props.left &&
  css`
    .tooltiptext {
      top: 12px;
      left: -185%;
    }
    .tooltiptext::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 104.2%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      transform: rotate(180deg);
      border-color: transparent ${props => colors[props.bgcolor]} transparent transparent;
    }
  `} 
${props =>
  props.top &&
  css`
    .tooltiptext {
      width: 120px;
      top: -50%;
      left: 50%;
      margin-left: -60px;
    }
    .tooltiptext::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      transform: rotate(270deg);
      border-color: transparent ${props => colors[props.bgcolor]} transparent transparent;
    }
  `}
${props =>
  props.bottom &&
  css`
    .tooltiptext {
      width: 120px;
      top: 100%;
      left: 50%;
      margin-left: -60px;
    }
    .tooltiptext::after {
      content: '';
      position: absolute;
      top: -26%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      transform: rotate(90deg);
      border-color: transparent ${props => colors[props.bgcolor]} transparent transparent;
    }
  `}


} `;

StyledTooltip.displayName = 'StyledTooltip';

const Tooltip = ({ color, bgcolor, text, textTT, component: Component, restComp, ...rest }) => (
  <StyledTooltip {...rest} color={color} bgcolor={bgcolor}>
    <Component value={text} {...restComp} />
    <span className="tooltiptext">{textTT}</span>
  </StyledTooltip>
);
Tooltip.displayName = 'Tooltip';

export default Tooltip;

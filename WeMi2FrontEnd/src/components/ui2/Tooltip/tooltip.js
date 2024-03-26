/** @format */

import React from "react";
import styled, { css } from "styled-components";
import { colors, fonts } from "theme";
import { hexToRgba } from 'utils/functions/hexToRgba';

const StyledTooltip = styled.span`
  font-size: ${props => props.fontSize ? fonts.size[props.fontSize] : fonts.size.f8};
  font-weight: ${({ fontWeight }) => fonts.weight[fontWeight || 'normal']};
  padding: 0.1em;
  visibility: hidden;
  opacity: 0;
  width: ${props => props.emWidth ? props.emWidth : 18}em;
  background-color: ${props => hexToRgba((props.bgcolor ? colors[props.bgcolor] : colors['blue']), 0.9)};
  color: ${props => props.color ? colors[props.color] : colors['white']} !important;
  text-align: center;
  position: absolute;
  z-index: 5;
  transition: opacity 0.5s;
  padding: 1em;
  white-space: normal;
  margin: ${props => props.margin ? props.margin : "0"};
  ${props =>
    (props.visibility) &&
    css`
    visibility: visible;
    opacity: 1;
  `}

  &:before {
    content: "";
    position: absolute;
    transform: origin(initial);
    border-width: 10px;
    border-style: solid;
    border-color: transparent;
    border-right-color: ${props => hexToRgba((props.bgcolor ? colors[props.bgcolor] : colors['blue']), 0.95)};
  }

  ${props =>
    (props.position == 'right') &&
    css`
      left: 100%;
      top: 0;
      margin-left: 18px;
      &:before {
        right: 100%;
      }
    `}


${props =>
    (props.position == 'left') &&
    css`
    right: 100%;
    margin-right: 18px;
    top: 0;
    &:before {
      left: 100%;
      transform: rotate(180deg);
    }
  `} 

${props =>
    (props.position == 'top') &&
    css`
    margin-bottom: 18px;
    bottom: 100%;
    left: ${props => props.posAdjustment ? props.posAdjustment : '-33%'};
    &:before {
      left: 43%;
      top: 100%;
      transform: rotate(270deg);
    }
  `}

${props =>
    (props.position == 'bottom') &&
    css`
    top: ${props => props.top ? props.top : '100%'};
    left: ${props => props.posAdjustment ? props.posAdjustment : '-33%'};
    margin-top: 18px;
    &:before {
      left: 43%;
      bottom: 100%;
      transform: rotate(90deg);
    }
  `}

`;

StyledTooltip.displayName = "StyledTooltip";

const TooltipBox = ({
  id,
  color,
  bgcolor,
  value,
  position,
  visibility,
  top,
  fontSize,
  fontWeight,
  emWidth,
  posAdjustment,
  preventOnHover,
  margin,
}) => {
  return (
    <StyledTooltip
      role="tooltip"
      id={id}
      onClick={event => { event.preventDefault(); event.stopPropagation(); }}
      color={color}
      bgcolor={bgcolor}
      position={position}
      posAdjustment={posAdjustment}
      top={top}
      fontSize={fontSize}
      fontWeight={fontWeight}
      emWidth={emWidth}
      margin={margin}
      visibility={visibility}
      preventOnHover={preventOnHover}>
        {value}
    </StyledTooltip>
  )
}

TooltipBox.displayName = "TooltipBox";

export default TooltipBox;

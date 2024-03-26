/** @format */

import React from "react";
import styled, { css } from "styled-components";
import Text from "components/ui/Text";
import { colors } from "theme";

const StyledTooltip = styled.div`
@keyframes hoverVisibility {
  0% {visibility: hidden; transform: scale(0, 0); transition: transform .0005s ease-in-out}
  2% { transform: scale(1, 1);}
  100% {visibility: visible; transform: scale(1, 1); transition: transform .0005s ease-in-out}
}
    position: relative;
    padding: ${props => props.padding ? props.padding : '0'};
    width: max-content;
    height: auto;
    ${props => props.alignitems && css`
    display:  ${props => props.display ? props.display : 'flex'};
    align-items: ${props => props.alignitems}
    `}

span {
    visibility: hidden;
    width: ${props => (props.width ? props.width : "max-content")};
    background-color: ${props => colors[props.bgcolor]};
    color: ${props => colors[props.color]};
    text-align: center;
    border-radius: 5px;
    position: absolute;
    padding: ${({ theme }) => theme.spacing.p2};
    z-index: 15;
  }

  &:before {
    visibility: hidden;
  }

  &:hover { 
    span {
      animation-name: hoverVisibility;
      animation-delay: .5s;
      animation-duration: 3s;
  }
  &:before {
    animation-name: hoverVisibility;
    animation-delay: .5s;
    animation-duration: 3s;
  }
}

&:active, &:focus, &:focus-within {
  span {
    visibility: hidden;
  }
  &:before {
    visibility: hidden;
  }
}

  ${props =>
    props.right &&
    css`
      span {
        left: 100%;
        margin-left: ${({ theme }) => theme.spacing.p2};
        top: 0;
        &:before {
          content: "";
          position: absolute;
          left: -${({ theme }) => theme.spacing.p2};
          transform: origin(initial);
          border-width: 5px;
          border-style: solid;
          border-color: transparent ${props => colors[props.bgcolor]} transparent transparent;
        }
      }
    `}


${props =>
  props.left &&
  css`
    span {
      right: 100%;
      margin-right: ${({ theme }) => theme.spacing.p2};
      top: 0;
      &:before {
        content: "";
        position: absolute;
        right: -${({ theme }) => theme.spacing.p2};
        border-width: 5px;
        border-style: solid;
        transform: rotate(180deg);
        transform: origin(initial);
        border-color: transparent ${props => colors[props.bgcolor]} transparent transparent;
      }
    }
  `} 
${props =>
  props.top &&
  css`
    span {
      margin-bottom: ${({ theme }) => theme.spacing.p2};
      margin-left: ${props=> props.horizzontalShift};
      bottom: 100%;
      &:before {
        content: "";
        position: absolute;
        bottom: -${({ theme }) => theme.spacing.p2};
        border-width: 5px;
        border-style: solid;
        transform: rotate(270deg);
        transform: origin(initial);
        border-color: transparent ${props => colors[props.bgcolor]} transparent transparent;
      }
    }
  `}
${props =>
  props.bottom &&
  css`
    span {
      top: 100%;
      margin-top: ${({ theme }) => theme.spacing.p2};
      margin-left: ${props=> props.horizzontalShift};
      &:before {
        content: "";
        position: absolute;
        top: -${({ theme }) => theme.spacing.p2};
        border-width: 5px;
        border-style: solid;
        transform: rotate(90deg);
        transform: origin(initial);
        border-color: transparent ${props => colors[props.bgcolor]} transparent transparent;
      }
    }
  `}


} `;

StyledTooltip.displayName = "StyledTooltip";

const Tooltip = ({
  color,
  bgcolor,
  text,
  width,
  height,
  textTT,
  fontSize,
  component: Component,
  alignitems,
  restComp,
  children,
  horizzontalShift,
  ...rest
}) => (
  <StyledTooltip alignitems={alignitems} {...rest} color={color} width={width} height={height} bgcolor={bgcolor} horizzontalShift={horizzontalShift}>
    {children}
    <Text value={textTT} size={fontSize} />
  </StyledTooltip>
);

Tooltip.displayName = "Tooltip";

export default Tooltip;

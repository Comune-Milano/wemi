/** @format */

import React, { useState } from "react";
import styled, { css } from "styled-components";
import { colors, fonts } from "theme";

const StyledLabel = styled.label`
  &:hover {
    cursor: pointer;
    color: ${props => colors[props.checkcolor]};
  }
  ${props =>
    props.noLabel === true
      ? css`
          display: none;
        `
      : css`
          margin: 0;
          font-size: ${props => fonts.size[props.fontSize]};
          display: block;
          margin-left: calc(${props => fonts.size[props.fontSize]}*1.5);
          display: flex;
          align-items: baseline;
        `};
`;
const StyledSpan = styled.span``;

const StyledInputType = styled.div`
  margin: ${props => props.spacing};
  position: relative;
  display: ${props => props.display};
  align-items: center;
  ${props =>
    props.active
      ? css`
          color: ${props => colors[props.checkcolor]};
          &:hover {
            span {
              border: 1px solid ${props => colors[props.checkcolor]};
              opacity: 0.9;
            }
          }
          span {
            cursor: pointer;
            display: flex;
            align-items: center;
            border-radius: 50%;
            border: 1px solid ${props => colors[props.checkcolor]};
            width: ${props => fonts.size[props.fontSize]};
            height: ${props => fonts.size[props.fontSize]};
            position: absolute;

            &:after {
              content: "";
              height: calc(${props => fonts.size[props.fontSize]} * 0.70);
              width: calc(${props => fonts.size[props.fontSize]} * 0.70);
              top: calc(${props => fonts.size[props.fontSize]} * 0.068);
              left: calc(${props => fonts.size[props.fontSize]} * 0.075);
              background: ${props => colors[props.checkcolor]};
              position: absolute;
              border-radius: 100%;
              -webkit-transition: all 0.2s ease;
              transition: all 0.2s ease;
              opacity: 1;
              -webkit-transform: scale(1);
              transform: scale(1);
            }
          }
        `
      : css`
          color: ${colors.darkGrey};
          &:hover {
            span {
              border: 1.3px solid ${props => colors[props.checkcolor]};
            }
          }
          span {
            cursor: pointer;
            display: flex;
            align-items: center;
            border-radius: 50%;
            border: calc(0.05 * ${props => fonts.size[props.fontSize]}) solid
              ${props => colors[props.bordercolor]};
            width: ${props => fonts.size[props.fontSize]};
            height: ${props => fonts.size[props.fontSize]};
            position: absolute;
            background-color: ${colors.white};

            &:after {
              content: "";
              height: calc(${props => fonts.size[props.fontSize]} * 0.7);
              width: calc(${props => fonts.size[props.fontSize]} * 0.7);
              top: calc(${props => fonts.size[props.fontSize]} * 0.06);
              left: calc(${props => fonts.size[props.fontSize]} * 0.075);
              background: ${props => colors[props.checkcolor]};
              position: absolute;
              border-radius: 100%;
              -webkit-transition: all 0.2s ease;
              transition: all 0.2s ease;
              opacity: 0;
              -webkit-transform: scale(0);
              transform: scale(0);
            }
          }
        `}
`;

StyledInputType.displayName = "StyledInputType";

const Radio = ({
  value,
  active,
  required,
  getValue,
  selectedValue,
  label,
  display,
  noLabel,
  fontSize,
  bordercolor,
  checkcolor,
  spacing,
  ...rest
}) => {
  const [update, setUpdate] = useState(false);
  const isActive = value => {
    if (selectedValue) {
      if (selectedValue.id === value) return true;
    }
  };

  return (
    <StyledInputType
      spacing={spacing}
      display={display}
      fontSize={fontSize}
      bordercolor={bordercolor}
      checkcolor={checkcolor}
      onClick={() => {
        setUpdate(!update);
        getValue({ id: value, value: label });
      }}
      active={active ? active : isActive(value)}
      {...rest}
    >
      <StyledSpan role="button" />
      <StyledLabel noLabel={noLabel} fontSize={fontSize} role="button" checkcolor={checkcolor}>
        {label}
      </StyledLabel>
    </StyledInputType>
  );
};

Radio.displayName = "Radio";

export default Radio;

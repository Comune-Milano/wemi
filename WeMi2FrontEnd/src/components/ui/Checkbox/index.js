/** @format */

import React, { useState } from "react";
import styled, { css } from "styled-components";
import { colors, fonts } from "theme";

const StyledLabel = styled.label`
${props =>
  props.unboxed ? css`
 
  ` :`
  &:hover {
    cursor: pointer;
    color: ${props => colors[props.checkcolor]};
  }
  
  `}
  
  ${props =>
    props.noLabel === true
      ? css`
          display: none;
        `
      : css`
          margin: 0;
          font-size: ${props => fonts.size[props.fontSize]};
          display: block;
          margin-left: calc(${props => fonts.size[props.fontSize]}*2.5);
          display: flex;
          align-items: baseline;
        `};
`;
const StyledSpan = styled.span`
  &:first-letter {
    text-transform: capitalize;
  }
`;

const StyledInputType = styled.div`
  width: max-content;
  height: 100%;
  position: relative;
  display: ${props => (props.display ? props.display : "inline-flex")};
  align-items: ${props => props.alignTop ? 'top' : 'center'};
  ${props =>
    props.active
      ? css`
      color: ${props => colors[props.checkcolor]};
    
          ${props => props.unboxed ? css`
          span {
            transition: all 0.2s linear;
            cursor: pointer;
            background-color: ${colors.white};
            border: 1px solid ${colors.white};
            width: ${props => props.boxWidth};
            height: ${props => props.boxHeight};
            position: absolute;
            transition: all 0.2s linear, width 0s linear, height 0s linear;

            &::after {
              content: "";
              display: inline-block;
              height: calc(0.3 * ${props => props.boxHeight});
              width: calc(0.7 * ${props => props.boxWidth});
              position: absolute;
              top: calc(0.2 * ${props => props.boxWidth});
              left: calc(0.15 * ${props => props.boxWidth});
              border-left: calc(0.1 * ${props => props.boxHeight}) solid ${colors[props.checkcolor]};
              border-bottom: calc(0.1 * ${props => props.boxHeight}) solid ${colors[props.checkcolor]};
              transform: rotate(-45deg);
              transition: all 0.2s linear, width 0s linear, height 0s linear;
            }
          }
          `: css`
          transition: all 0.2s ease-in-out;
          &:hover {
            transition: all 0.2s linear;
            span {
              border: 1px solid ${props => colors[props.checkcolor]};
              opacity: 0.9;
              transition: all 0s linear;
            }
          }
         
          span {
            transition: all 0.2s linear;
            cursor: pointer;
            margin-top:  ${props => props.alignTop ? `calc(0.3 * ${props.boxHeight})` : 'unset'};   
            
            background-color: ${props => colors[props.checkcolor]};
            border: 1px solid ${props => colors[props.checkcolor]};
            width: ${props => props.boxWidth};
            height: ${props => props.boxHeight};
            position: absolute;
            transition: all 0 linear;

            &::after {
              content: "";
              display: inline-block;
              height: calc(0.3 * ${props => props.boxHeight});
              width: calc(0.7 * ${props => props.boxWidth});
              position: absolute;
              top: calc(0.2 * ${props => props.boxWidth});
              left: calc(0.15 * ${props => props.boxWidth});
              border-left: calc(0.05 * ${props => props.boxHeight}) solid ${colors.white};
              border-bottom: calc(0.05 * ${props => props.boxHeight}) solid ${colors.white};
              transform: rotate(-45deg);
              transition: all 0.2s linear;
            }
          }          
          `}
        `
      : css`

          ${props => props.unboxed ? css`
          span {
            cursor: pointer;
            padding
            border: none;
            width: .4em!important;
            height: .4em!important;
            border-radius: 50%;
            position: absolute;
            background-color: ${colors.darkGrey};
            transition: all 0.2s linear, width 0s linear, height 0s linear;
            &::after {
              content: none;
              transition: all 0.2s linear, width 0s linear, height 0s linear;
            }
          }
          `: css `
          color: ${colors.darkGrey};    
          span {
            cursor: pointer;
            margin-top:  ${props => props.alignTop ? `calc(0.3 * ${props.boxHeight})` : 'unset'};
            border: calc(0.05 * ${props => props.boxHeight}) solid
              ${props => colors[props.bordercolor]};
            width: ${props => props.boxWidth};
            height: ${props => props.boxHeight};
            position: absolute;
            background-color: ${colors.white};
            transition: all 0s linear;
            &::after {
              content: none;
              transition: all 0.2s linear;
            }
          }
          &:hover {
            transition: all 0.2s linear;
            span {
              border: 1.3px solid ${props => colors[props.checkcolor]};
              transition: all 0s linear;
            }
          }
          `}
        `}
`;

StyledInputType.displayName = "StyledInputType";

const Checkbox = ({
  value,
  getValue,
  selectedValue,
  label,
  boxWidth,
  boxHeight,
  noLabel,
  fontSize,
  bordercolor,
  checkcolor,
  unboxed,
  ...rest
}) => {
  const [update, setUpdate] = useState(false);
  const isActive = value => {
    if (selectedValue && Array.isArray(selectedValue)) {
      for (let i = 0; i < selectedValue.length; i += 1) {
        if (selectedValue[i].id === value) return true;
      }
    }
    else if(selectedValue) {
      if (selectedValue.id === value) return true
    }
  };

  return (
    <StyledInputType
      unboxed={unboxed}
      bordercolor={bordercolor}
      checkcolor={checkcolor}
      boxWidth={boxWidth}
      boxHeight={boxHeight}
      onClick={() => {
        setUpdate(!update);
        if(getValue)
        getValue({ id: value, value: label });
      }}
      active={isActive(value)}
      {...rest}
    >
      <StyledSpan
      unboxed={unboxed}
        role="button"
        style={{
          height: `${boxHeight}`,
          width: `${boxWidth}`
        }}
      />
      <StyledLabel
        paddingLeft={boxWidth}
        noLabel={noLabel}
        fontSize={fontSize}
        role="button"
        checkcolor={checkcolor}
      >
        {label}
      </StyledLabel>
    </StyledInputType>
  );
};

Checkbox.displayName = "Checkbox";
// Checkbox.propTypes = CheckboxPropTypes;
export default Checkbox;

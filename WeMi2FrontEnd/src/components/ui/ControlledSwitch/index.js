/** @format */

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';
import Text from 'components/ui/Text';
import {Row} from 'components/ui/Grid';


const StyledSwitch = styled.div`
    display: inline-block;
    cursor: pointer;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    fontSize: ${props => props.size ? fonts.size[props.size] : '16px' };
    width: auto;     
        &:before {
            content: '';
            position: absolute;
            top:  ${props => props.size ? `calc((100% - ${fonts.size[props.size]}) /2)`  : '5px' }; 
            left: 0;
            width: ${props => props.size ? `calc(${fonts.size[props.size]} * 2.5)`  : '36px' };
            height: ${props => props.size ? fonts.size[props.size] : '14px' };
            background: ${props => props.color} 0.3);
            border-radius: 14px;
            
        }
        &:after {
          content: '';
          position: absolute;
          top:  ${props => props.size ? `calc((100% - ${fonts.size[props.size]}* 1.3) /2)`  : '5px' }; 
          left: 0;
          width: ${props => props.size ? `calc(${fonts.size[props.size]} * 1.3)` : '20px' };
          height: ${props => props.size ? `calc(${fonts.size[props.size]} * 1.3)` : '20px' };
          background: ${props => props.color} 1);
          border-radius: 14px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),
          0 3px 1px -2px rgba(0, 0, 0, .2), 
          0 1px 5px 0 rgba(0, 0, 0, .12);
          transition: all 0.28s cubic-bezier(.4, 0, .2, 1);
          transition-property: left, background;
      }    

    ${props =>
      props.active &&
      css`
        &:before {
            background: ${props => props.coloractive} 0.3);
        }
        &:after {
            left: ${props => props.size ? `calc(${fonts.size[props.size]} * 1.3)`  : '16px' };
            background: ${props => props.coloractive} 1);
        }
    `}
`;

StyledSwitch.displayName = 'StyledSwitch';
const convertHex = hex => {
  let convert = colors[hex];
  convert = convert.replace('#', '');
  const r = parseInt(convert.substring(0, 2), 16);
  const g = parseInt(convert.substring(2, 4), 16);
  const b = parseInt(convert.substring(4, 6), 16);
  const result = `rgba( ${r} ,  ${g}  ,  ${b}  ,`;
  return result;
};

const Switch = ({
  value,
  color,
  disable,
  coloractive,
  getSwitchValue,
  label,
  labelActive,
  size,
  padding,
  margin
}) => {
  const colorRgba = convertHex(color);
  const colorRgbactive = convertHex(coloractive);
  return (
    <Row justifycontent="flex-start" alignitems="top" padding={padding} margin={margin}>
    <StyledSwitch
      id="switch"
      active={value}
      size={size}
      onClick={() => {
        if(!disable){
        getSwitchValue.bind(this);
        getSwitchValue(!value);}
      }}
      color={colorRgba}
      coloractive={colorRgbactive}
    >
    </StyledSwitch>
      <Text htmlFor="switch" value={value && labelActive ? labelActive : label } size={size} padding={`0 0 0 calc(${fonts.size[size]} * 3)`} />
</Row>
  );
};

Switch.displayName = 'Switch';

export default Switch;

/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';
import { hexToRgba } from 'utils/functions/hexToRgba';

const StyledInputType = styled.div`
  ${props => props.disabled ? css`
    pointer-events: none;
  ` : ''}
  margin: ${props => props.spacing ? props.spacing : '0px'};
  position: relative;
  display: inline-flex;
  align-items: center;

  label {
    margin: 0;
    font-size: ${props => props.fontSize ? fonts.size[props.fontSize] : fonts.size.f7};
    display: block;
    margin-left: 1.5em;
    color: ${colors.black};
  }

  ${props =>
    props.active
      ? css`
      label {
        font-weight: 700;
      }
       `
      : null};
`;

const StyledSwitch = styled.div`
    display: inline-block;
    cursor: pointer;
    position: static;
    justify-content: flex-start;
    align-items: center;
    outline: none;
    font-size: ${props => props.fontSize ? fonts.size[props.fontSize] : fonts.size.f7};
    width: 3em;
        &:before {
            content: '';
            position: absolute;
            top:  0.2em; 
            left: 0;
            width: 3em;
            height: 1em;
            background: ${colors.greyInput};
            border-radius: 0.9em;  
        }
        &:after {
          content: '';
          position: absolute;
          top:  0; 
          left: 0;
          width: 1.5em;
          height: 1.5em;
          background: ${colors.white};
          border-radius: 1em;
          padding: 1px;
          border: 2px solid ${props => colors[props.checkcolor]};
          transition: all 0.28s cubic-bezier(.4, 0, .2, 1);
          transition-property: left, background;
      }    

    ${props =>
    props.active &&
    css`
        &:before {
            background: ${props => hexToRgba(colors[props.checkcolor], 0.15)};
        }
        &:after {
            left: 1.8em;
            background: ${props => colors[props.checkcolor]};
            padding: 0;
            border: none;
        }
    `}
`;

const Switch = ({
  id,
  intl,
  value,
  onChange,
  label,
  intlLabel,
  labelledby,
  fontSize,
  checkcolor,
  spacing,
  disabled,
  ...rest
}) => {
  const switchLabel = intlLabel ?
    intl.formatMessage({ id: intlLabel.id }, intlLabel.params) :
    label;

  return (
    <StyledInputType
      spacing={spacing}
      fontSize={fontSize}
      checkcolor={checkcolor || "primary"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!disabled) {
          onChange(!value);
        }
      }}
      onKeyUp={e => { if (e.keyCode == 13 && !disabled) { e.target.click(); } }}
      active={value || false}
      disabled={disabled}
      {...rest}
      tabIndex={!disabled ? '0' : undefined}
    >
      <StyledSwitch
        role="switch"
        tabIndex={!disabled ? '0' : undefined}
        aria-checked={value || false}
        aria-labelledby={labelledby}
        aria-label={switchLabel}
        active={value || false}
        fontSize={fontSize}
        checkcolor={checkcolor || "primary"}
      />
      {
        switchLabel ?
          (
            <label>
              {switchLabel}
            </label>
          ) :
          null
      }
    </StyledInputType>
  );
};

Switch.displayName = 'Switch';

export default Switch;

/** @format */

import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import styled, { css } from 'styled-components';
import InputPropTypes from './propTypes';

const StyledInput = styled.div`
  position: relative;
  max-height: ${props => props.maxHeight};
  * {
    max-height: inherit;
  }

  input {
    width: 100%;
    height: 3rem;
    border-radius: 5px;
    font-weight: light !important;
    color: #333;
    background: ${({ theme }) => theme.colors.white};
    padding: 0.65rem 1.25rem;
    font-size: 1.1rem;
    outline: none;
    transition: all 0.1s linear;
 
    
  }

  label {
    color: ${({ theme }) => theme.colors.darkGrey};
    z-index: 1;
    transform: translate(0px, 2px) scale(1);
    pointer-events: none;
    position: absolute;
    transform-origin: top left;
    color: rgba(0, 0, 0, 0.54);
    font-size: 1rem;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    line-height: 1;
    font-weight: light;
    padding: 0 1rem;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  legend {
    display: block;
    width: 0.01px;
    visibility: hidden;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    padding: 0;
    text-align: left;
    transition: width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    line-height: 11px;
    span {
      font-size: 1rem;
      padding-left: 1rem;
    }
  }

  fieldset {
    padding-left: 26px !important;
    top: -5px !important;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    position: absolute;
    transition: padding-left 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      border-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      border-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    border: none !important;
    border-radius: 4px;
    pointer-events: none;
    transition: all 0.3s linear;
  }

  ${props =>
        props.disabled &&
        css`
      legend {
        display: none;
      }
      label {
        display: none;
      }
      input {
        border: 1px solid ${({ theme }) => theme.colors.darkGrey};
        outline: none;
      }
    `}

  ${props =>
        props.material &&
        css`
      label {
        visibility: hidden;
        transition: all 0.08s linear;
      }

      input {
        border: 1px solid ${({ theme }) => theme.colors.primary};
   
      }

      ${props =>
                props.focus === true &&
                css`
          fieldset {
            padding-left: 14px !important;
            border: 2px solid ${({ theme }) => theme.colors.primary}!important;
            transition: all 0.1s linear;
          }

          input {
            border: none;
            outline: none;
            box-shadow: 0;
      
            transition: all 0.3s linear;
            ::placeholder {
              visibility: hidden;
            }
       
              
          }

          legend {
            width: auto !important;
            color: white;
            transition: all 0.2s linear;
          }

          label {
            transform: translate(0px, -20px) scale(1);
            color: ${({ theme }) => theme.colors.primary};
            visibility: visible;
            transition: all 0.2s ease-in;
          }
        `};
    `};

  ${props =>
        props.noLabel &&
        css`
      label {
        display: none;
      }

      input {
        border: 1px solid ${({ theme }) => theme.colors.primary};
        height: 3rem;
      }
    `}

  ${props =>
        props.noLabel &&
        props.focus === true &&
        css`
      label {
        visibility: hidden;
      }
    `};
`;

const Input = ({ intl, required, intlLabel, disabled, value, maxHeight, ...rest }) => {
  const [focus, setLabel] = useState(false);
  const label = intl.formatMessage({ id: intlLabel });
  return (
    <StyledInput focus={focus} maxHeight={maxHeight} disabled={disabled} {...rest}>
      <label htmlFor="#">{label}</label>
      <div>
        <fieldset>
          <legend>
            <span>{label}</span>
          </legend>
        </fieldset>
        <input
          value={value}
          disabled={disabled}
          type="text"
          required={required}
          onFocus={() => setLabel(!focus)}
          onBlur={() => setLabel(!focus)}
        />
      </div>
    </StyledInput>
  );
};

Input.displayName = 'Input2';
Input.propTypes = InputPropTypes;

export default injectIntl(Input);

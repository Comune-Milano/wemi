/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { colors, fonts } from 'theme';
import { injectIntl } from 'react-intl';

const StyledInputType = styled.div`
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: ${props => props.width ? props.width : '100%'};

  margin: ${props => props.spacing ? props.spacing : '0 0 1em 0'};
  ${media.md`
    margin: ${props => props.spacing ? props.spacing : '0 0 .5em 0'};
  `}

  span {
    margin-top: 0.2rem;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    background-color: transparent;
    font-size: ${props => props.fontSize ? fonts.size[props.fontSize] : fonts.size.f7};
    width: 1.1em;
    height: 1.1em;
    display: block;
    border: 2px solid ${props => props.disabled ? colors.greyFooter : colors[props.checkcolor]};
    outline: none;
    flex-shrink: 0;
  } 

  label {
    margin: 0;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    font-size: ${props => props.fontSize ? fonts.size[props.fontSize] : fonts.size.f7};
    display: inline-flex !important;
    padding-left: 0.5em;
    color: ${props => props.disabled ? colors.greyFooter : colors.black};
    ${props => props.noWrap ? 'white-space: nowrap;' : null};
    text-overflow: ellipsis;
    overflow: hidden;
    flex-grow: 2;
  }
  
  ${props =>
    props.active
      ? css`
      color: ${props => props.disabled ? colors.greyFooter : colors[props.checkcolor]};

      span {
          &::after {
            content: "";
            display: inline-block;
            position: relative;
            height: 0.5em;
            width: 0.7em;
            bottom: 0.5em;
            left: 0.05em;
            border-left: 3px solid ${props => props.disabled ? colors.greyFooter : colors[props.checkcolor]};
            border-bottom: 3px solid ${props => props.disabled ? colors.greyFooter : colors[props.checkcolor]};
            transform: rotate(-45deg);
          }
      } 

      label {
        font-weight: 700;
      }
       `
      : css`
          color: ${colors.greyFooter};    
          span {
            &::after {
              content: none;
            }
          }
          &:hover {
            span {
              border: 2.2px solid ${props => props.disabled ? colors.greyFooter : colors[props.checkcolor]};
            }
          }
  `}
`;

StyledInputType.displayName = 'StyledInputType';

const Checkbox = ({
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
  noWrap,
  width,
  ...rest
}) => {
  const checkboxLabel = intlLabel ?
    intl.formatMessage({ id: intlLabel.id }, intlLabel.params) :
    label;

  return (
    <StyledInputType
      spacing={spacing}
      fontSize={fontSize}
      checkcolor={checkcolor}
      width={width}
      onClick={() => {
        if (!disabled) {
          onChange(!value);
        }
      }}
      onKeyUp={e => {
        if (!disabled) {
          if (e.keyCode == 13) {
            e.target.click();
          }
        }
      }}
      active={value || false}
      disabled={disabled}
      noWrap={noWrap}
      {...rest}
    >
      <span
        role="checkbox"
        tabIndex="0"
        aria-checked={value || false}
        aria-labelledby={labelledby}
        aria-label={label}
      />
      {
        checkboxLabel ?
          (
            <label>
              {checkboxLabel}
            </label>
          ) :
          null
      }
    </StyledInputType>
  );
};

Checkbox.displayName = 'Checkbox';

export default injectIntl(Checkbox);

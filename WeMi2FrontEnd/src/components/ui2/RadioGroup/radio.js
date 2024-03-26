/** @format */

import React from "react";
import styled, { css } from "styled-components";
import media from 'utils/media-queries';
import { colors, fonts } from "theme";
import { injectIntl } from 'react-intl';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';

const StyledInputType = styled.div`
  display: inline-flex;
  align-items: flex-start;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  width: ${props => props.width ? props.width : '100%;'};

  margin: ${props => props.spacing ? props.spacing : '0 0 1em 0'};
  ${media.md`
    margin: ${props => props.spacing ? props.spacing : '0 0 .5em 0'};
  `}

  span {
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    border-radius: 50%;
    margin-top: 0.2rem;
    background-color: transparent;
    border: 2px solid ${props => props.disabled ? colors.grey : colors[props.checkcolor]};
    font-size: ${props => props.fontSize ? fonts.size[props.fontSize] : fonts.size.f7};
    width: 1.1em;
    height: 1.1em;
    display: block;
    outline: none;
    flex-shrink: 0;
  }

  label {
    margin: 0;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    font-size: ${props => props.fontSize ? fonts.size[props.fontSize] : fonts.size.f7};
    display: inline-flex !important;
    padding-left: 0.5em;
    color: ${colors.black};
    ${props => props.noWrap ? 'white-space: nowrap;' : null};
    text-overflow: ellipsis;
    overflow: hidden;
    flex-grow: 2;
  }

  ${props =>
    props.active
      ? css`
        color: ${props => props.disabled ? colors.grey : colors[props.checkcolor]};
        span {
          background-color: ${props => props.disabled ? colors.grey : colors[props.checkcolor]};
        }
        label {
          font-weight: 700;
        }
      `
      : css`
          color: ${colors.darkGrey};
          span {
            background-color: transparent;
          }
          &:hover {
            span {
              border: 2.2px solid ${props => props.disabled ? colors.grey : colors[props.checkcolor]};
            }
          }
    `}
`;

StyledInputType.displayName = "StyledInputType";

const Radio = ({
  intl,
  selected,
  onClick,
  width,
  label,
  intlLabel,
  fontSize,
  justifyContent,
  checkcolor,
  spacing,
  disabled,
  noWrap,
  ...rest
}) => {

  const radioLabel = intlLabel ?
    intl.formatMessage({ id: intlLabel.id }, intlLabel.params) :
    label;
  return (
    <StyledInputType
      spacing={spacing}
      width={width}
      justifyContent={justifyContent}
      fontSize={fontSize}
      checkcolor={checkcolor}
      onClick={disabled? ()=>{} : onClick}
      onKeyUp={e => { if (e.keyCode === keyCodes.ENTER) { e.target.click() } }}
      active={selected}
      disabled={disabled}
      noWrap={noWrap}
      {...rest}
    >
      <span
        role="radio"
        tabIndex="0"
        aria-checked={selected}
        aria-label={radioLabel}
      />
      {
        radioLabel ?
          (
            <label>
              {radioLabel}
            </label>
          ) :
          null
      }
    </StyledInputType>
  );
};

Radio.displayName = 'Radio';

export default injectIntl(Radio);

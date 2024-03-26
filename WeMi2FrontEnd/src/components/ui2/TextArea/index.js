/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import { injectIntl } from 'react-intl';
import TooltipBox from 'components/ui2/Tooltip/tooltip';
import { colors, fonts } from 'theme';
import { hexToRgba } from 'utils/functions/hexToRgba';
import { isRequiredErrorType } from 'libs/Form/validation/requiredErrorChecker';
import media from 'utils/media-queries';

const StyledLabel = styled.label`
  width:100%;
  position: relative;
  display: inline-block;
  padding-top: 6px;
  overflow: visible;
  font-size: ${props => fonts.size[props.xsSize || props.size]};

  ${media.md`
    font-size: ${props => fonts.size[props.mdSize || props.size]};
  `}
 
  cursor: ${props => props.disabled || props.readOnly ? 'default' : 'text'};
`;

const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  margin: 0;
  border-width: 2px;
  border-style: solid;
  ::-webkit-input-placeholder {
    font-style: italic;
 }
 :-moz-placeholder {
    font-style: italic;  
 }
 ::-moz-placeholder {
    font-style: italic;  
 }
 :-ms-input-placeholder {  
    font-style: italic; 
 }
  border-color: ${props => props.color ? colors[props.color] : colors.darkGrey};
  color: ${colors.black};
  padding: 10px 13px 10px;
  width: 100%;
  height: ${props => props.height ? props.height : 'inherit'};
  background-color: ${props => 
    props.bgColor ? 
      hexToRgba(colors[props.bgColor], props.bgAlpha)
      : 'transparent'};
  border-radius: 0px;
  box-shadow: none;
  -webkit-appearance: none;
  font-size: inherit;
  transition: border 0.2s, box-shadow 0.2s;
  outline: none;

  + span {
    color: ${props => props.color ? colors[props.color] : colors.darkGrey};
  }

  ${props => props.error ? css`
  border-color: ${colors.red};
  + span {
    color: ${colors.red};
  }` : null}

  ${props => !(props.disabled || props.readOnly || props.error) ? css`
  &:hover, &:focus {
    border-color: ${props => props.hoverColor ? colors[props.hoverColor] : colors.primary};
    outline: none;
    + span {
      color: ${props => props.hoverColor ? colors[props.hoverColor] : colors.primary};
    }
  }` : null}
`;

const TextSpan = styled.span`
  position: absolute;
  text-transform: uppercase;
  top: 0;
  left: 10px;
  font-size: ${fonts.size.f8};
  line-height: 15px;
  background-color: ${colors.white};
  padding: 0px 4px;
  font-weight: 600;
  transition: color 0.2s;

  i {
    color: ${colors.red};
    text-style: normal;
    font-size: 100%;
  }
`;

const TextArea = ({
  readOnly,
  colorReadOnly= "darkGrey",
  disabled,
  label,
  intlLabel,
  intlPlaceholder,
  id,
  onBlur,
  onChange,
  required,
  error,
  width,
  placeholder,
  inputValue,
  color,
  name,
  rows,
  intl,
  height,
  bgColor,
  bgAlpha=1,
  hoverColor,
  ariaLabel,
  size="f7",
  xsSize,
  mdSize,
  maxLength,
}) => {
  const inputLabel = intlLabel ?
    intl.formatMessage({ id: intlLabel.id }, intlLabel.params) :
    label;
  const inputPlaceholder = intlPlaceholder ?
    intl.formatMessage({ id: intlPlaceholder.id }, intlPlaceholder.params) :
    placeholder;


    const optionalCallbacks = {
      ...(onBlur && { onBlur })
    };

  return (
    <StyledLabel htmlFor={id} disabled={disabled} readOnly={readOnly} size={size} xsSize={xsSize} mdSize={mdSize}>
      <StyledTextArea
        id={id}
        name={name}
        value={inputValue ? inputValue : ""}
        color={disabled || readOnly ? colorReadOnly : color}
        bgColor={bgColor}
        bgAlpha={bgAlpha}
        width={width || '100%'}
        height={height}
        onChange={(event) => (onChange(event.target.value))}
        required={required}
        disabled={disabled}
        error={error}
        placeholder={inputPlaceholder}
        readOnly={readOnly}
        rows={rows}
        hoverColor={hoverColor}
        maxLength={maxLength}
        {...optionalCallbacks}
        aria-label={ariaLabel}
      ></StyledTextArea>
      {
        inputLabel ?
          <TextSpan>
            {inputLabel}{required && <i> *</i>}
          </TextSpan>
          : null
      }
       {
        error && !isRequiredErrorType(error)?
          <TooltipBox
            position="bottom"
            visibility="trues"
            value={error}
            posAdjustment="0px"
          />
        : null
      }
    </StyledLabel>
  );
};


TextArea.displayName = 'TextArea';


export default injectIntl(TextArea);

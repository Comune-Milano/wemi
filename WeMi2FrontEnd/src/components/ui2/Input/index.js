
import React from 'react';
import styled, { css } from 'styled-components';
import { injectIntl } from 'react-intl';
import { colors, fonts } from 'theme';
import TooltipBox from 'components/ui2/Tooltip/tooltip';
import { isRequiredErrorType } from 'libs/Form/validation/requiredErrorChecker';

const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  padding-top: ${props => props.inputLabel ? '6px' : '0'};
  overflow: hidden;
  font-size: ${fonts.size.f7};
  cursor: ${props => props.disabled || props.readOnly ? 'default' : 'text'};
  overflow: visible;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  margin: 0;
  border-width: ${props => props.borderWidth ? props.borderWidth : '2px'};
  border-style: solid;
  border-color: ${props => props.color ? colors[props.color] : colors.darkGrey};
  padding: ${({ padding }) => padding || '10px 13px 10px'};
  ${props => props.bold ? 'font-weight: 700' : null};
  width: 100%;
  height: inherit;
  border-radius: 0px;
  box-shadow: none;
  -webkit-appearance: none;
  font-size: inherit;
  transition: border 0.2s, box-shadow 0.2s;
  outline: none;
  color: ${colors.black};
  background-color: ${props => props.bgColor ? colors[props.bgColor] : 'transparent'};

  + span {
    color: ${props => props.color ? colors[props.color] : colors.darkGrey};
  }

  ${props => props.error ? css`
  border-color: ${colors.red};
  + span {
    color: ${colors.red};
  }` : null}

  ${props => props.uppercase ? css`
  text-transform: uppercase;
  ` : null}
  
  ${props => !(props.disabled || props.readOnly || props.error) ? css`
  &:hover, &:focus {
    border-color: ${({ hoverColor }) => hoverColor ? colors[hoverColor] : colors.primary};
    outline: none;
    + span {
      color: ${({ hoverColor }) => hoverColor ? colors[hoverColor] : colors.primary};
    }
  }` : null}


  ${props => (props.disabled || props.readOnly) ? css`
    border-color: ${colors[props.colorReadOnly]};
    + span {
    color: ${colors[props.colorReadOnly]};
  }
  ` : null}

  ${props => props.type === 'number' ? css`
    -moz-appearance: textfield;
  ` : null}

`;

const TextSpan = styled.span`
  position: absolute;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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

const Input = ({
  intl,
  intlLabel,
  label,
  readOnly,
  height,
  onChange,
  color,
  hoverColor,
  bgColor,
  padding,
  bold,
  inputValue,
  disabled,
  error,
  id,
  intlPlaceholder,
  placeholder,
  pattern,
  required,
  width,
  maxLength,
  borderWidth,
  minLength,
  pointer,
  min,
  name,
  max,
  type,
  onBlur,
  onClick,
  onFocus,
  onKeyDown,
  onKeyUp,
  innerRef,
  uppercase,
  positionTooltip = 'bottom',
  colorTooltip = 'white',
  colorReadOnly = 'darkGrey',
  ariaLabel,
  ...rest
}) => {
  const inputLabel = intlLabel ?
    intl.formatMessage({ id: intlLabel.id }, intlLabel.params) :
    label;
  const inputPlaceholder = intlPlaceholder ?
    intl.formatMessage({ id: intlPlaceholder.id }, intlPlaceholder.params) :
    placeholder;

  const optionalCallbacks = {
    ...(onBlur && { onBlur }),
    ...(onClick && { onClick }),
    ...(onFocus && { onFocus }),
    ...(onKeyDown && { onKeyDown }),
    ...(onKeyUp && { onKeyUp }),
  };

  return (
    <StyledLabel
      htmlFor={id}
      disabled={disabled}
      readOnly={readOnly}
      inputLabel={inputLabel}
    >
      <StyledInput
        {...rest}
        id={id}
        name={name}
        aria-label={ariaLabel || inputLabel}
        value={inputValue || ''}
        color={color}
        bgColor={bgColor}
        pointer={pointer}
        pattern={pattern}
        width={width || '100%'}
        height={height}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        uppercase={uppercase}
        disabled={disabled}
        error={error}
        placeholder={inputPlaceholder}
        max={max}
        bold={bold}
        borderWidth={borderWidth}
        min={min}
        maxLength={maxLength}
        padding={padding}
        minLength={minLength}
        readOnly={readOnly}
        colorReadOnly={colorReadOnly}
        type={type}
        ref={innerRef}
        hoverColor={hoverColor}
        {...optionalCallbacks}
      >
      </StyledInput>
      {
        inputLabel ? (
          <TextSpan>
            {inputLabel}
            {required && <i> *</i>}
          </TextSpan>
        )
          : null
      }
      {
        error && !isRequiredErrorType(error) ? (
          <TooltipBox
            position={positionTooltip}
            visibility="true"
            value={error}
            posAdjustment="0px"
            color={colorTooltip}
          />
        )
          : null
      }
    </StyledLabel>
  );
};
Input.displayName = 'Input';

export default injectIntl(Input);

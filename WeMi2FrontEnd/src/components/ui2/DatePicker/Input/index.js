
import React, { Component, createRef } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';

const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  padding-top: 6px;
  overflow: hidden;
  font-size: ${fonts.size.f7};
  cursor: ${props => props.disabled ? 'default' : 'text'};
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  margin: 0;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.disabled ? colors.grey : props.color ? colors[props.color] : colors.darkGrey};
  color: ${colors.black};
  padding: 10px 13px 10px;
  width: 100%;
  height: inherit;
  background-color: transparent;
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

/**
 * The date picker input.
 */
class DatePickerInput extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Focuses the input element.
   */
  focus = () => {
    this.props.innerRef.current.focus();
  };

  /**
   * @inheritdoc
   */
  render() {
    const {
      label,
      intlLabel,
      placeholder,
      intlPlaceholder,
      name,
      id,
      required,
      disabled,
      error,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyDown,
      onKeyUp,
      value,
      color,
      hoverColor
    } = this.props;
    // Translated label and placeholder.
    const inputLabel = intlLabel ?
      this.intl.formatMessage({ id: intlLabel.id }, intlLabel.params) :
      label;
    const inputPlaceholder = intlPlaceholder ?
      this.intl.formatMessage({ id: intlPlaceholder.id }, intlPlaceholder.params) :
      placeholder;

    return (
      <StyledLabel htmlFor={id}>
        <StyledInput
          type="text"
          id={id}
          name={name}
          ref={this.props.innerRef}
          required={required}
          placeholder={inputPlaceholder}
          disabled={disabled}
          error={error}
          onBlur={onBlur}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          value={value}
          color={color}
          hoverColor={hoverColor}
        />
        {
          inputLabel ?
            (
              <TextSpan>
                {inputLabel}
                {required && <i> *</i>}
              </TextSpan>
            )
            : null
        }
      </StyledLabel>
    );
  }
}

DatePickerInput.displayName = 'DatePickerInput';

export default React.forwardRef((props, ref) => <DatePickerInput
  innerRef={ref} {...props}
/>);
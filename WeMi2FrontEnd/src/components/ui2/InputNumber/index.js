import React from 'react';
import styled, { css } from 'styled-components';
import FaIcon from 'components/ui2/FaIcon';
import Text from 'components/ui/Text';
import { colors, fonts } from 'theme';
import { conditionalExpression } from '@babel/types';
import { noop } from 'utils/functions/noop';
import propTypes from './propTypes';
import TooltipBox from '../Tooltip/tooltip';

const InputContainer = styled.div`
  height: fit-content;
  width: fit-content;
  &:focus {
    outline: none;
  }
  margin: ${({ margin }) => (margin || '0')};
`;

const StyledInput = styled.input`
  -moz-appearance: textfield !important;
  -webkit-appearance: none;
  background-color: transparent;
  border-radius: 0px;
  border: none;
  box-shadow: none;
  margin: 0;
  padding: 0;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  color: ${props => props.textColor ? props.textColor : colors.black};
  font-weight: 600;
  font-size: ${props => fonts.size[props.size]};
  display: inline-block;
  width: 2.5em;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const IconContainer = styled.span`
  margin: 0 0.5em;
  cursor: pointer;
`;

const DEFAULT_SIZE = 'f7';

const InputNumber = ({
  value,
  onChange,
  step = 1,
  minValue,
  maxValue,
  size,
  iconColor = 'primary',
  textColor = 'black',
  margin,
  disabled,
  onInputChange,
  onInputBlur = noop,
  ariaLabel = 'Valore selezionato',
}) => {
  const disableMinus = disabled || typeof minValue === 'number' && value <= minValue;
  const disablePlus = disabled || typeof maxValue === 'number' && value >= maxValue;

  const label = `${ariaLabel}: ${value}`;

  const getParsedValue = val => {
    const dottedValue = String(val).replace(',', '.');
    const numberValue = new Number(dottedValue);
    return numberValue.valueOf();
  };

  const addStep = () => {
    if (!disablePlus) {
      onChange((getParsedValue(value) + step).toString());
    }
  };

  const subtractStep = () => {
    if (!disableMinus) {
      onChange((getParsedValue(value) - step).toString());
    }
  };

  const changeStep = (newValue) => {
    const parsed = getParsedValue(newValue);
    if (!Number.isNaN(parsed) && (parsed % step === 0)) {
      if (parsed < minValue) {
        onInputChange(minValue);
      } else if (parsed > maxValue) {
        onInputChange(maxValue);
      } else {
        onInputChange(newValue);
      }
    }
  };

  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        event.preventDefault();
        addStep();

        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        event.preventDefault();
        subtractStep();

        break;
      default:
        break;
    }
  };

  return (
    <InputContainer
      tabIndex={0}
      role="slider"
      aria-label={label}
      aria-valuemax={maxValue}
      aria-valuemin={minValue}
      aria-valuenow={value}
      onKeyDown={handleKeyPress}
      margin={margin}
    >
      <IconContainer
        tabindex="-1"
        role="button"
        onClick={subtractStep}
      >
        <FaIcon
          icon="minus"
          fontSize={size || DEFAULT_SIZE}
          color={disableMinus ? 'grey' : iconColor}
        />
      </IconContainer>
      <StyledInput
        tabIndex={-1}
        type="text"
        min={minValue}
        max={maxValue}
        size={size || DEFAULT_SIZE}
        value={value.toString()}
        textColor={textColor}
        onChange={(event) => changeStep(event.target.value)}
        onBlur={onInputBlur}
      />
      <IconContainer
        tabindex="-1"
        role="button"
        onClick={addStep}
      >
        <FaIcon
          icon="plus"
          fontSize={size || DEFAULT_SIZE}
          color={disablePlus ? 'grey' : iconColor}
        />
      </IconContainer>
    </InputContainer>
  );
};

InputNumber.displayName = 'Input number';

InputNumber.prototypes = propTypes;

export default InputNumber;

import React from 'react';
import styled from 'styled-components';
import FaIcon from 'components/ui2/FaIcon';
import Text from 'components/ui/Text';
import propTypes from './propTypes';
import { colors, fonts } from 'theme';

const InputContainer = styled.div`
  height: fit-content;
  width: fit-content;
  &:focus {
    outline: none;
  }
  margin: ${({ margin }) => (margin ? margin : '0')}
`;

const StyledDiv = styled.div`
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
  min-width: 2.5em;
`;

const IconContainer = styled.span`
  margin: 0 0.5em;
  cursor: pointer;
`;

const DEFAULT_SIZE = 'f7';

const OptionNumber = ({
  value,
  onChange,
  step = 1,
  minValue,
  maxValue,
  size,
  afterLabel,
  iconColor = 'primary',
  textColor = 'black',
  margin,
  ariaLabel = "Valore selezionato",
  ariaAfterLabel = afterLabel,
}) => {
  const disableMinus = typeof minValue === 'number' && value <= minValue;
  const disablePlus = value === afterLabel || isNaN(parseInt(value)) || typeof maxValue === 'number' && value > maxValue;
  const ariaPresentValue= value > maxValue ? ariaAfterLabel : value;
  const label = `${ariaLabel}: ${ariaPresentValue}`;

  const addStep = () => {
    if (!disablePlus) {
      onChange(parseInt(value) + step);
    }
  };
  const subtractStep = () => {
    if (!disableMinus) {
      if (value === afterLabel || isNaN(parseInt(value))) {
        onChange(maxValue);
      } else {
        onChange(parseInt(value) - step);
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
  }

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

      <StyledDiv size={size || DEFAULT_SIZE} textColor={textColor} >
        {value > maxValue ? afterLabel : value}
      </StyledDiv>

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

OptionNumber.displayName = 'OptionNumber';

OptionNumber.prototypes = propTypes;

export default OptionNumber;

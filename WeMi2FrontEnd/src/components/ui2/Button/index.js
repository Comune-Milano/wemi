/** @format */
import React from 'react';
import styled, { css } from 'styled-components';
import FaIcon from 'components/ui2/FaIcon';
import { fonts, colors } from 'theme';
import { injectIntl } from 'react-intl';
import { noop } from 'utils/functions/noop';

const StyledButton = styled.button`
  background-color: transparent;
  color: ${props => props.color ? colors[props.color] : colors.primary};
  height: ${props => props.height};
  font-size:  ${props => fonts.size[props.fontSize]};
  padding: ${props => props.padding ? props.padding : '0.4em 1em'};
  border-radius: 0;
  outline: none !important;
  box-sizing: border-box;
  cursor: pointer;
  margin: ${props => props.mauto ? 'auto' : props.margin ? props.margin : '0'};
  width: ${props => props.autowidth ? 'auto' : props.width ? props.width : '100%'};
  display: ${props => props.display ? 'block' : 'initial'};
  align-items: center;
  text-transform: ${props => props.transform ? props.transform : 'uppercase'};
  letter-spacing: ${props => props.letterSpacing ? props.letterSpacing : '0.05em'};
  font-weight: ${props => props.weight ? props.weight : '600'};
  border: ${props => props.borderSize || "2px"} solid ${props => props.color ? colors[props.color] : colors.primary};
  transition: background-color .2s linear;
  outline: none;
  text-overflow: ellipsis;
  overflow: hidden;

  ${props => props.flexIcons &&
    css`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    
    div {
      text-align: center;
      flex-grow: 2;
    }
    `
  }

  &:hover, &:active, &:focus {
    border-color: ${props => props.hoverColor ? colors[props.hoverColor] : props.color ? colors[props.color] : colors.primary};
    background-color: ${props => props.hoverColor ? colors[props.hoverColor] : props.color ? colors[props.color] : colors.primary};
    color: ${colors.white};
  }

  ${props =>
    props.disabled &&
    css`
    border-color: ${colors.grey};
    color: ${colors.grey};
    cursor: default;
    &:hover, &:active, &:focus {
      background-color: transparent;
      color: ${colors.grey};
      border-color: ${colors.grey};
    }
  `}

  ${props =>
    props.isActive &&
    css`
    border-color: ${props => props.hoverColor ? colors[props.hoverColor] : props.color ? colors[props.color] : colors.primary};
    background-color: ${props => props.hoverColor ? colors[props.hoverColor] : props.color ? colors[props.color] : colors.primary};
    color: ${colors.white};
  `}

`;
StyledButton.displayName = 'StyledButton';
StyledButton.defaultProps = {
  default: true,
};

const Button = ({
  intl,
  label, // Remove once the internationalization is fully supported
  intlLabel,
  name,
  color,
  padding,
  margin,
  disabled,
  display,
  fontSize,
  autowidth,
  width,
  weight,
  type,
  hoverColor,
  isActive,
  disabledColor,
  iconLeft,
  iconRight,
  onClick = noop,
  transform,
  letterSpacing,
  borderSize,
  ariaLabel = label,
}) => {
  const buttonLabel = intlLabel ?
    intl.formatMessage({ id: intlLabel.id }, intlLabel.params) :
    label;

  const [ariaPressed, setAriaPressed] = React.useState('false');
  const onClickButton = (e) => {
    setAriaPressed('true');
    onClick(e);
  };

  return (
    <StyledButton
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
      color={color}
      borderSize={borderSize}
      display={display}
      hoverColor={hoverColor}
      name={name}
      type={type}
      disabled={disabled}
      disabledColor={disabledColor}
      fontSize={fontSize}
      padding={padding}
      weight={weight}
      margin={margin}
      autowidth={autowidth}
      width={width}
      isActive={isActive}
      flexIcons={iconLeft || iconRight}
      // onKeyUp={e => {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   if (e.keyCode == 13) { e.target.click(); }
      // }}
      onClick={onClickButton}
      transform={transform}
      letterSpacing={letterSpacing}
    >
      {(iconLeft || iconRight) ?
        <>
          {iconLeft && <FaIcon fontSize={fontSize} icon={iconLeft} />}
          <div>{buttonLabel}</div>
          {iconRight && <FaIcon fontSize={fontSize} icon={iconRight} />}
        </> : buttonLabel
      }
    </StyledButton>
  );
};

Button.displayName = 'Button';
Button.defaultProps = {
  default: true,
};

export default injectIntl(Button);

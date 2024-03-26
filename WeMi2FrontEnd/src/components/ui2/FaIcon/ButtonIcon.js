import React from 'react';
import { fonts, colors } from 'theme';
import styled, { css } from 'styled-components';
import FaIcon from 'components/ui2/FaIcon';
import { injectIntl } from 'react-intl';
import { noop } from 'utils/functions/noop';

const StyledButton = styled.button`
  font-size: ${props => fonts.size[props.fontSize]};
  text-align: center;
  width: 2em;
  height: 2em;
  border-radius: 100%;
  background-color: transparent;
  outline: none !important;
  box-sizing: border-box;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  ${props => !props.noBorder ?
    css`
      border: 2px solid ${props => props.color ? colors[props.color] : colors.primary};
    `
    :
    css`
      border: none;
    `
  }
  color: ${props => props.color ? colors[props.color] : colors.primary};
  padding: 0;
  line-height: 1.8;

  ${props => !props.noHover ?
    css`&:hover, &:active, &:focus {
      background-color: ${props => props.color ? colors[props.color] : colors.primary};
      color: ${colors.white};
    }`
    : ''
  }
  

  ${props =>
    props.disabled &&
    css`
    border-color: ${({ theme }) => theme.colors.grey};
    color: ${({ theme }) => theme.colors.darkGrey};
    cursor: default;
    &:hover, &:active, &:focus {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
  `}
`;

const ButtonIcon = ({
  icon,
  fontSize,
  color,
  label,
  intl,
  intlLabel,
  disabled,
  noBorder,
  ariaButtonIconLabel,
  noHover,
  onClick = noop,
  ...rest
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
      color={disabled ? 'grey' : color}
      fontSize={fontSize}
      title={buttonLabel}
      aria-label={buttonLabel || ariaButtonIconLabel}
      aria-labelledby={ariaButtonIconLabel}
      disabled={disabled}
      onClick={onClickButton}
      // onKeyUp={e => {
      //   if (e.keyCode == 13) { e.target.click(); } }}
      noBorder={noBorder}
      noHover={noHover}
      {...rest}
    >
      <FaIcon
        fontSize={fontSize}
        icon={icon}
      />
    </StyledButton>
  );
};

ButtonIcon.displayName = 'ButtonIcon';

export default injectIntl(ButtonIcon);

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { injectIntl } from 'react-intl';
import Text from 'components/ui/Text';
import { colors } from 'theme';


const StyledSelect = styled.div`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
  max-height: ${props => props.maxHeight};
  &:focus {
    outline: none!important;
  }
  * {
    &:focus {
      outline: none!important;
    }
    max-height: inherit;
  }

  * {
    transition: all 0.5s ease-in-out;!important
  }

`;

const StyledLabel = styled.span`
  position: absolute;
  top: -10px;
  left: 0.8rem;
  padding: 0 0.45rem;
  word-break: keep-all;
  min-width: min-content;
  font-size: ${({ theme }) => theme.fonts.size.f8};
  color: ${props => props.color ? colors[props.color] : colors.primary};
  transition: all 0.2s linear;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StyledSelectBox = styled.div`
  width: 100%;
  height: 100%;
  > div {
    &:first-child {
      padding: 1.25rem;
      font-size: 0.9rem;
      width: initial;
      cursor: pointer;
    }
  }
  left: 0;
`;
const StyledBoxContainer = styled.input`
    width: 100%;
    height: 3rem;
    border-radius: 0;
    cursor: ${props => props.pointer ? 'pointer' : 'auto'};
    border: none;
    font-weight: light !important;
    color: #333;
    background: ${({ theme }) => theme.colors.white};
    padding: 0.65rem 1.25rem;
    font-size: ${({ theme }) => theme.fonts.size.f7};
    outline: none;
    transition: all 0.5s ease-in-out;!important;
    border: 01px solid  ${props => props.color ? colors[props.color] : colors.primary};
    &::placeholder {
        color: ${props => colors[props.colorPH]};
    }
    ${props => !props.disabled && css`
    &:hover {
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }
    `}
  :focus {
    border: 1px solid  ${props => props.color ? colors[props.color] : colors.primary};
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    transition: all 0.5s ease-in-out;!important;

    ~label {  
    transition: all 0.5s ease-in-out;!important;

    }
  }


`;

const Input = ({
  intl,
  activeIntl,
  intlLabel,
  label,
  value,
  readonly,
  height,
  getValue,
  color,
  inputValue,
  initialValue,
  disabled,
  id,
  intlPlaceholder,
  pattern,
  placeholder,
  colorPH,
  items,
  material,
  required,
  width,
  maxHeight,
  maxLength,
  minLength,
  pointer,
  children,
  min,
  name,
  reEdit,
  max,
  allowNegative,
  ...rest
}) => {
  const [showItems, setShowItems] = useState(false);
  const trueLabel = label ? label : activeIntl? intlLabel ? intl.formatMessage({ id: intlLabel }): label :intlLabel;
  const truePlaceholder = activeIntl? intlPlaceholder ? intl.formatMessage({ id: intlPlaceholder }) : placeholder :intlPlaceholder;
  const [defaultValue, setDefaultValue] = useState(initialValue)

  useEffect(() => {
    if (initialValue !== defaultValue) {
      setDefaultValue(initialValue);
    }
  }, [
    initialValue,
    defaultValue,
  ]);

  if (typeof readonly === 'string') {
    readonly = readonly === 'true';
  }

   if(typeof readonly==="string")
    readonly= readonly==='true'? true : false;
    

  const handleOnChange = (target) => {
    if (!getValue) {
      return;
    }
    getValue.bind(this);
    if (id) {
      getValue(target);
    } else {
      getValue(target.value);
    }
  };

  const defaultValueAttr = defaultValue && ((typeof defaultValue === 'string' && defaultValue.length > 0) || typeof defaultValue === 'number') ? {defaultValue} : null;

  return (
    <StyledSelect maxHeight={maxHeight} width={width} color={color} {...rest}>
      <StyledSelectBox color={color} onClick={() => setShowItems(!showItems)} width={width}>
        <StyledBoxContainer
        color={disabled ? 'darkGrey' : color}
        pointer={pointer}
        pattern={pattern}
        width={width ? width : '100%'} 
        height={height}
        {...defaultValueAttr}
        value = {disabled ? defaultValue : inputValue !== null ? inputValue : undefined}
        id={id}
        onChange={(event)=>{handleOnChange(event.target)}}
        required={required} 
        disabled={disabled} 
        placeholder={truePlaceholder}
        max={max}
        min={min}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readonly}
         {...rest} />
        {material ? <StyledLabel  color={disabled ? 'darkGrey' : color}>{trueLabel} {required && <Text weight="bold" color="red" size="f8" value=" *" />}</StyledLabel> : null}
{children && children}
      </StyledSelectBox>
    </StyledSelect>
  );
};
Input.displayName = 'Input';
export default injectIntl(Input);

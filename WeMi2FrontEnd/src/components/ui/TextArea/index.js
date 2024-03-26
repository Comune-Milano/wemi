/** @format */

import React, { useState , createRef, useEffect} from 'react';
import styled,{css} from 'styled-components';
import { injectIntl } from 'react-intl';
import Text from 'components/ui/Text';
import {colors, fonts} from 'theme';
import { hexToRgba } from 'utils/functions/hexToRgba';


const StyledSelect = styled.div`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
  max-height: ${props => props.maxHeight};
  transition: all 0.2s linear;
  * {
    transition: all 0.2s linear!important
  }
  &:focus {
    outline: none!important;
  }
  * {
    &:focus {
      outline: none!important;
    }
    max-height: inherit;
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 0.8rem;
  padding: 0 0.45rem;
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
      font-size: 1.1rem;
      width: initial;
      cursor: pointer;
    }
  }
  transition: all 0.2s linear;
  left: 0;
`;
const StyledBoxContainer = styled.textarea`
  border: 01px solid ${props => props.color ? colors[props.color] : colors.primary};
  border-radius: 0;
  box-sizing: border-box;
  background-color: ${({ bgColor }) => hexToRgba(bgColor, 0.2)};
  width: 100%;
  font-size: ${props => props.size ? fonts.size[props.size] : 'inherit'};
  margin: 0px;
  padding: 25px;
  height: 100%;
  resize: none;
  transition: all 0.2s linear;
  ${props => !props.readOnly && css`
  &:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  :focus {
    border: 1px solid ${props => props.color ? colors[props.color] : colors.primary};
    transition: all 0.2s linear;
    
    ~label {
    transition: all 0.2s linear;

    }
  }
  ` }
`;

const TextArea = ({
  setReset,
  activeIntl,
  size,
  readOnly,
  reset,
  initialValue,
  noLabel,
  intl,
  items,
  id,
  getValue,
  material,
  noIntl,
  required,
  width,
  placeholder,
  value,
  maxLength,
  color,
  maxHeight,
  name,
  controlled,
  preserveLineBreaks,
  backgroundColor,
  disabledBackgroundColor,
  colorReadOnly="darkGrey",
  ...rest
}) => {
  const [showItems, setShowItems] = useState(false);
  const label = activeIntl ? !noLabel && !noIntl && intl.formatMessage({ id: name }) : name;
  const ref = createRef(null);

  useEffect(() => {
    if (reset) {
      ref.current.value = '';
    }
    if (setReset) {
      setReset(false);
    }
  }, [
    ref,
    reset,
    setReset,
  ]);

  const handleNewLine = (target) => {
    const targetValue = target.value;
    const str = !preserveLineBreaks ? targetValue.replace(/(?:\r\n|\r|\n)/g, ' ') : targetValue;
    const newVal = {
      value: str,
      id: target.id,
    };
    getValue.bind(this);
    getValue(id ? newVal : str);
  };

  readOnly = readOnly === 'true';
  let bgColor = colors.white;
  if(readOnly && disabledBackgroundColor) {
    bgColor = colors[disabledBackgroundColor];
  } else if(backgroundColor) {
    bgColor = colors[backgroundColor];
  }
  return (
    <StyledSelect maxHeight={maxHeight} width={width} {...rest}>
      <StyledSelectBox onClick={() => setShowItems(!showItems)}>
        <StyledBoxContainer
          id={id}
          color={readOnly ? colorReadOnly : color}
          required={required}
          placeholder={controlled ? '' : value}
          onChange={getValue ? (event) => { handleNewLine(event.target); } : null}
          size={size}
          maxLength={maxLength}
          readOnly={readOnly}
          ref={ref}
          bgColor={bgColor}
          {...(controlled ? value !== null ? { value : value } : undefined : { defaultValue: initialValue })}
        >
        </StyledBoxContainer>
        {material ? <StyledLabel color={readOnly ? colorReadOnly : color}>{!noLabel && label ? label : name} {required && <Text weight="bold" color="red" value=" *" />}</StyledLabel> : null}
      </StyledSelectBox>
    </StyledSelect>
  );
};
TextArea.displayName = 'TextArea';
export default injectIntl(TextArea);

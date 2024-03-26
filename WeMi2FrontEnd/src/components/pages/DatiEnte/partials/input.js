import React, { useState } from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import media from 'utils/media-queries';
import Text from 'components/ui/Text'

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

const StyledLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 0.8rem;
  padding: 0 0.45rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.blue};
  transition: all 0.2s linear;


  background-color: ${({ theme }) => theme.colors.white};
  ${media.sm`
  font-size: .6rem;
    `}
  ${media.md`
  font-size: .65rem;
    `}
  ${media.lg`
  font-size: 0.9rem;
  `}
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
    border-radius: 5px;
    border: none;
    font-weight: light !important;
    color: #333;
    background: ${({ theme }) => theme.colors.white};
    padding: 0.65rem 1.25rem;
    font-size: 1.1rem;
    outline: none;
    transition: all 0.5s ease-in-out;!important;
    border: 1px solid ${({ theme }) => theme.colors.blue};
  :focus {
    border: 2px solid ${({ theme }) => theme.colors.blue};
    transition: all 0.5s ease-in-out;!important;

    ~label {  
    transition: all 0.5s ease-in-out;!important;

    }
  }
`;

const TextArea = ({ intl, intlLabel, getValue,   initialValue, disabled,  intlPlaceholder, items, material, required, width, maxHeight, name, ...rest }) => {
  const [showItems, setShowItems] = useState(false);
  const label = intlLabel && intl.formatMessage({ id: intlLabel });
  const placeholder = intlPlaceholder && intl.formatMessage({ id: intlPlaceholder });
  return (
    <StyledSelect maxHeight={maxHeight} width={width} {...rest}>
      <StyledSelectBox onClick={() => setShowItems(!showItems)}>
        <StyledBoxContainer 
         onChange={getValue ? (event) => {getValue.bind(this)
          getValue(event.target.value)} : null}
        required={required} 
        disabled={disabled} 
        placeholder={placeholder} {...rest}/>
        {material ? <StyledLabel>{label} {required && <Text weight="bold" color="red" value=" *" />}</StyledLabel> : null}

      </StyledSelectBox>
    </StyledSelect>
  );
};
TextArea.displayName = 'TextArea';
export default injectIntl(TextArea);

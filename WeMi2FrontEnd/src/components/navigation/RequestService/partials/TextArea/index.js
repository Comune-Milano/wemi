/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import media from 'utils/media-queries';

const StyledSelect = styled.div`
  position: relative;
  height: ${props => props.height};
  margin-top:1rem !important;
  max-height: ${props => props.maxHeight};
  * {
    max-height: inherit;
  }
  ${media.sm`
  margin-top:.2rem;
  `}
${media.md`
margin-top:.7rem;
  `}
${media.lg`
margin-top:.7rem;
`}
  textarea{
    width: calc(${props => props.width} *0.6);
  ${media.sm`
  
    width:calc(${props => props.width} *0.7);`}
  ${media.md`
  
    width: calc(${props => props.width} *0.8);`}
  ${media.lg`
  
    width: ${props => props.width};`}
  ${media.xl`
  
    width: calc(${props => props.width} *1.05);`}
}
`;

const StyledLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 0.8rem;
  padding: 0 0.45rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};

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
const StyledBoxContainer = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  margin: 0px;
  padding: 0px;
  height: 100%;
  resize: none;
  :focus {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = ({ intl, items, material, width, value, maxHeight, name, ...rest }) => {
  const [showItems, setShowItems] = useState(false);
  const label = intl.formatMessage({ id: name });
  return (
    <StyledSelect maxHeight={maxHeight} width={width} {...rest}>
      <StyledSelectBox onClick={() => setShowItems(!showItems)}>
        <StyledBoxContainer placeholder={value} />
        {material ? <StyledLabel>{label}</StyledLabel> : null}
      </StyledSelectBox>
    </StyledSelect>
  );
};
TextArea.displayName = 'TextArea';
export default injectIntl(TextArea);

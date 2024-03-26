/** @format */

import React, { useState, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { injectIntl } from 'react-intl';
import Scrollbar from 'components/ui/Scrollbar';

const StyledSelect = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  height: 3rem;
  max-height: ${props => props.maxHeight};
  * {
    max-height: inherit;
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 0.8rem;
  padding: 0 0.45rem;
  font-size: ${({ theme }) => theme.fonts.size.f8};
  &:first-letter {
    text-transform: capitalize;
  }
  color: ${({ theme }) => theme.colors.blue};

  background-color: ${({ theme }) => theme.colors.white};
`;

const StyledSelectBox = styled.div`
  width: 100%;
  height: 100%;
  > div {
    &:first-child {
      padding: 1.25rem;
      font-size: ${({ theme }) => theme.fonts.size.f8};
      width: initial;
      cursor: pointer;
    }
  }
  left: 0;
`;
const StyledBoxContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 5px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  margin: 0px;
  padding: 0px;
  height: 100%;
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.blue};
  }
`;

const StyledOptionGroup = styled.div`
  ${props =>
    props.showItems
      ? css`
          max-height: 12rem;
          overflow: auto;
          height: auto;
          max-height: 12rem;
          position: absolute;
          width: 100%;
          z-index: 7;
          div {
            z-index: 4;
            visibility: visible;
          }
        `
      : css`
          max-height: 0;
          overflow: hidden;
          div {
            visibility: hidden;
          }
        `}
`;

const StyledOption = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.inherit};
  border-left: 1px solid ${({ theme }) => theme.colors.grey};
  border-right: 1px solid ${({ theme }) => theme.colors.grey};
  padding: 0.65rem 1.25rem;
  font-size: ${({ theme }) => theme.fonts.size.f8};
  &:first-letter {
    text-transform: capitalize;
  }
  &:last-child {
    border-radius: 0 0 5px 5px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  }
  &:selected {
    background-image: url('/check.png');
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: 2px 8px;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
    font-size: calc(${({ theme }) => theme.fonts.size.f7}*0.8);
    transition: all 0.2s linear;
    cursor: pointer;
  }
`;

const StyledSelectedItemBox = styled.div`
  height: 100%;
  font-size: ${({ theme }) => theme.fonts.size.f8};
  margin-bottom: 0;
  display: flex;
  align-items: center;
  p {
    &:first-letter {
      text-transform: capitalize;
    }
  }
`;
const StyledSelectArrowBox = styled.div`
  width: 50px;
  height: 100%;
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  top: 0;
`;
const StyledSelectArrow = styled.span`
  height: 0;
  margin: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid ${({ theme }) => theme.colors.blue};
  transition: all 0.2s linear;

  ${props =>
    props.up &&
    css`
      transform: rotate(180deg);
      top: 9px;
      transition: all 0.2s linear;
    `}
`;

const StyledBackdrop = styled.div`
  display: none;
  opacity: 0.5;
  height: 100%;
  width: 100%;
  visibility: hidden;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 0;
  transition: visibility 0.6s ease-in-out;

  ${props =>
    props.open &&
    css`
      display: block;
      background-color: none;
      opacity: 0;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      visibility: visible;
      position: fixed;
      z-index: 6;
      transition: visibility 0.5s ease-in-out;
    `}
`;


const Select = ({ intl, items, material, selectedValue, getValue, maxHeight, name, ...rest }) => {
  const [showItems, setShowItems] = useState(false);
  const label = intl.formatMessage({ id: name });
  return (
    <Fragment>
      <StyledBackdrop   open={showItems} onClick={() => setShowItems(!showItems)}/>
    <StyledSelect maxHeight={maxHeight} {...rest}>
    
      <StyledSelectBox onClick={(event) => {
        event.stopPropagation()
        setShowItems(!showItems) }}>
        <StyledBoxContainer>
          <StyledSelectedItemBox>
            {material ? <StyledLabel>{label}</StyledLabel> : null}
            <p>{selectedValue ? selectedValue.value : selectedValue}</p>
          </StyledSelectedItemBox>
          <StyledSelectArrowBox onClick={() => setShowItems(!showItems)} up={showItems}>
            <StyledSelectArrow up={showItems} />
          </StyledSelectArrowBox>
        </StyledBoxContainer>
        <StyledOptionGroup
          showItems={showItems}
        >
          {items.map(item => (
            <StyledOption
              key={item.textValue}
              id={item.value}
              onClick={() => {
                setShowItems(!showItems);
                getValue.bind(this);
                getValue({ id: item.value, value: item.textValue });
              }}
            >
              {item.textValue}
            </StyledOption>
          ))}
        </StyledOptionGroup>
      </StyledSelectBox>
    </StyledSelect>
    </Fragment>
  );
};
Select.displayName = 'Select';
export default injectIntl(Select);

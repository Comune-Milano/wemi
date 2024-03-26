/** @format */

import React, { useState, Fragment, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Text from 'components/ui/Text';
import { injectIntl } from 'react-intl';
import FaIcon from 'components/ui/FaIcon';
import {colors} from 'theme';
import {isNullOrUndefined} from 'util';

const StyledSelect = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  height: 3em;
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
  color:  ${props => props.color ? colors[props.color] :  colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
`;

const StyledSelectBox = styled.span`
  width: 100%;
  height: 100%;


  > div {
    &:first-child {
      padding: 0rem 1.25rem 0;
      font-size: ${({ theme }) => theme.fonts.size.f7};
      width: initial;
      cursor: pointer;
    }
  }
  left: 0;
`;
const StyledBoxContainer = styled.div`
  border: 1px solid ${props => props.color ? colors[props.color] :  colors.primary};
  border-radius: 0;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  margin: 0px;
  padding: 0px;
  height: 100%;
  transition: all 0.5s ease-in-out;!important;
  &:focus {
    border: 1px solid  ${props => props.color ? colors[props.color] :  colors.primary};
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    transition: all 0.5s ease-in-out;!important;
  }
  &:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    transition: all 0.5s ease-in-out;!important;
  }
  
`;

const StyledOptionGroup = styled.div`
transition: max-height 0.2s linear;
overflow: hidden;
@keyframes changeOverflow {
  0% {overflow: hidden}
  100% {overflow: auto}
}
  ${props =>
    props.showItems
      ? css`
      overflow-y: auto;
      overflow-x: hidden;
          border: 01px solid  ${props => props.color ? colors[props.color] :  colors.primary};
          border-top: none;
          max-height: 12.2rem;
          height: auto;
          position: absolute;
          animation-name: changeOverflow;
          animation-delay: 0.2s;
          animation-duration: 0.2s;
        transition: max-height 0.2s linear;
          ${props => props.upward && css`
          bottom: 100%;
          box-shadow: none;
          -webkit-appearance: none;
          overflow-y: auto;
          overflow-x: hidden;
          max-height: 12.2rem;
          border: 01px solid ${props => props.color ? colors[props.color] :  colors.primary};
          border-bottom: none;
          `}
          width: 100%;
          z-index: ${props => props.zIndex ? props.zIndex : '7'};
          div {
            z-index: ${props => props.zIndex ? props.zIndex : '7'};
            visibility: visible;
          }
        `
      : css`
          max-height: 0;
          overflow: hidden;
        transition: max-height 0.1s ease-out;
        ${props => props.upward && css`
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        bottom: 100%;
        transition: max-height 0.1s ease-out;
        `}

        `}
`;

const StyledOption = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.inherit};
  border-left: 01px solid ${({ theme }) => theme.colors.grey};
  border-right: 01px solid ${({ theme }) => theme.colors.grey};
  padding: 0.65rem 1.25rem;
  font-size: ${({ theme }) => theme.fonts.size.f7};
  &:first-letter {
    text-transform: capitalize;
  }
  &:last-child {
    border-radius: 0;
    border-bottom: 01px solid ${({ theme }) => theme.colors.grey};
  }
  ${props => props.upward && css`
  &:first-child {
    border-radius: 0;
    border-bottom: 01px solid ${({ theme }) => theme.colors.grey};
  }
  &:last-child {
    border-radius: 0;
    border-bottom: 01px solid ${({ theme }) => theme.colors.grey};
  }
  `}
  &:selected {
    background-image: url('/check.png');
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: 2px 8px;
  }
  &:hover {
    color: ${props => props.color ? colors[props.color] :  colors.primary};
    background-color: ${({ theme }) => theme.colors.grey};
    font-size: calc(${({ theme }) => theme.fonts.size.f7}*1.02);
    transition: all 0.2s linear;
    cursor: pointer;
  }
`;

const StyledSelectedItemBox = styled.div`
  height: 100%;
  font-size: ${({ theme }) => theme.fonts.size.f7};
  margin-bottom: 0;
  display: flex;
  align-items: center;

  p {
    
&[aria-label]{
  &:hover {
    &:after {
     content: attr(aria-label);
     padding: 4px 8px;
     position: absolute;
     float: right;
     bottom: 130%;
     width: fit-content;
     color: black;
     background-color: rgba(255,255,255, .6);
     padding: .5em;
     white-space: nowrap;
     z-index: 20;
     border: 1px solid ${colors.grey};
     right: 0;
    }
  }
}
    max-height: calc(3em - 1.25rem);
    &:first-letter {
      text-transform: capitalize;
    }
  }
`;
const StyledSelectArrowBox = styled.div`
  width: 3rem;
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
  border-top: 10px solid  ${props => props.color ? colors[props.color] :  colors.primary};
  transition: all 0.2s linear;

  ${props =>
    props.up &&
    css`
      transform: rotate(180deg);
      top: 9px;
      transition: all 0.2s linear;
    `}
    ${props => props.upward && css`
    transform: rotate(180deg);
    top: 9px;
    ${props =>
      props.up &&
      css`
        transform: rotate(0deg);
        top: 0;
        transition: all 0.2s linear;
      `}
    `}
`;

const ResetIcon = styled(FaIcon)`
      position: absolute;
      right: 18%;   
      font-size: 1.2em;
      top: calc(50% - .7em);
      color: ${colors.darkGrey};
      &:hover {
        color: ${colors.red}
      }
      animation-name: fadeIn,
      animation-duration: .5s

`

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


const Select = ({ intlPlaceholder, activeIntl, intl, items, material, selectedValue, upward, 
  getValue, maxHeight, maxLength, name, color, required, reset, zIndex, ...rest }) => {
  const [showItems, setShowItems] = useState(false);
  const [defaultValue, setDefaultValue] = useState(selectedValue);

  const label = activeIntl? intlPlaceholder ? intl.formatMessage({ id: name }) : name : name;
  useEffect(() => {
    if(selectedValue !== defaultValue) {
      setDefaultValue(selectedValue)
    }
  }, [selectedValue, defaultValue])

  return (
    <Fragment>
      <StyledBackdrop   open={showItems} onClick={() => setShowItems(!showItems)}/>
    <StyledSelect maxHeight={maxHeight} color={color} {...rest}>
      <StyledSelectBox  onClick={(event) => {
        event.stopPropagation()
        if(items.length > 0)
        setShowItems(!showItems) }}
        color={color} >
        <StyledBoxContainer color={color} >
        {material ? <StyledLabel   color={color} >{label}{required && <Text  weight="bold" color="red" size="f8" value=" *" />}  </StyledLabel> : null}
          <StyledSelectedItemBox  color={color} >
            <p aria-label={selectedValue && selectedValue.value && selectedValue.value.length > 0 ? selectedValue.value : null} style={{width:'80%'}}>
            {!isNullOrUndefined(defaultValue, defaultValue && defaultValue.value) && label === name ? 
            defaultValue.value && maxLength && defaultValue.value.length > maxLength ? 
            defaultValue.value.substring(0, maxLength).concat('...') 
            : defaultValue.value   : selectedValue && selectedValue.value ? selectedValue.value : null}
           </p>
          </StyledSelectedItemBox>
          <StyledSelectArrowBox   color={color}  onClick={() =>{ if(items.length > 0)setShowItems(!showItems)}} up={showItems}>
            <StyledSelectArrow   color={color}  up={showItems} upward={upward} />
          </StyledSelectArrowBox>
          {reset && defaultValue && !showItems && defaultValue.value && <ResetIcon noShadow icon="\f00d"    
          onClick={(event) => {
                event.stopPropagation();
                getValue.bind(this);
                getValue({id: -1});
              }} />}
        </StyledBoxContainer>
        <StyledOptionGroup zIndex={zIndex}  color={color}  upward={upward}
          showItems={showItems}
        >
          {items.map(item => (
            <StyledOption
            color={color} 
            upward={upward}
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

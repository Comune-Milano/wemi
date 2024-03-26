import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'theme';
import FaIcon from 'components/ui/FaIcon';
import Text from 'components/ui/Text';

const WrapperOption = styled.div`display: flex;
justify-content: space-between;
width:100%;`;
const StyledOptionGroup = styled.div`
transition: max-height 0.2s linear;
overflow: hidden;
@keyframes changeOverflow {
  0% {overflow: hidden}
  100% {overflow: auto}
}

`;

const StyledOption = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.inherit};
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.grey};
  padding: 0.65rem 1.25rem;
  display: block;
  font-size: ${({ theme }) => theme.fonts.size.f8};
  &:first-letter {
    text-transform: capitalize;
  }
  &:last-child {
    border-radius: 0;
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.grey};
  }
  ${props => props.upward && css`
  &:first-child {
    border-radius: 0;
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.grey};
  }
  &:last-child {
    border-radius: 0;
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.grey};
  }
  `}
  &:selected {
    background-image: url('/check.png');
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: 2px 8px;
  }
  &:hover {
    color: ${props => props.color ? colors[props.color] : colors.primary};
    font-size: calc(${({ theme }) => theme.fonts.size.f7}*0.8);
    transition: all 0.2s linear;
    cursor: pointer;
  }
`;

const FocusableList = ({ color, upward, items, getValue, selectedValue }) => {
    return (
        <StyledOptionGroup color={color} upward={upward}
        >
            {items.map(item => (

                <StyledOption
                    color={color}
                    upward={upward}
                    key={item.textValue}
                    id={item.value}
                    onClick={(event) => {
                        
                        getValue.bind(this);
                        if (item.value === selectedValue.value) {
                          getValue({});
                        }
                        else {
                          getValue(item);
                        }
              
                        event.stopPropagation();
                    }}
                >
                
                    <WrapperOption>
                        <Text value={item.textValue} tag="div" />
                        {selectedValue && selectedValue.value===item.value ?
                            <FaIcon noShadow icon="\f00c" color={color ? color : "primary"} fontSize="f7" /> : null}
                    </WrapperOption>
                </StyledOption>


            ))}

        </StyledOptionGroup>
    )
};

export default FocusableList;
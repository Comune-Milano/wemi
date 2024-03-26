/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, fonts } from 'theme';

import Text from 'components/ui/Text';
const StyledTabs = styled.ul`
        background-color: ${props => (props.bgcolor ? colors[props.bgcolor] : 'unset')}  !important;
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        width: 80%;
    border: 0;
    padding: .7rem;
    margin: 1rem;
    z-index: 1;
    position: relative;
    color: ${props => colors[props.color]};
    .active{
        border-bottom: ${props =>
          props.bgcoloractive ? colors[props.bgcoloractive] : 'black'} 1px solid;
        background-color: unset;
        color: ${props => colors[props.coloractive]}; 
        transition: none;
        font-weight: bold;
        border-radius: 0 !important;
    }
}

       
`;

const StyledNavLink = styled.a`
  display: inline-flex;
  background-color: ${props => (props.bgcolor ? colors[props.bgcolor] : 'unset')} !important;
  padding: ${props => props.theme.spacing.p2} 3.5rem;
  font-size: ${props => fonts.size[props.fontsize]};
  color: ${props => colors[props.color]};
  transition: none;

  .active {
    border-bottom: ${props => (props.bgcoloractive ? colors[props.bgcoloractive] : 'black')} 1px
      solid;
    background-color: unset;
    color: ${props => colors[props.coloractive]};
    transition: none;
    font-weight: bold;
    border-radius: 0 !important;
  }
`;
const StyledNavItem = styled.li`
  margin-bottom: -1px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  color: ${props => colors[props.color]};
  .active {
    border-bottom: ${props => (props.bgcoloractive ? colors[props.bgcoloractive] : 'black')} 1px
      solid;
    background-color: unset;
    color: ${props => colors[props.coloractive]};
    transition: none;
    font-weight: bold;
    border-radius: 0 !important;
  }
`;

const Tabs = ({ defaultelement, json, colors, transform }) => {
  const [activeItem, setActive] = useState(defaultelement);
  return (
    <>
      <StyledTabs
        bgcolor={colors.bgcolor}
        bgcoloractive={colors.bgcoloractive}
        coloractive={colors.coloractive}
        color={colors.color}
      >
        {json.map((elemento, index) => (
          <StyledNavItem
          key={index.toString()}
            bgcolor={colors.bgcolor}
            bgcoloractive={colors.bgcoloractive}
            coloractive={colors.coloractive}
            color={colors.color}
          >
            <StyledNavLink
              bgcolor={colors.bgcolor}
              bgcoloractive={colors.bgcoloractive}
              coloractive={colors.coloractive}
              color={colors.color}
              className={activeItem === index + 1 ? 'active' : ''}
              onClick={() => setActive(index + 1)}
            >
              <Text
                value={elemento.title}
                color={activeItem === index + 1 ? colors.coloractive : colors.color}
                transform={transform}
              />
            </StyledNavLink>
          </StyledNavItem>
        ))}
      </StyledTabs>
      <div>
        {json.map((elemento, index) => (
          <>
            {activeItem === index + 1 ? (
              <div key="content">
                <elemento.component />
              </div>
            ) : null}
          </>
        ))}
      </div>
    </>
  );
};
Tabs.displayName = 'Tabs';

export default Tabs;

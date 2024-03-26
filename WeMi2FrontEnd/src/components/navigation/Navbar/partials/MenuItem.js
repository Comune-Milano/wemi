/** @format */

import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';

const MenuItem = styled.li`
  transition: all .3s linear;
  outline: none;
  ${props => props.icon ? css`
    min-width: none;
    &:last-child {
      padding-left: 1em
    }
    > ul {
      height: auto;
    }
    &:hover, &:focus, &:focus-within {
      i {
        /* color: ${colors.grey}; */
      }      
    };
      > ul {
        max-height: ${props => props.active ? '100vh' : '0'};
        transition: max-height .5s ease-in-out;
      }
      i {
          &.fa-bars {
            display: ${props => props.active ? 'none' : 'block'};
          };
          &.fa-times {
            display: ${props => props.active ? 'block' : 'none'};
          };
      }
  }  

  ` :
    props.mobileItem ? css`
    flex-direction: column;
    padding: 0;
    a {
      display: block;
      width: 100%;
      padding: 1.5em 1em;
    }
    >a {
      padding: 1.5em 1em;
    }
    &:focus {
      color: ${colors.red};
      background-color: ${colors.white};
    };
    &:focus-within {
      color: ${colors.red};
      background-color: ${colors.white};
    };
      ${props => props.active ? css`
          &:hover, &:focus-within {
            color: ${colors.white};
            background-color: ${colors.red};
            transition: all .2s linear;
            > ul {
              max-height: 100vh;
            }
          }
       ` : css`
       > ul {
        max-height: 0!important;
      };
      &:hover, &:focus-within {
        > ul {
          max-height: 100vh!important;
        }
      }
      `}
      &:first-child {
        border-top: .5em solid ${colors.white};
      }
      &:last-of-type {
        border-bottom: .5em solid ${colors.white}!important;
      }
  `
      : css`
  min-width: 17.5vw;
  ${media.xxl`
    min-width: 19.5rem;
  `}

  padding: 1em;
  position: relative;
  &:hover, &:focus {
    color: ${colors.red};
    background-color: ${colors.white};
    transition: all .2s linear;
    > ul {
      max-height: 100vh;
      transition: all .5s ease-in-out;
    }
  };
  &:focus-within {
    color: ${colors.red};
    background-color: ${colors.white};
    transition: all .2s linear;
    > ul {
      max-height: 100vh;
      transition: all .5s ease-in-out;
    }
  };
  > ul {
    max-height: 0;
    transition: all .2s linear;
  }
  `};
  
  color: ${colors.white};
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: stretch;
  text-align: center;
  cursor: default;
`;

export const DropdownMenu = styled.ul`
position: absolute;
top: 100%;
height: auto;
overflow: hidden;
${props => props.mobile ? css`
background-color: ${colors.red};
width: 60%;
right: 3vw;
`: props.mobileItem ? css`
  position: static;
`
      : css`
background-color: ${colors.white};
width: 100%;
left: 0;
`}
cursor: default;
`;

export const MenuItem2 = styled.li`
transition: transform .2s linear, all .3s linear;
cursor: default;
width: 100%;

  color: ${colors.darkGrey};
  background-color: ${colors.white};
  text-align: center;
  &:hover, &:focus {
    transition: all .2s linear;
    color: ${colors.black};
    background-color: ${colors.grey}
  };
  &:focus-within {
    transition: all .2s linear;
    color: ${colors.black};
    background-color: ${colors.grey}
  };
  ${props => props.mobileItem ? css`
  /* padding: 1.5em 1em; */
  `
    : css`
padding: .5em 1em;
margin: .5em 0 0;
`}

`;


MenuItem.displayName = 'MenuItem';

export default MenuItem;

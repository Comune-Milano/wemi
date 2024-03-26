/** @format */

import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';

// border-radius: 0 0 5px 5px;

export const DropdownContent = styled.div``;

const Dropdown = styled.ul`
  position: relative;
  display: block;
  text-align: center;
  padding: 0.5rem 0.75rem;
  display: flex;
  &:hover, &:focus, &:focus-within {
    transition: all .2s linear;
  }

  ${props =>
    props.navItem &&
    css`
      width: auto;
      min-width: 14em;
      ${media.xxl`
      min-width: 11em;
      `}
      height: 40px;
      color: white;
      cursor: pointer;
      &:hover, &:focus, &:focus-within {
        color: black;
        background: white;
       
      }

    `}

  ${props =>
    props.dropdownItem &&
    css`
      width: 90%;      
      margin: 5px auto;
      color: black;
      background: #f0f0f0;
      justify-content: center;
      border: 0 #f0f0f0 solid;
      transition: all 0.2s linear;
      &:hover, &:focus, &:focus-within {
        margin: 10px auto;
        color: #dd0031;
        background: white;
        cursor: pointer;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
        transition: all 0.2s linear;
      }

    `}
    ${props =>
    props.dropdownItemMobile &&
    css`
        width: 92%;
        margin: 5px auto;
        
        color: white;
        background: ${colors.red};
        justify-content: center;
        border: 0;
        transition: all 0.2s linear;
        ${props => props.active && css`
        color: #dd0031!important;
        background-color: white;
        cursor: pointer;
        margin: 10px auto;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
        transition: all 0.2s linear;
        `};
        &:hover, &:focus, &:focus-within  {
          color: #dd0031!important;
          background-color: white;
          cursor: pointer;
          margin: 10px auto;
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
          transition: all 0.2s linear;
        }
      `}
  div {
    z-index: 1;
    height: auto;
    max-height: 0;
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    transition: max-height 0.2s ease-out;
  }

  &:hover, &:focus, &:focus-within  {
    div {
      max-height: 50em;
      transition: max-height 0.5s ease-in;
    }
  }

  ${props =>
    props.navItem &&
    css`
      color: white;
      height: 2.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
      ${media.xxxl`
      font-size: 90%!important;
     `}
      }
      div {
        background: #f0f0f0;
        top: 2.5em!important;
      }
      &:hover, &:focus, &:focus-within {
        color: black;
        background: ${({ theme }) => theme.colors.white};
        cursor: pointer;
      }
      ${props =>
        props.scrollDown &&
        css`
      cursor: default;
      &:hover,&:focus, &:focus-within  {
        cursor: pointer;
        `}
    `}

    ${props =>
    props.navMobile &&
    css`
        ${media.md`
          display: none;
          `}
  
        display: block;
        color: white;
        position: static;
        height: 2.5em;
        width: auto;
  
        div {
          z-index: 1;
          height: auto;
          max-height: 0;
          background: ${colors.red};
          width: 100%;
          border-radius: 0;
          position: absolute;
          top: 9em;
          left: 0;
          transition: max-height 0.5s ease-out;
        }
        ${props =>
        props.scrollDown &&
        css`
          div {
            top: 5em;
          }          
          `}
          &:hover, &:focus, &:focus-within  {
          div {
            max-height: none;
            transition: max-height 0.5s ease-in;
          }
        }
      `}
`;

export default Dropdown;

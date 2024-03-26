/** @format */

import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import MenuItem from './MenuItem';

export const DropdownContent = styled.div``;

const Dropdown = styled(MenuItem)`
  position: relative;
  display: block;

  div {
    z-index: 1;
    height: auto;
    max-height: 0;
    border-radius: 0 0 5px 5px;
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    transition: max-height 0.2s ease-out;
  }
  &:hover {
    div {
      max-height: none;
      transition: max-height 0.5s ease-in;
    }
  }

  ${props =>
    props.navItem &&
    css`
      color: white;
      height: 3em;
      div {
        background: #f0f0f0;
        top: 0;
      }
      &:hover {
        color: black;
        background: ${({ theme }) => theme.colors.white};
        cursor: pointer;
      }
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
      height: 3em;
      width: auto;

      div {
        z-index: 1;
        height: auto;
        max-height: 0;
        background: #dd0031;
        width: 100%;
        border-radius: 0;
        position: absolute;
        top: 110px;
        left: 0;
        transition: max-height 0.5s ease-out;
      }
      &:hover {
        div {
          max-height: none;
          transition: max-height 0.5s ease-in;
        }
      }
    `}
`;

export default Dropdown;

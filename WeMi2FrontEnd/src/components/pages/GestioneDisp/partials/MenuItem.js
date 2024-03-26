/** @format */

import styled, { css } from 'styled-components';

const MenuItem = styled.li`
  text-align: center;
  padding: 0.5rem 0.75rem;
  display: flex;
  &:hover {
    transition: all .2s linear;
  }

  ${props =>
    props.navItem &&
    css`
      width: 210px;
      height: 40px;
      color: white;
      &:hover {
        color: black;
        background: white;
        cursor: pointer;
      }
    `}

  ${props =>
    props.dropdownItem &&
    css`
      width: 8em;
      border-radius: 5px;
      margin: 5px auto;
      color: black;
      font-size: f10;
      background: #f0f0f0;
      justify-content: right;
      border: 0 #f0f0f0 solid;
      transition: all 0.2s linear;
      &:hover {
        margin: 10px auto;
        color: #0099ab;
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
        border-radius: 5px;
        color: white;
        background: #dd0031;
        justify-content: center;
        border: 0;
        transition: all 0.2s linear;

        &:hover {
          color: #dd0031;
          background: #f0f0f0;
          cursor: pointer;
          margin: 10px auto;
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
          transition: all 0.2s linear;
        }
      `}
`;

MenuItem.displayName = 'MenuItem';

export default MenuItem;

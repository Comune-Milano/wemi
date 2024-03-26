/** @format */
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { spacing } from 'theme';

const Menu = styled.ul`
  align-items: center;
  justify-content: center;
  height: auto;
  opacity: 1;
  transition: all .4s linear;

  ${media.md`
    height: auto;
    align-items: center;
    display: flex;
    transition: all 0.5s linear;
  `}

  ${props => props.menu ? css`
  
    > li {
      width: ${`calc((100% - ${spacing.pagePadding.p1})/${props.menu})`};
      justify-content: center;
      min-width: 5vw;
      a {
        justify-content: center;
        width: 100%;
        word-break: break-word;
      }
    }

    > a {
      width: ${`calc((100% - ${spacing.pagePadding.p1})/${props.menu})`};
      min-width: 5vw;
      justify-content: center;
      li {
        min-width: 5vw;
        width: 100%;
        word-break: break-word;
      }
    }
  
  ` : ''}


  ${props =>
    props.navbarMenu ?
      css`
      position: relative;
      display: none;
      transition: all 0.5s linear;
      padding: 0 ${spacing.pagePadding.p1};
      
      ${media.md`
        border-top: 3px white solid;
        width: 100%;
        display: flex ;
        margin-right: 0;
        transition: all 1s linear;
      `}
      `
      : props.mobile ? css`
        display: inline-flex;
      ` : null};  
`;
Menu.displayName = 'Menu';

export default Menu;

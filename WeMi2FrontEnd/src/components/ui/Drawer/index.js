/** @format */

import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { Row, Column } from 'components/ui/Grid';
import FaIcon from 'components/ui/FaIcon';
import { colors } from 'theme';

const StyledBackdrop = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.5;
  height: 100%;
  width: 100%;
  visibility: hidden;
  position: fixed;
  z-index: 8;
  transition: visibility 0.6s ease-in-out;
  max-width: 1440px;
  left: 50%;
  transform: translateX(-50%);

  ${props =>
    props.open &&
    css`
      background-color: ${({ theme }) => theme.colors.black};
      opacity: 0.5;
      height: 100%;
      width: 100%;
      visibility: visible;
      position: fixed;
      z-index: 8;
      transition: visibility 0.5s ease-in-out;
    `}

  ${props =>
    props.from == 'right' &&
    css`
      top: 0;
      right: 0;
      visibility: hidden;
      transition: visibility 0.6s ease-in-out;
      ${props =>
        props.open &&
        css`
          top: 0;
          right: 0;
          visibility: visible;
          transition: visibility 0.5s ease-in-out;
        `}
    `}

    ${props =>
      props.from == 'bottom' &&
      css`
        top: 0;
        left: 0;
        visibility: hidden;
        transition: visibility 0.6s ease-in-out;
        ${props =>
          props.open &&
          css`
            top: 0;
        left: 0;

            visibility: visible;
            transition: visibility 0.5s ease-in-out;
          `}
      `}
`;



const StyledDrawer = styled.div`
font-size: 1rem;
@keyframes drawerOpacity {
  0% {opacity: 0}
  100% {opacity: 1}
}
@keyframes drawerOpacityOut {
  0% {opacity: 1}
  100% {opacity: 0}
}
  overflow-x: hidden;

  ${props =>
    props.from == 'right' &&
    css`

  height: 100%;
  width: 0;
  position: fixed;
  z-index: 40;
  bottom: 0;
  right: 0;
  transition: all .2s ease-in-out, width 0.5s ease-in-out;
  margin-top: none;
  min-height: none;
  
  ${media.md`
  z-index: 9;
    min-height: auto;
    height: calc(100% - 6em);
    transition: all .2s ease-in-out, width 0.5s ease-in-out;
   `}

  ${props =>
    props.open &&
    css`
      height: 100%;
      width: 100%;
      position: fixed;
      z-index: 11;
      bottom: 0;
      right: 0;
      transition: all .2s ease-in-out, width 0.5s ease-in-out;
      margin-top: none;
      min-height: none;
      ${props => props.scrollDown === 0 ? css`
      height: calc(100% - 7em);
        ${media.md`
        height: calc(100% - 12em);
        `}
        `: css`
        height: calc(100% - 6em);
        ${media.md`
        height: calc(100% - 9.5em);
        `}
        `}
          ${media.md`
        width: 70%;
        z-index: 9;
        min-height: auto;     
        transition: all .2s ease-in-out, width 0.5s ease-in-out;
        `};
        
      ${media.lg`
      width: ${props => props.width ? props.width : '65%'};
     `};

     `}
    `}


    ${props =>
      props.from == 'bottom' &&
      css`
        left: 0;
        max-height: 0;
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 40;
        bottom: 0;
        transition: all .2s ease-in-out, max-height 0.5s ease-in-out;
        ${props =>
          props.open &&
          css`
            max-height: 100%;
            transition: all .2s ease-in-out, max-height 0.5s ease-in-out;
          `}
          `}


      
  .modal-content {
    position:relative;
    height: 100%;
    width: 100%;
    border-radius: 0;
    pointer-events: auto;
    overflow: auto;
overflow-x: hidden;
    background-color: ${colors.white};
    border: none;
    outline: 0;
        > div {
          &:first-child {
            position: absolute;
            z-index: 1;
            background-color: white;
            transition: all .3s;
            width: 100%;
            height: 100%;
          }

  }

  ${props =>
    props.open &&
    css`
      > div {
        &:first-child {
          position: absolute;
          z-index: -1;
          background-color: none;
          transition: all 0.5s;
          transition-delay: 0.3s;
          width: 100%;
          height: 100%;
        }
      }
    `}
 
  .modal-body {
      background-color: white;
  }

  .modal-footer .next-btn {

  }
 
  .modal-footer {

  }
  
`;

const StyledHeader = styled(Row)`
  border-radius: 0;
  background-color: ${props => colors[props.headerBgColor]};
  z-index: 1;
  position: sticky;
  top: 0;
  padding: 10px 0;
  >div {
    > section {
      opacity: 0;
      transition: all .5s ease-in-out
      display: none;
    }
  }
  ${props => props.open && css`
  >div {
    > section {
      opacity: 1;
      transition: all .5s ease-in-out;
      display: flex;
    }
  }
  `}
`;

const StyledHeaderIcon = styled.span`
padding: 1em 1.5em;
border-right: 0.5px ${colors.white} solid;
  i {
    &:hover {
      &:after {
        display: none;
}
      }
  }

  ${props =>
    props.from == 'bottom' &&
    css`
    i {
        transform: rotate(90deg)
    }
    `}
`;

StyledDrawer.displayName = 'StyledDrawer';

const Drawer = ({
  headerValue,
  width,
  bodyValue,
  from,
  iconcolor,
  headerBgColor,
  open,
  openDrawer,
  header: Header,
  body: Body,
  scrollDown,
}) => (
  <Fragment>
    <StyledBackdrop from={from} open={open} />
    <StyledDrawer scrollDown={scrollDown} from={from} open={open} width={width}>
      <div className="modal-content" open>
        <div />
        <StyledHeader open={open} headerBgColor={headerBgColor} justifycontent="flex-start">
          <StyledHeaderIcon alignitems="center" from={from} padding="5px" flex justifycontent="center">
            <FaIcon
                noShadow
                radius="50%"
              onClick={() => openDrawer(!open)}
              fontSize="f5"
              height="2em"
              width="2em"
              color={iconcolor}
              icon="\f105"
            />
          </StyledHeaderIcon>
          <Column xs="9" xsShift="1"  padding="5px 20px 5px 0px" flex alignitems="center">
            <Header headerValue={headerValue} />
          </Column>
        </StyledHeader>
        <div className="modal-body">
          <Body bodyValue={bodyValue} />
        </div>
      </div>
    </StyledDrawer>
  </Fragment>
);

Drawer.displayName = 'Drawer';
// Drawer.propTypes = DrawerPropTypes;
export default Drawer;

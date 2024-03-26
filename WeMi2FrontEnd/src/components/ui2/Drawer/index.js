/** @format */

import React from "react";
import styled, { css } from "styled-components";
import media from "utils/media-queries";
import { colors, fonts } from "theme";
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';

const StyledBackdrop = styled.div`
  display: none;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  ${media.md`
  height: ${props => props.top ? 'calc(100% - ' + props.top + 'px)' : '100%'};
  `}
  width: 100%;
  top: 0;
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 1440px;

  ${media.md`
    top: ${props => props.top}px;
    z-index: 1000;
  `}

  ${props =>
    props.open &&
    css`
      display: block;
      opacity: 1;
    `}

    ${props =>
    props.animation &&
    css`
    overflow-y: auto;
    overflow-x: hidden;
      aside.drawer {
        right: 0;
      }
    `}
`;

const StyledDrawer = styled.aside`
  float: right;
  min-height: 100%;
  position: relative;
  top: 0;
  right: -100%;
  border: none;
  box-sizing: content-box;
  background-color: ${colors.white};
  width: ${props => props.mobileFullScreen ? '100%' : '90%'};
  transition: right 0.7s ease-in-out 0.1s;

  ${media.md`
    width: ${props => props.width ? props.width : '60%'};
  `}
`;

StyledDrawer.displayName = "StyledDrawer";

const StyledTitle = styled.h2`
    font-size: ${props => fonts.size[props.fontSize]};
    padding-top: 3.5em;
    margin: 0;
    color: ${props => colors[props.color]};
    text-align: center;
    text-transform: uppercase;
`;

const StyledCloseIcon = styled.div`
    float: right;
    position: absolute;
    top: 3em;
    right: 6em;
`;

class Drawer extends React.Component {

  // props = {
  //   title,
  //   hideNavbar,
  //   header: Header,
  //   open,
  //   setOpenModal,
  //   preventClose,
  //   width,
  //   color,
  //   fontSize,
  //   children,
  //   superModal
  // }

  constructor(props) {
    super(props)
    this.state = {
      focusTarget: null,
      navBarHeight: 0,
      screenHeight: 0,
      animation: false,
    }
  }

  // Close when the user click outside the modal
  clickOutside = (t) => {
    if (!this.props.preventClose && t.getAttribute('role') == "none") {
      this.props.setOpenModal(false);
    }
  };

  // Trap the focus within the modal
  resetFocus = (start) => {
    var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    var modal = document.body.querySelector(".drawer-backdrop.open .drawer");
    var focusableElements = modal.childNodes;
    // Convert NodeList to Array
    focusableElements = Array.prototype.slice.call(focusableElements);
    var firstTabStop = focusableElements[0];
    var lastTabStop = focusableElements[focusableElements.length - 1];

    if (start) {
      firstTabStop.focus();
    } else {
      lastTabStop.focus();
    }
  };

  // Detect the esc keyboard press and close the modal
  exitOnEsc = (e) => {
    if (e.keyCode == 27) { // ESC
      this.props.setOpenModal(false);
    }
  }

  // Handle the modal opening / closing
  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      if (this.props.open) {
        // prevent the scroll on the background content
        document.body.style.overflowY = "hidden";
        // save the reference to the previously focused element
        // and get navBar height
        this.setState({
          focusTarget: document.activeElement,
          navBarHeight: document.getElementById("navigation-menu").offsetHeight,
          screenHeight: window.innerHeight,
          animation: true
        });
        // trap the focus inside the modal
        this.resetFocus(1);
      } else {
        // recover the previous context at modal closure
        document.body.style.overflowY = null;
        this.setState({
          focusTarget: null,
          animation: false
        });
        if (this.state.focusTarget) { this.state.focusTarget.focus(); }
      }
    }
  }

  componentWillUnmount() {
    document.body.style.overflowY = null;
  }


  render() {
    const Header = this.props.header;
    return (
      <StyledBackdrop className={"drawer-backdrop" + (this.props.open ? ' open' : null)}
        role="none"
        open={this.props.open}
        animation={this.state.animation}
        onClick={e => { this.clickOutside(e.target) }}
        onKeyUp={e => { this.exitOnEsc(e) }}
        top={this.state.navBarHeight}
      >
        <i tabIndex="0" role="none" className="tabTrapStart" onFocus={e => { this.resetFocus(0) }}></i>
        <StyledDrawer className="drawer"
          role="dialog"
          aria-modal="true"
          open={this.props.open}
          width={this.props.width}>

          <i tabIndex="0" role="none" className="focusStart"></i>

          {
            (this.props.header ?
              <div className="drawer-header">
                <Header />
              </div>
              : null)
          }

          <StyledCloseIcon className="drawer-close">
            <ButtonIcon fontSize={this.props.fontSize} color={this.props.color}
              icon="times"
              label="Chiudi"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                this.props.setOpenModal(false);
              }}
            />
          </StyledCloseIcon>

          <div className="drawer-body">
            {this.props.children}
          </div>

        </StyledDrawer>
        <i tabIndex="0" role="none" className="tabTrapEnd" onFocus={e => { this.resetFocus(1) }}></i>
      </StyledBackdrop>
    );
  }
};

Drawer.displayName = "Drawer";

export default Drawer;
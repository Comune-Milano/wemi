/** @format */

import React from "react";
import styled, { css } from "styled-components";
import media from "utils/media-queries";
import { colors, fonts, spacing } from "theme";
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import { keyCodes } from '../utils/constants/keyCodes';

const StyledBackdrop = styled.div`
  display: none;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  max-width: 1440px;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  position: fixed;
  overflow: auto;
  z-index: 2000;
  transition: opacity 0.5s ease-in-out;

  ${props =>
    props.open &&
    css`
      display: block;
    `}

  ${props =>
    props.animation &&
    css`
      opacity: 1;
    `}
`;

const StyledModal = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  border: none;
  box-sizing: content-box;
  background-color: ${colors.white};
  margin-bottom: ${props => props.mobileFullScreen ? '0px' : '50px'};
  margin-top: ${props => props.mobileFullScreen ? '0px' : (props.marginTop ? props.marginTop : '50px')};
  min-height: ${props => props.mobileFullScreen ? '100%' : (props.minHeight ? props.minHeight : '200px')};
  width: ${props => props.mobileFullScreen ? '100%' : '90%'};

  ${media.md`
    width: ${props => props.width ? props.width : '60%'};
    min-height: ${props => props.minHeight ? props.minHeight : '300px'};
    margin-top: ${props => props.marginTop ? props.marginTop : '0.938rem'};
    margin-bottom: 50px;
  `}
`;

StyledModal.displayName = "StyledModal";

const StyledTitle = styled.h2`
    font-size: ${props => props.fontSize ? fonts.size[props.fontSize] : fonts.size.f6};
    padding-top: ${props => props.paddingTopTitle ? props.paddingTopTitle  : "5em"};
    margin: 0;
    color: ${props => colors[props.color]};
    text-align: center;
    text-transform: uppercase;
     ${props => props.titleLetterSpacing ? `letter-spacing: ${props.titleLetterSpacing}`  : ""};
`;

export const StyledHeader = styled.div`
  background-color: ${colors.greyInput};
  color: ${colors.black};
  box-sizing: border-box;
  padding: 3em ${props => props.mobileFullScreen ? spacing.pagePadding.p1 : '4em'};
  margin: 0;
  width: 100%;

  ${media.md`
    padding: 3em 3em;
  `}
`;

const StyledCloseIcon = styled.div`
  float: right;
  position: absolute;
  top: ${spacing.pagePadding.p1};
  right: ${spacing.pagePadding.p1};

  ${media.md`
    top: ${props => props.positionCloseIcon ? props.positionCloseIcon.md.top : '2em'};
    right: ${props => props.positionCloseIcon ? props.positionCloseIcon.md.right : '2em'};
  `}
`;

const StyledBody = styled.div`
  padding: 1.5em ${props => props.mobileFullScreen ? spacing.pagePadding.p1 : '3em'};
  padding-bottom: 3.5em;

  ${media.xs`
  padding: ${props => props.padding}
  `}
  ${media.md`
    padding: ${props => props.desktopBodyPadding || '3em 3em'};
  `}
 
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);

    const { open } = props;
    this.state = {
      focusTarget: open ? document.activeElement : null,
      animation: open,
    };
    this.resetFocus = this.resetFocus.bind(this);
    this.exitOnEsc = this.exitOnEsc.bind(this);
  }

  // Trap the focus within the modal
  resetFocus = (start) => {
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    const modal = document.body.querySelector(".modal-backdrop.open .modal");
    let focusableElements = modal.childNodes;
    // Convert NodeList to Array
    focusableElements = Array.prototype.slice.call(focusableElements);
    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];
    if (start) {
      firstTabStop.focus();
    } else {
      lastTabStop.focus();
    }
  };

  // Detect the esc keyboard press and close the modal
  exitOnEsc = (e) => {
    if (e.keyCode == keyCodes.ESC) { // ESC
      this.props.setOpenModal(false);
    }
  }

  /**
   * Handle the modal opening at startup.
   */
  componentDidMount() {
    const { open } = this.props;
    if (open) {
      // prevent the scroll on the background content
      document.body.style.overflowY = 'hidden';
      // trap the focus inside the modal
      this.resetFocus(1);
    }

    // When clicking "esc" we want to always close the modal.
    document.addEventListener('keyup', this.exitOnEsc.bind(this), false);
  }

  // Handle the modal opening / closing
  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      if (this.props.open) {
        // prevent the scroll on the background content
        document.body.style.overflowY = "hidden";
        // save the reference to the previously focused element
        this.setState({
          focusTarget: document.activeElement,
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
        if (this.props.focusTarget) { this.props.focusTarget.focus(); }
        else if (this.state.focusTarget) { this.state.focusTarget.focus(); }
      }
    }
  }

  // Resets the overflow-y of document body and remove pending listeners.
  componentWillUnmount() {
    document.body.style.overflowY = null;
    document.removeEventListener('keyup', this.exitOnEsc.bind(this), false);
  }

  render() {
    const Header = this.props.header;
    return (
      <StyledBackdrop className={"modal-backdrop" + (this.props.open ? ' open' : null)}
        role="none"
        open={this.props.open}
        animation={this.state.animation}
      >
        <i
          tabIndex="0"
          role="none"
          className="tabTrapStart"
          onFocus={e => { this.resetFocus(0) }}
        ></i>
        <StyledModal className="modal"
          role="dialog"
          aria-modal="true"
          //aria-busy={this.props.loading}
          marginTop={this.props.marginTop}
          minHeight={this.props.minHeight}
          open={this.props.open}
          width={this.props.width}
          marginTop={this.props.marginTop}
          mobileFullScreen={this.props.mobileFullScreen}>

          <i
            tabIndex="0"
            role="none"
            className="focusStart"
          ></i>
          {
            this.props.customModal ?
              <Header className="modal-header" /> :
              (this.props.title ? (
                <StyledTitle
                  titleLetterSpacing={this.props.titleLetterSpacing}
                  fontSize={this.props.fontSize}
                  color={this.props.color}
                  paddingTopTitle={this.props.paddingTopTitle}
                  className="modal-header"
                >
                  {this.props.title}
                </StyledTitle>
              ) : null)
          }

          <StyledCloseIcon 
            className="modal-close"
            mobileFullScreen={this.props.mobileFullScreen}
            positionCloseIcon={this.props.positionCloseIcon}
          >
            <ButtonIcon
              fontSize={this.props.fontSize}
              color={this.props.color}
              icon="times"
              label="Chiudi" 
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                this.props.setOpenModal(false);
              }}
            />
          </StyledCloseIcon>

          <StyledBody
            className="modal-body"
            noMobilePadding={this.props.noMobilePadding}
            padding={this.props.padding}
            desktopBodyPadding={this.props.desktopBodyPadding}
            mobileFullScreen={this.props.mobileFullScreen}
          >
            {this.props.children}
          </StyledBody>

        </StyledModal>
        <i
          tabIndex="0"
          role="none"
          className="tabTrapEnd"
          onFocus={e => { this.resetFocus(1) }}
        ></i>
      </StyledBackdrop>
    );
  }
};

Modal.displayName = "Modal";

export default Modal;
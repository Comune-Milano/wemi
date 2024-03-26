/** @format */

import React, { Fragment } from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import FaIcon from 'components/ui/FaIcon';

const StyledBackdrop = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  transition: opacity 0.15s linear;
`;

const StyledModal = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  outline: 0;
  > div {
    margin: auto;
    height: auto;
    transform: ${props => (props.open ? 'none' : 'translate(0,50px)')};
    transition: transform 0.3s ease-out;
  }
  .div-icon-container {
    position: relative;
    z-index: 1000;
  }
  .div-icon {
    position: absolute;
    right: 2rem;
    top: -1rem;
  }
  .icon-closure {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .modal-content {
    margin: auto;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    border-radius: 0;
    opacity: 1;
    padding-top: 1em;
    height: auto;
    position: relative;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #ffffff;
    border-radius: 0.3rem;
    outline: 0;
    border-radius: 0;
    border: 15px solid red;
    ${media.sm`
    width: 80%
  
    `};
    ${media.lg`
    width: 90%
    `};
  }
  .modal-header {
    border: none;
    position: relative;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: flex-start;
    align-items: flex-start;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    margin: 0;
    border-bottom: 1px solid #dee2e6;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }
  .modal-body {
    margin: 0;
    position: relative;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
  }

  .modal-footer .next-btn {
    position: absolute;
    bottom: -1.8rem;
  }
  .modal-header {
    border: 0;
  }
  .modal-footer {
    border: 0;
  }
`;

const MyIcon = styled(FaIcon)`
  font-size: x-large;
  &:hover {
  box-shadow: 0!important;
  }
`;

StyledModal.displayName = 'StyledModal';

const Modal = ({ bodyvalue, open, content: Body, openModal }) => (
  <Fragment>
    {open ? (
      <Fragment>
        <StyledBackdrop />
        <StyledModal>
          <div>
            <div className="modal-content" open>
              <div className="div-icon-container">
                <div role="button" className="div-icon">
                  <MyIcon
                    noShadow
                    onClick={() => openModal(!open)}
                    modalcrossbtn
                    fontSize="x-large"
                    color="red"
                    icon="\f00d"
                  />
                </div>
              </div>
              <div className="modal-body">
                <Body bodyvalue={bodyvalue} />
              </div>
            </div>
          </div>
        </StyledModal>
      </Fragment>
    ) : null}
  </Fragment>
);

Modal.displayName = 'Modal';

export default Modal;

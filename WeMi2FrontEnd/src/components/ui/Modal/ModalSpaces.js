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
  width: 100%;
  height: 100%;
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
    padding: 2rem 3rem;
    transform: ${props => (props.open ? 'none' : 'translate(0,50px)')};
    transition: transform 0.3s ease-out;
  }
  .div-icon-container {
    position: relative;
    z-index: 1000;
  }
  .div-icon {
    position: absolute;
    right: -5.5rem;
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
    border-radius: 1.125rem;
    opacity: 1;
    height: auto;
    padding: 1rem 2rem;
    position: relative;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    width: 90%;
    pointer-events: auto;
    background-color: #ffffff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
    border-radius: 15px;
    border: 1px solid #0099ab;
    ${media.sm`
    width: 80%
  
    `};
    ${media.lg`
    width: 60%
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
    padding: 1rem 1rem;
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
    padding: 1rem 0 0;
  }

  .modal-footer .next-btn {
    position: absolute;
    bottom: -1.8rem;
  }
  .modal-header {
    border: 0;
    padding: 0;
  }
  .modal-footer {
    border: 0;
    padding: 0;
  }
`;

StyledModal.displayName = 'StyledModal';

const Modal = ({
  headervalue,
  bodyvalue,
  iconcolor,
  open,
  content: Body,
  openModal,
  header: Header,
}) => (
  <Fragment>
    {open ? (
      <Fragment>
        <StyledBackdrop />
        <StyledModal>
          <div>
            <div className="modal-content" open>
              <div className="div-icon-container">
                <div role="button" className="div-icon">
                  <FaIcon
                    onClick={() => openModal(!open)}
                    modalcirclebtn
                    className="icon-closure"
                    fontSize="icon"
                    color={iconcolor}
                    icon="\f111"
                  >
                    <FaIcon
                      onClick={() => openModal(!open)}
                      modalcrossbtn
                      fontSize="iconnested"
                      color="white"
                      icon="\f00d"
                    />
                  </FaIcon>
                </div>
              </div>
              <div className="modal-header">
                <Header headervalue={headervalue} />
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

/** @format */

import React, { Fragment } from 'react';
import styled, {css} from 'styled-components';
import media from 'utils/media-queries';
import FaIcon from 'components/ui/FaIcon';

const StyledBackdrop = styled.div`
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  visibility: hidden;
  width: 100%;
  height: 100%;
  transition: opacity 0.15s linear;
  ${props => props.open && css`
  z-index: 8;
  visibility: visible;
  transition: all .2s ease-in-out;
  `}
`;

const StyledModal = styled.div`
  position: absolute;
  z-index: -2;
  height: auto;
  width: 320px; 
   
  transform: scale(0,0);
  border-radius: 50%;
  outline: 0;
  top: 0.5rem;
  right: 10%;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  opacity: 1;
  display: flex;
  border: 0;
  background-color: #ffffff;
  outline: 0;
  transition: all .2s linear;
  ${media.md`
  right: 10%;
  top: ${props => props.gestioneContenuti? '10.5rem' : '0.5rem'};
  width: 23em; 
  `}
  ${media.lg`
  right: 40%;
  top: ${props => props.gestioneContenuti? '10.5rem' : '0.5rem'};
  width: 23em; 
  `}
${props => props.open && css`
z-index: 9;
  border: 1px solid #0099ab;
  transform: scale(1,1);
  visibility: visible;
  border-radius: 15px;
  transition: border-radius .5s linear, transform .5s ease-in-out;

  `}
  
> div {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1.5rem 2rem 3.5em;

  i {
    position: absolute;
    z-index: 9;
    &:hover {
      transform: scale(1.05,1.05)
    }
    &:first-child {
      right: -2.5rem;
  
    }
    &:nth-child(2) {
      bottom: -2rem;
      left: 40%;
    }
  
  }
}

  .modal-body {
    margin: 0;
    position: relative;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
  }

`;

StyledModal.displayName = 'StyledModal';

const Modal = ({
children,
  iconcolor,
  changeValue,
  value,
  valueMax,
  open,
  content: Body,
  openModal,
  iconBgColor,
  iconBgColor2,
  iconRadius,
  gestioneContenuti
}) => (
  <Fragment>
      <Fragment>
        <StyledBackdrop open={open}   onClick={() => openModal(!open)} />
        <StyledModal open={open}  onClick={(event) => event.stopPropagation} gestioneContenuti={gestioneContenuti} >
                       
          <div>
          <FaIcon
                  onClick={() => openModal(!open)}
                  fontSize="f2"
                  height="3em"
                  width="3em"
                  radius={iconRadius}
                  color={iconcolor}
                  bgcolor={iconBgColor}
                  icon="\f00d"
                />
           <FaIcon
                  onClick={() => {
                    if (value < valueMax-1) {
                    changeValue(value + 1)}
                    else changeValue(0)
                  }}
                  fontSize="f2"
                  height="2.5em"
                  width="2.5em"
                  radius={iconRadius}
                  color={iconcolor}
                  bgcolor={iconBgColor2}
                  icon="\f107"
                />
            
             
              <div className="modal-body">
                  {children}
                </div>
      
          </div>
        </StyledModal>
      </Fragment>
  </Fragment>
);

Modal.displayName = 'Modal';

export default Modal;

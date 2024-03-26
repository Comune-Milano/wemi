/** @format */

import React, { Fragment, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import media from "utils/media-queries";
import { colors } from "theme";
import { Row, Column } from "components/ui/Grid";
import FaIcon from "components/ui/FaIcon";

const StyledBackdrop = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  display: none;
  opacity: 0.5;
  height: 100%;
  width: 100%;
  visibility: hidden;
  top: 0;
  left: 0;
  position: fixed;
  z-index: -10;
  cursor: ${props => props.pointer ? 'pointer' : 'default'};
  transition: visibility 0.3s ease-in-out;

  ${props =>
    props.open &&
    css`
      display: block;
      background-color: ${({ theme }) => theme.colors.black};
      opacity: 0.5;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      visibility: visible;
      position: fixed;
      z-index: ${props => props.errorModal ? '9998' : '30'};
      transition: visibility 0.3s ease-in-out;
    `}
`;

const StyledModal = styled.div`
  overflow: ${props => props.noHiddenOver ? 'visible' : 'hidden'};
  cursor: default;
  opacity: 0;
  margin: auto;
  position: fixed;
  border: ${props => props.border};
  border-radius: ${props => props.radius};
  box-sizing: content-box;
  z-index: ${props => props.errorModal ? '9999' : '-20'};
  top: 0;
  width: calc(${props => props.width}* ${props => props.responsiveWidth});
  left: calc((100% - ${props => props.width}* ${props => props.responsiveWidth}) / 2);
  margin-top: ${props => props.closedMargin ? props.closedMargin : '-600px'};
  min-height: none;
  maxheight: ${props => props.maxHeight};
  transition: all 0.5s  linear, opacity 0.4s ease-in-out;

  ${media.md`
  margin-top: ${props => props.closedMargin ? props.closedMargin : '-600px'};
  z-index: ${props => props.errorModal ? '9999' : '-20'};
    min-height: auto;

  width: ${props => props.width};
  left: calc((100% - ${props => props.width})/2);
  transition: all 0.5s linear, opacity 0.4s ease-in-out;
    `}

  ${props =>
    props.open &&
    css`
      background-color: ${colors.white};
      opacity: 1;
      height: ${props => (props.maxHeight ? props.maxHeight : "auto")};
      width: calc(${props => props.width}* ${props => props.responsiveWidth});
      left: calc((100% - ${props => props.width}* ${props => props.responsiveWidth}) / 2);
      position: fixed;
      z-index: ${props => props.errorModal ? '9999' : '31'};
      top: 0;
      margin: auto;
      min-height: 0;
      margin-top: ${props => props.marginTop};
      transition: all 0.6s ease-in-out;

      ${media.md`
      width: ${props => props.width};
      left: calc((100% - ${props => props.width})/2);
      z-index: ${props => props.errorModal ? '9999' : '31'};
      margin-top: ${props => props.marginTop};
      min-height: auto;
      height: ${props => (props.maxHeight ? props.maxHeight : "auto")};
      transition: all 0.6s ease-in-out;
  `};
    `}
`;

StyledModal.displayName = "StyledModal";

const StyledHeader = styled(Row)`
  border-radius: 0;
  background-color: ${props => colors[props.headerBgColor]};
  position: sticky;
  top: 0;
  padding: 10px 0;
    ${props =>
      props.open &&
      css`
        display: block;
      `};
`;

const StyledHeaderIcon = styled(Column)`

`;


const print = (simulazione,key) => {
  let string = `
  <div style="font-weight: bold;font-size: 1.5em;padding: 1em 0;color: ${colors.blue}">
      ${key}
  </div>`

  Object.keys(simulazione).map((elemento,index) => {
    string = string + `
      <div style="display:flex; align-items:center; justify-content: space-between;">
         ${simulazione[elemento].value ?
          simulazione[elemento].name ?`<span style="color: ${colors.primary}; font-weight: bold; text-transform: uppercase">
          ${simulazione[elemento].name.replace('${servizio}', 'colf')} (${index+1})
      </span>
      <span>
      ${typeof simulazione[elemento].value !== 'string' ? simulazione[elemento].value.toFixed(2) : simulazione[elemento].value}           
  </span>

      `: `<span style="color: ${colors.primary}; font-weight: bold; text-transform: uppercase">${elemento} (${index+1})</span>
      
      <span>
      ${typeof simulazione[elemento].value !== 'string' ? simulazione[elemento].value.toFixed(2) : simulazione[elemento].value}           
  </span>
  `
          : ``}
      </div>
      `
         });
         string= string+'<div style="padding: 1em 0">'
         Object.keys(simulazione).map((elemento,index) => {
           if(simulazione[elemento].description){
          string = string + `<span style="font-size:0.6em; padding: 0 1em 0 0">(${index+1}) ${simulazione[elemento].description}</span>`
           }
           else{
             return null;
           } 
        });
         string= string+'</div>'
  return string;
}

const Modal = ({
  headerValue,
  iconcolor,
  headerBgColor,
  open,
  width,
  responsiveWidth,
  border,
  radius,
  marginTop,
  openModal,
  header: Header,
  noHeader,
  headerHeight,
  children,
  maxHeight,
  minHeight,
  bgcolorIcon,
  printBgcolorIcon,
  printIconColor,
  printElements,
  iconRadius,
  iconHeight,
  iconWidth,
  disabledIcon,
  noShadowIcon,
  noBackdropClose,
  printIcon,
  noHiddenOver,
  closedMargin,
  errorModal,
}) => {
  const [update, setUpdate] = useState(false);


  useEffect(() => {
    if (update !== printElements) {
      setUpdate(printElements);
    }
  }, [printElements, open]);

return(
    <Fragment>
      <StyledBackdrop open={open} pointer={!noBackdropClose} onClick={(event) => {!noBackdropClose && openModal(!open)}} errorModal={errorModal} />
       <StyledModal 
       noHiddenOver={noHiddenOver}
       closedMargin={closedMargin}
       maxHeight={maxHeight}
       maxHeight={minHeight}
       border={border} responsiveWidth={responsiveWidth} radius={radius} open={open} width={width} marginTop={marginTop} errorModal={errorModal}>
         <StyledHeader open={open} headerHeight={headerHeight} headerBgColor={headerBgColor} justifycontent="flex-start">
        <Row fluid>
        <Column xs="9" md="10" padding="1em 2em 1em 3em" flex alignitems="center">
         {!noHeader && open ?  <Header headerValue={headerValue} /> : null}

        </Column>
          <StyledHeaderIcon xs="3" md="2" padding="1em 3em 1em 2em" justifycontent="center">
           {disabledIcon ? null 
            : <Row fluid justifycontent={printIcon ? "space-between" : 'flex-end'}>
                        {
             printIcon ? 
             <FaIcon
             noShadow={noShadowIcon}
             disabled
             cursor="pointer"
               fontSize="f5"
               color={printIconColor}
               bgcolor={printBgcolorIcon}
               radius={iconRadius}
               height={iconHeight}
               width={iconWidth}
               icon="\f02f"
             onClick={ () => {
              let pri = document.getElementById("ifmcontentstoprint").contentWindow;
              pri.document.open();
              pri.document.write();
              pri.document.write('<html><style> @page  {size: auto;  margin: 25mm 15mm 25mm 15mm;} div {max-height: none!important; height: auto!important; overflow: visible!important}  hr {color: #058592!important; border-color: #058592!important;}</style><body style="margin: 0; font-size: 1rem; font-weight: normal; font-family: MontSerrat, Arial, Arial, Helvetica, sans-serif; line-height: 1.5; color: #333; background-color: #fff; z-index: 0">',
              printElements ? printElements.map(el => {if(document.getElementById(el)) return `${document.getElementById(el).innerHTML}`}) : '',
              '</body></html>');
              pri.document.close();
              pri.focus();
              pri.print();
             }}
           /> 
           :     null}
            <FaIcon
            noShadow={noShadowIcon}
              onClick={(event) => { openModal.bind(this); openModal(!open); event.preventDefault(); event.stopPropagation() }}
              fontSize="f5"
              color={iconcolor}
              bgcolor={bgcolorIcon}
              radius={iconRadius}
              height={iconHeight}
              width={iconWidth}
              icon="\f00d"
            /> </Row>
          }
        </StyledHeaderIcon>
   
        </Row>
      </StyledHeader>
      <div className="modal-body" style={{padding:"0 3em"}}>{open ? children : null}</div>
    </StyledModal>
  </Fragment>
)
};

Modal.displayName = "Modal";

export default Modal;

/** @format */
import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import FaIcon from 'components/ui/FaIcon';
// import AccordionPropTypes from "./propTypes";
import { colors } from 'theme';

const StyledAccordion = styled.div`
${props =>
  props.open
    ? css`
    border-radius: 5px !important;
    > div {
      &:first-child {
        border-radius: 5px 5px 0 0;
        background-color: ${props => colors[props.headerBgColorOpen]};
        color: ${props => colors[props.headerColorOpen]};
        transition: all 0.5s ease;
      }
      &:nth-child(2) {
        height: auto;
        border-radius: 0 0 5px 5px;
        overflow: visible;
        max-height: ${props => props.maxHeight ? props.maxHeight : 'auto'};
        border: ${props => colors[props.bodyBorderOpen]};
        transition: max-height 0.7s ease-in-out;
      }
    }


    ` : css`
    > div {
      &:first-child {
          border-radius: 5px; 
          background-color: ${props => colors[props.headerBgColor]};
        color: ${props => colors[props.headerColor]};
          transition: all .5s ease, border-radius .4s linear;

      }
  &:nth-child(2) {
      height: auto;
      border-radius: 0 0 5px 5px;
      overflow: hidden;
      max-height: 0;
      border: ${props => colors[props.bodyBorderOpen]};
      transition: all .5s ease-in-out;
    
  }
    }
  `}

  ${props =>
    props.wemi &&
    css`
      ${props =>
        props.open
          ? css`
              border-radius: 5px !important;
              > div {
                &:first-child {
                  border-radius: 5px 5px 0 0;
                  background-color: ${({ theme }) => theme.colors.primary};
                  color: ${({ theme }) => theme.colors.white};
                  transition: all 0.5s ease;
                }
                &:nth-child(2) {
                  height: auto;
                  border-radius: 0 0 5px 5px;
                  // overflow: hidden;
                  // max-height: 500px;
                  border: 1px solid ${({ theme }) => theme.colors.primary};
                  transition: max-height 0.7s ease-in-out;
                }
              }
            `
          : css`
   
    > div {
            &:first-child {
                border-radius: 5px; 
                background-color: ${({ theme }) => theme.colors.grey};
                color: ${({ theme }) => theme.colors.primary};
                transition: all .5s ease, border-radius .4s linear;

            }
        &:nth-child(2) {
            height: auto;
            border-radius: 0 0 5px 5px;
            // overflow: hidden;
            max-height: 0;
            border: 0px solid ${({ theme }) => theme.colors.primary};
            transition: all .5s ease-in-out;
          
        }
      }
    `}
  `}
`;

StyledAccordion.displayName = 'StyledAccordion';

const StyledAccordionHeader = styled.div`
  border-radius: 5px 5px 0 0;
  ${props =>
    props.wemi &&
    css`
  padding: 0.75rem 1.25rem;
  i {
    &:hover {
      &:after {
        content: "";
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 1;
        background-color: ${colors.white}
        opacity: 0;
        border-radius: ${props => props.radius};
      }
    }      
  }
  `}
  padding: ${props => props.headerPadding};
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  cursor: pointer;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center;
  i {
    &:hover {
      &:after {
        content: "";
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 1;
        background-color: ${colors.white};
        opacity: 0;
        border-radius: ${props => props.radius};
      }
    }      
  }
`;
StyledAccordionHeader.displayName = 'StyledAccordionHeader';

const Accordion = ({
  AccordionHeader: AccordionHeaderContent,
  AccordionBody: AccordionBodyContent,
  headerBgColorOpen,
  headerBgColor,
  headerColorOpen,
  headerColor,
  arrowOpenColor,
  arrowClosedColor,
  arrowSize,
  headerPadding,
  children,
  aperto,
  maxHeight,
  ...rest
}) => {
  const [open, setOpen] = useState(aperto);

  return (
    <StyledAccordion
      headerBgColorOpen={headerBgColorOpen}
      headerColorOpen={headerColorOpen}
      headerBgColor={headerBgColor}
      headerColor={headerColor}
      maxHeight={maxHeight}
      {...rest}
      open={open}
    >
      <StyledAccordionHeader {...rest} headerPadding={headerPadding} onClick={() => setOpen(!open)}>
        <AccordionHeaderContent />
        <FaIcon
          noShadow
          arrow={open}
          icon="\f107"
          fontSize={arrowSize}
          color={open ? arrowOpenColor : arrowClosedColor}
        />
      </StyledAccordionHeader>
      <div>
        {children || <AccordionBodyContent /> }
      </div>
    </StyledAccordion>
  );
};
Accordion.displayName = 'Accordion';
// Accordion.propTypes = AccordionPropTypes;
export default Accordion;

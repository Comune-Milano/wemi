/** @format */
import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import FaIcon from 'components/ui/FaIcon';

const StyledAccordion = styled.div`
  ${props =>
    props.wemi && props.open === true
      ? css`
          > div {
            &:first-child {
              // padding-top: 1.5em;
              background-color: transparent;
              color: grey;
              // transition: all 0.5s ease;
            }
            &:nth-child(2) {
              height: auto;
              overflow: hidden;
              max-height: none;
              // border: 1px solid ${({ theme }) => theme.colors.primary};
              transition: max-height 0.7s ease-in-out;
            }
          }
        `
      : css`
   
    > div {
            &:first-child {
                border-radius: 5px; 
                // background-color: ${({ theme }) => theme.colors.grey};
                color: grey;
                transition: all .5s ease, border-radius .4s linear;

            }
        &: nth-child(2) {
            height: auto;
            border-radius: 0 0 5px 5px;
            overflow: hidden;
            max-height: 0;
            border: 0px solid ${({ theme }) => theme.colors.primary};
            transition: all .5s ease-in-out;
          
        }`}
`;

StyledAccordion.displayName = 'StyledAccordion';

const StyledAccordionHeader = styled.div`
  margin-bottom: 0;
  // background-color: rgba(0, 0, 0, 0.03);
  cursor: pointer;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center;
`;
StyledAccordionHeader.displayName = 'StyledAccordionHeader';

export const AccordionHeaderContent = styled.div``;
AccordionHeaderContent.displayName = 'AccordionHeaderContent';

const Accordion = ({
  AccordionHeader: AccordionHeaderContent,
  AccordionBody: AccordionBodyContent,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledAccordion {...rest} open={open}>
      <StyledAccordionHeader onClick={() => setOpen(!open)}>
        <AccordionHeaderContent />
        <FaIcon arrow={open} icon="\f107" fontSize="f4" color={open ? 'primary' : 'primary'} />
      </StyledAccordionHeader>
      <div>
        <AccordionBodyContent />
      </div>
    </StyledAccordion>
  );
};
Accordion.displayName = 'Accordion';

export default Accordion;

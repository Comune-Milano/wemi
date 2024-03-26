/** @format */
import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import FaIcon from 'components/ui/FaIcon';

const StyledAccordion = styled.div`
  ${props =>
        props.wemi && props.open === true
            ? css`
          border-radius: 5px !important;
          width: 8em;
          padding:0.
          
          > div {
            &:first-child {
              border-radius: 5px 5px 0 0;
              background-color: ${({ theme }) => theme.colors.grey};
              color: ${({ theme }) => theme.colors.primary};
              transition: all 0.5s ease;
      
            }
            &:nth-child(2) {
              height: auto;
              border-radius: 0 0 5px 5px;
              overflow: hidden;
              max-height: 500px;
              border: 1px solid ${({ theme }) => theme.colors.grey};
              transition: max-height 0.7s ease-in-out;
            }
          }
        `
            : css`
            width: 8em;
           
   
    > div {
            &:first-child {
                border-radius: 5px; 
                background-color: transparent;
                color: ${({ theme }) => theme.colors.primary};
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
  border-radius: 5px 5px 0 0;
  padding: 0.2rem 0.5rem;

  cursor: pointer;
  display: flex !important;
  justify-content: center;
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
        <FaIcon arrow={open} icon="\f107" fontSize="f4" color={open ? 'white' : 'primary'} />
      </StyledAccordionHeader>
      <div>
        <AccordionBodyContent />
      </div>
    </StyledAccordion>
  );
};
Accordion.displayName = 'Accordion';

export default Accordion;

/** @format */
import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import FaIcon from 'components/ui/FaIcon';

const StyledAccordion = styled.div`
  ${props =>
    props.wemi && props.open === true
      ? css`
          border-radius: 5px !important;
          > div {
            &:first-child {
              border-radius: 5px 5px 0 0;
              background-color: ${({ theme }) => theme.colors.blue};
              color: ${({ theme }) => theme.colors.white};
              transition: all 0.5s ease;
            }
            &:nth-child(2) {
              height: 100;
              border-radius: 0 0 5px 5px;
              overflow: hidden;
              //max-height: 500px;
              border: 1px solid ${({ theme }) => theme.colors.blue};

              transition: max-height 0.7s ease-in-out;
            }
          }
        `
      : css`

    > div {
            &:first-child {
                border-radius: 5px; 
                background-color: ${({ theme }) => theme.colors.grey} ;
                color: ${({ theme }) => theme.colors.blue};
                transition: all .5s ease, border-radius .4s linear;

            }
        &: nth-child(2) {
            height: auto;
            border-radius: 0 0 5px 5px;
            overflow: hidden;
            max-height: 0;
            border: 0px solid ${({ theme }) => theme.colors.blue};
            transition: all .5s ease-in-out;

        }`}
`;

StyledAccordion.displayName = 'StyledAccordion';

const StyledAccordionHeader = styled.div`
  border-radius: 5px 5px 0 0;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
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
  Children: Children,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledAccordion {...rest} open={open}>
      <StyledAccordionHeader onClick={() => setOpen(!open)}>
        <AccordionHeaderContent />
        <FaIcon noShadow={true} arrow={open} icon="\f107" fontSize="f4" color={open ? 'white' : 'blue'} />
      </StyledAccordionHeader>
      <div>
  {Children ? Children : <AccordionBodyContent /> }
      </div>
    </StyledAccordion>
  );
};
Accordion.displayName = 'Accordion';

export default Accordion;
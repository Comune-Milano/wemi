import React from 'react';

import Accordion from 'components/ui/Accordion';
import Text from 'components/ui/Text';

import AccordionBodyWrapper from './AccordionBodyWrapper';

const SectionWrapper = ({
  title,
  children,
}) => (
  <Accordion
    headerBgColorOpen="blue"
    headerBgColor="grey"
    maxHeight="none"
    headerColorOpen="white"
    headerColor="blue"
    arrowOpenColor="white"
    arrowClosedColor="blue"
    arrowSize="f1"
    headerPadding="0.75rem 1.25rem"
    aperto={false}
    AccordionHeader={() => (<Text weight="bold" value={title} intlFormatter size="f4" />)}
  >
    <AccordionBodyWrapper padding="20px">
      {children}
    </AccordionBodyWrapper>
  </Accordion>
);

SectionWrapper.displayName = 'Wrapper per la singola sezione';

export default SectionWrapper;

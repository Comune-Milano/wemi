import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Label from 'components/ui/Label';
// import FaIcon from 'components/ui/FaIcon';
// import Tooltip from 'components/ui/Tooltip';
// import Text from 'components/ui/Text';
// import Accordion from 'components/ui/Accordion';
// import styled from 'styled-components';
// import { AccordionBodyWrapper } from '../../../AccordionServAccr/partials';
import { PreventivoContenuto } from './';

const Preventivo = ({ items }) => (
  <Column xs="12" padding="0" >
    <Row>
      <Label value='Ipotesi di preventivo spesa per assistenza familiare' 
       weight="bold"
       transform="uppercase"
       intlFormatter
       color="primary"
       bgcolor="grey"
       size="f7"
       display="flex" />
    </Row>
    <Column margin="1em 0" padding="0">
    <PreventivoContenuto items={items} />
    </Column>
  </Column>

);
Preventivo.displayName = 'Preventivo';
export default Preventivo;
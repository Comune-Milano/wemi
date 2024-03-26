import React from 'react';

import { Accordion } from '../common/components';
import Body from './AccordionBody';


const Servizio = ({ Form, SetForm, Modifica }) => (
  <Accordion
    titolo="Servizio"
    Body={Body}
    Form={Form}
    SetForm={SetForm}
    Modifica={Modifica}
  >
  </Accordion>
    );

Servizio.displayName = 'Accordion Servizio';

export default Servizio;

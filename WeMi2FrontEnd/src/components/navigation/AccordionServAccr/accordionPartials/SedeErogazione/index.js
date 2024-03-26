import React from 'react';

import { Accordion } from '../common/components';
import Body from './AccordionBody';


const SedeErogazione = ({ Form, SetForm, Modifica }) => (
  <Accordion
    titolo="Sede di erogazione del servizio"
    Body={Body}
    Form={Form}
    SetForm={SetForm}
    Modifica={Modifica}
  >
  </Accordion>
    );

SedeErogazione.displayName = 'Accordion Sede Erogazione';

export default SedeErogazione;

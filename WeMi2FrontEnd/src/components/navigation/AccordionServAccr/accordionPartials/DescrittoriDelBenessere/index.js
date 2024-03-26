import React from 'react';
import { Accordion } from '../common/components';
import Body from './AccordionBody';


const DescrittoriDelBenessere = ({ Form, SetForm, Modifica }) => (
  <Accordion
    titolo="Dimensione del benessere"
    Body={Body}
    SetForm={SetForm}
    Form={Form}
    Modifica={Modifica}
  />
);

DescrittoriDelBenessere.displayName = 'Accordion Dimensione Del Benessere';

export default DescrittoriDelBenessere;

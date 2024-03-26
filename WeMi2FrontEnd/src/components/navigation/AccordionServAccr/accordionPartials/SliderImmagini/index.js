import React from 'react';
import { Accordion } from '../common/components';
import Body from './AccordionBody';


const SliderImmagini = ({ Form, SetForm, Modifica }) => (
  <Accordion
    titolo="Slider immagini"
    nearTitle="(Dimensione immagine consiglita 2880x880)"
    Body={Body}
    SetForm={SetForm}
    Form={Form}
    Modifica={Modifica}
  />
);

SliderImmagini.displayName = 'Accordion Slider immagini';

export default SliderImmagini;

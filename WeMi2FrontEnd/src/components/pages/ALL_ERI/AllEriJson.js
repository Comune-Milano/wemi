/** @format */

import React from 'react';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import Accordion from './partials/Accordion';

const TextAccordion = styled(Text)`
  text-align: center;
  margin-right: auto;
  margin-left: auto;
`;

export const AllEriJson = {
  Colonne: [
    'Data Richiesta',
    'Data Servizio',
    'Tipologia Servizio',
    'Stato',
    'Beneficiaro',
    'Visualizza',
  ],
  Righe: [
    {
      dataRichiesta: '1/01/2017',
      dataServizio: '1/12/2017',
      tipologiaServizio: 'colf',
      status: 'completato',
      beneficiario: 'cittadino',
      accordion: (
        <Accordion
          wemi
          AccordionHeader={() => <TextAccordion value="Visualizza" intlFormatter />}
          AccordionBody={() => <div>Ciao</div>}
        />
      ),
    },
    {
      dataRichiesta: '1/01/2017',
      dataServizio: '1/12/2017',
      tipologiaServizio: 'colf',
      status: 'completato',
      beneficiario: 'cittadino',
      accordion: (
        <Accordion
          wemi
          AccordionHeader={() => <TextAccordion value="Visualizza" intlFormatter />}
          AccordionBody={() => <Text value="Ciao" intlFormatter />}
        />
      ),
    },
    {
      dataRichiesta: '1/01/2017',
      dataServizio: '1/12/2017',
      tipologiaServizio: 'colf',
      status: 'completato',
      beneficiario: 'cittadino',
      accordion: (
        <Accordion
          wemi
          AccordionHeader={() => <TextAccordion value="Visualizza" intlFormatter />}
          AccordionBody={() => <Text value="Ciao" intlFormatter />}
        />
      ),
    },
  ],
};

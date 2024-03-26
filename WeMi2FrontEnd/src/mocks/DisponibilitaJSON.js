/** @format */
// non cambiare nome a "Colonne" e "Righe".
// non mmodificare struttura del JSON

import React from 'react';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import MenuItem from 'components/pages/GestioneDisp/partials/MenuItem';
import Accordion from 'components/pages/GestioneDisp/partials/Accordion';
import { Row } from 'hedron';
import { dropdownlist } from 'mocks/Listabutton';

const TextList = styled(Text)`
color: black;
&: hover{
  color: #0099ab;
}
`;

export const GestDispJSON = {
  Colonne: ['Richiesta Del', 'Tipologia del servizio', 'Data Servizio', 'Orario', 'Municipio', 'Stato Richiesta', 'Beneficiaro', 'Visualizza'],
  Righe: [
    {
      Richiestadel: '1/01/2017',
      tipologiadelServizio: 'colf',
      dataServizio: '1/12/2017',
      orario: 'nel pomeriggio',
      municipio: '1',
      statorichiesta: 'pagata',
      beneficiario: 'Ilaria Pierandrei',
      visualizza:
  <Accordion
    wemi
    AccordionHeader={() => ('')}
    AccordionBody={() => (
      <Row>
        {dropdownlist.lista.map(element => (
          <MenuItem dropdownItem>
            <TextList value={element.ele} intlFormatter weight="normal" />
          </MenuItem>
                            ))}
      </Row>
                    )}
  />,
    },
    {
      Richiestadel: '1/01/2018',
      tipologiadelServizio: 'colf',
      dataServizio: '1/12/2018',
      orario: 'nel pomeriggio',
      municipio: '2',
      statorichiesta: 'approvata',
      beneficiario: 'Ilaria Pierandrei',
      visualizza:
  <Accordion
    wemi
    AccordionHeader={() => ('')}
    AccordionBody={() => (
      <Row>
        {dropdownlist.lista.map(element => (
          <MenuItem dropdownItem>
            <TextList value={element.ele} intlFormatter weight="normal" />
          </MenuItem>
                            ))}
      </Row>
                    )}
  />,
    },

    {
      Richiestadel: '1/01/2019',
      tipologiadelServizio: 'colf',
      dataServizio: '1/12/2019',
      orario: 'nella mattina',
      municipio: '5',
      statorichiesta: 'in corso',
      beneficiario: 'Ilaria Pierandrei',
      visualizza:
  <Accordion
    wemi
    AccordionHeader={() => ('')}
    AccordionBody={() => (
      <Row>
        {dropdownlist.lista.map(element => (
          <MenuItem dropdownItem>
            <TextList value={element.ele} intlFormatter weight="normal" />
          </MenuItem>
                            ))}
      </Row>
                    )}
  />,

    },
  ],
};

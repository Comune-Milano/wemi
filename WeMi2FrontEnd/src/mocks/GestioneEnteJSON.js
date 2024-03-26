/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown, { DropdownContent } from 'components/navigation/Navbar/partials/Dropdown';
import MenuItem from 'components/navigation/Navbar/partials/MenuItem';
import Text from 'components/ui/Text';
import FaIcon from 'components/ui/FaIcon';
import styled from 'styled-components';

const DropdownList = styled(DropdownContent)`
  background-color: #f0f0f0;
`;

const TextList = styled(Text)`
  color: black;
  &: hover {
    color: #0099ab;
  }
`;

export const GestioneEnteJSON = {
  Colonne: ['Ente ID', 'Nome', 'Amministratore Ente', 'Azioni'],
  Righe: [
    {
      EnteID: <Link to="/it/SchedaEnte">500003</Link>,
      Nome: 'Group',
      AmministratoreEnte: 'group@gmail.com',
      Azioni: (
        <Dropdown>
          <FaIcon navUserIcon icon="\f7d9" fontSize="f6" color="primary" />
          <DropdownList>
            <MenuItem dropdownItem>
              <TextList value="Disabilita" intlFormatter weight="normal" />
            </MenuItem>
            <MenuItem dropdownItem>
              <Link to="/it/DatiEnte">
                <TextList value="Modifica Dati" intlFormatter weight="normal" />
              </Link>
            </MenuItem>
            <MenuItem dropdownItem>
              <Link to="/it/SchedaEnte">
                <TextList value="Apri scheda Ente" intlFormatter weight="normal" />
              </Link>
            </MenuItem>
            <MenuItem dropdownItem>
              <TextList value="Apri scheda Servizi" intlFormatter weight="normal" />
            </MenuItem>
          </DropdownList>
        </Dropdown>
      ),
    },
    {
      EnteID: '',
      Nome: '',
      AmministratoreEnte: '',
      Azioni: (
        <Dropdown>
          <FaIcon navUserIcon icon="\f7d9" fontSize="f6" color="primary" />
          <DropdownList>
            <MenuItem dropdownItem>
              <TextList value="Disabilita" intlFormatter weight="normal" />
            </MenuItem>
            <MenuItem dropdownItem>
              <TextList value="Modifica Dati" intlFormatter weight="normal" />
            </MenuItem>
            <MenuItem dropdownItem>
              <TextList value="Apri scheda Ente" intlFormatter weight="normal" />
            </MenuItem>
            <MenuItem dropdownItem>
              <TextList value="Apri scheda Servizi" intlFormatter weight="normal" />
            </MenuItem>
          </DropdownList>
        </Dropdown>
      ),
    },
    {
      EnteID: '',
      Nome: '',
      AmministratoreEnte: '',
      Azioni: (
        <Dropdown>
          <FaIcon navUserIcon icon="\f7d9" fontSize="f6" color="primary" />
          <DropdownList>
            <MenuItem dropdownItem>
              <TextList value="Disabilita" intlFormatter weight="normal" />
            </MenuItem>
            <MenuItem dropdownItem>
              <TextList value="Modifica Dati" intlFormatter weight="normal" />
            </MenuItem>
            <MenuItem dropdownItem>
              <TextList value="Apri scheda Ente" intlFormatter weight="normal" />
            </MenuItem>
            <MenuItem dropdownItem>
              <TextList value="Apri scheda Servizi" intlFormatter weight="normal" />
            </MenuItem>
          </DropdownList>
        </Dropdown>
      ),
    },
  ],
};

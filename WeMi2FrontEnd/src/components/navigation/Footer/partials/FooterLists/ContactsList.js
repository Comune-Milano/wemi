/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { FooterJson } from 'mocks/FooterJson';
import { StyledList, StyledListItem } from './StyledList';

const ContactsList = () => (
  <StyledList role="menu" aria-label="Contatti utili">
    {FooterJson.columnRight.contacts.map((contact, index) => (
      <StyledListItem role="menuitem" key={index.toString()}>
        <Text 
          value={contact} 
          intlFormatter 
          transform="normal" 
          letterSpacing="0.05em" 
          size="f7" 
        />
      </StyledListItem>
    ))}
  </StyledList>
);

ContactsList.displayName = 'ContactsList';

export default ContactsList;

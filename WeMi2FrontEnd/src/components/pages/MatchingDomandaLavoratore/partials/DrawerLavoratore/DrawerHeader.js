import React from 'react';
import { StyledHeader } from './StyledHeader';
import Text from 'components/ui/Text';
import { getObjectValue } from 'utils/extensions/objectExtensions';

const Header = ({ worker }) => {
  
  const idLavoratore = getObjectValue(worker, "idLavoratore", "");

  const cognome = getObjectValue(worker, "cognome", "");
  
  const nome = getObjectValue(worker, "nome", ""); 

  return (
    <StyledHeader>
        <Text
        tag="h2"
        value={'Identificativo Offerta ' + idLavoratore}
        color="green"
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        size="f5"
        align="start"
      />
      <Text
        tag="strong"
        value={"Di "+ nome + " " + cognome}
        color="green"
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        size="f6"
        align="start"
      />
    </StyledHeader>);
};

Header.displayName = 'Header';

export const DrawerHeader = Header;
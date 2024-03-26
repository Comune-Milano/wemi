import React from 'react';
import Text from 'components/ui/Text';
import { List } from 'components/ui2/List';
import { progettoTitle, progettoText, progettoListTitle, progettoList } from '../costants';

const Progetto = ({
  color = "red",
}) => (
  <>
    <Text
      value={progettoTitle}
      size="f6"
      weight="bold"
      color={color}
      lineHeight="175%"
      tag="div"
      letterSpacing="0.05em"
    />
    <Text
      value={progettoText}
      lineHeight="175%"
      tag="div"
    />
    <Text
      value={progettoListTitle}
      lineHeight="175%"
      tag="div"
      margin="2em 0 0 0"
    />
    <List type="decimal">
      {progettoList}
    </List>
  </>
);

Progetto.displayName = 'ProgettoNavigation';

export default Progetto;

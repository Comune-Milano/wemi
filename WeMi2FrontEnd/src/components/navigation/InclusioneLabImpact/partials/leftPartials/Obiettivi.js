import React from 'react';
import Text from 'components/ui/Text';
import { List } from 'components/ui2/List';
import { obiettiviTitle, obiettiviList } from '../costants';

const Obiettivi = ({
  color = 'red',
}) => (
  <>
    <Text
      value={obiettiviTitle}
      size="f6"
      weight="bold"
      color={color}
      lineHeight="175%"
      tag="div"
      letterSpacing="0.05em"
    />
    <List>
      {obiettiviList}
    </List>
  </>
);

Obiettivi.displayName = 'ObiettiviNavigation';

export default Obiettivi;

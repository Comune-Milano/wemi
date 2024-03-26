import React from 'react';
import TextSubTitle from './TextSubTitle';
import { ElementListObiettivi } from '../ConoscereIntegrarsi.style';
import Text from 'components/ui/Text';
import { List } from 'components/ui2/List';
import { obiettivi } from '../costants';

const Obiettivi = () => (
  <>
    <TextSubTitle
      value={obiettivi.subTitle}
    />
    <List type="'-   '">
      {obiettivi.list}
    </List>
  </>
);

Obiettivi.displayName = 'ObiettiviNavigation';

export default Obiettivi;
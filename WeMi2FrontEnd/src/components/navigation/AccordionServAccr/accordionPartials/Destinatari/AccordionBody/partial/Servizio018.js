import React from 'react';
import Switch from 'components/ui2/Switch';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const Servizio018 = ({ Value, UpdateValue, Modifica }) => (
  <Row padding="0">
    <Text
      value="Servizio compatibile 0-18 anni"
      size="f7"
      color="darkGrey"
    />
    &nbsp; &nbsp;
    <Switch
      checkcolor="blue"
      value={Value}
      onChange={UpdateValue}
      disabled={!Modifica?.campi}
      size="f7"
    />
  </Row>
);

Servizio018.displayName = 'Body destinatari sezione servizio 0-18';

export default Servizio018;

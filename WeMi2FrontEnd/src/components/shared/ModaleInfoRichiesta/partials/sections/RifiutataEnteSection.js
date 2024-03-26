/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid'
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import RowSection from './RowSection';

const RifiutataEnteSection = ({ richiestaEnte }) => {
  const noteEnte = getObjectValue(richiestaEnte, 'tx_note_ente', null);

  return (
    <Row fluid margin="0 0 3em 0">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        value="Rifiutata dall'ente"
        size="f6"
        color="primary"
        tag="h3"
        weight="bold"
      />
      <Hr height="1.5px" width="100%" color="primary" top="0" bottom="2em" />
      <RowSection
        label="Nota alla risposta"
        value={noteEnte}
        newLine
      />
    </Row>
  );
};

RifiutataEnteSection.displayName = 'RifiutataEnteSection';
export default RifiutataEnteSection;

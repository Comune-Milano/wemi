import React from 'react';
import { Row } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { RichiestaRicongiungimento } from './domandefrequenti/richiestaricongiungimento';
import { FamiliariRicongiunti } from './domandefrequenti/familiariricongiunti';
import { OttenereRicongiungimento } from './domandefrequenti/ottenerericongiungimento';

const DomandeFrequenti = () => (
  <Row fluid>
    <BackgroundTitle bgColor="red" size="small" label="DOMANDE FREQUENTI">
    </BackgroundTitle>
    <Row fluid margin="2em 0 0">
      <RichiestaRicongiungimento />
      <FamiliariRicongiunti />
      <OttenereRicongiungimento />
    </Row>
  </Row>
  );

DomandeFrequenti.displayName = 'DomandeFrequenti';
export default DomandeFrequenti;

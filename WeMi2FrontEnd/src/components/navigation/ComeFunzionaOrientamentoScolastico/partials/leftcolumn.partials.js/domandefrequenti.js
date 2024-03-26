import { Row } from 'components/ui/Grid';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React from 'react';
import CicliScolastici from './domandefrequenti.partials/cicliscolastici';
import CosaOccorre from './domandefrequenti.partials/cosaoccorre';
import Documenti from './domandefrequenti.partials/documenti';
import DopoScuola from './domandefrequenti.partials/doposcuola';

const DomandeFrequenti = () => (
  <>
    <Row fluid margin="2.7em 0 0 0">
      <BackgroundTitle size={bgTitleSizes.small} label="DOMANDE FREQUENTI" bgColor="purple" />
    </Row>
    <Documenti />
    <CosaOccorre />
    <CicliScolastici />
    <DopoScuola />
  </>
);

DomandeFrequenti.displayName = 'DomandeFrequenti';
export default DomandeFrequenti;

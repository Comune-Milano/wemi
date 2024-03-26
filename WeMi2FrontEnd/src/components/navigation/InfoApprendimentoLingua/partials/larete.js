import { Row } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import React from 'react';
import CentriCertificatori from './laretepartials/centricertificatori';
import ScuolePrivate from './laretepartials/scuoleprivate';
import ScuolePubbliche from './laretepartials/scuolepubbliche';
import TerzoSettore from './laretepartials/terzosettore';
import Università from './laretepartials/università';

const LaRete = () => (
  <>
    <Row fluid margin="3em 0 0 0">
      <BackgroundTitle size="small" label="LA RETE" bgColor="blue" />
    </Row>
    <ScuolePubbliche />
    <TerzoSettore />
    <ScuolePrivate />
    <Università />
    <CentriCertificatori />
  </>
);

LaRete.displayName = 'LaRete';
export default LaRete;

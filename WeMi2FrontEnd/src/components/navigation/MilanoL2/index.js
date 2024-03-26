import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import LaboratoriLingua from './partials/laboratorilingua';
import Obiettivi from './partials/obiettivi';
import Azioni from './partials/azioni';
import PartnerProgetto from './partials/partnerprogetto';
import ListaPartner from './partials/listapartner';

const MilanoL2 = () => (
  <Row fluid margin="3.5em 0 4em 0">
    <Column md="7" padding="0">
      <Row fluid>
        <BackgroundTitle size={bgTitleSizes.small} label="MILANO L2" bgColor="blue" />
      </Row>
      <LaboratoriLingua />
      <Obiettivi />
      <Azioni />
      <PartnerProgetto />
      <ListaPartner />
    </Column>
  </Row>
);

MilanoL2.displayName = 'MilanoL2Navigation';
export default MilanoL2;

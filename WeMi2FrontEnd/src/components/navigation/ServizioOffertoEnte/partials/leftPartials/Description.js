/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'components/ui/Grid';
import { Destinatari, AttivitaPers, SedeErogazione, MunicipioErogazione, PeriodoErogazione } from './descriptionPartials';
import { SectionTitle } from '../SectionTitle';
import { SectionWrapperColumn } from '../SectionWrapperColumn';

const Description = ({
    servizioErogato,
    locale,
    sectionsContentPrintWidth,
}) => (
  <Row fluid>
    <SectionTitle value="Descrizione del servizio" />
    <SectionWrapperColumn
      padding="0"
      margin="0"
      xs="12"
      sectionsContentPrintWidth={sectionsContentPrintWidth}
    >
      <Destinatari servizioErogato={servizioErogato} locale={locale} />
      <AttivitaPers servizioErogato={servizioErogato} locale={locale} />
      <SedeErogazione servizioErogato={servizioErogato} />
      <PeriodoErogazione servizioErogato={servizioErogato} locale={locale} />
      <MunicipioErogazione servizioErogato={servizioErogato} locale={locale} />
    </SectionWrapperColumn>
  </Row>
);


Description.displayName = 'Description';

const mapStoreToProps = store => ({
  locale: store.locale,
});

export default connect(mapStoreToProps, null)(Description);

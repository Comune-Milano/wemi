/** @format */

import React from 'react';
import { Column } from 'components/ui/Grid';
import RichiestaSection from './sections/RichiestaSection';
import RiepilogoAcquistoSection from './sections/RiepilogoAcquistoSection';

const ModaleInfoRichiestaLeftColumn = ({
  richiestaEnte,
  statoRichiestaBase,
  statoRichiestaEnte,
  rispostaNonRicevutaEnte
}) => (
  <Column
    xs="12"
    md={!rispostaNonRicevutaEnte || statoRichiestaEnte.chiusaEnte ? '6' : '12'}
    padding="0"
    sizepadding={{ md: '0 3em 0 0' }}
  >
    <RichiestaSection richiestaEnte={richiestaEnte} />
    { statoRichiestaEnte.pagata && !rispostaNonRicevutaEnte ? (
      <RiepilogoAcquistoSection richiestaEnte={richiestaEnte} />
    ) : null}
  </Column>
);

ModaleInfoRichiestaLeftColumn.displayName = 'ModaleInfoRichiestaLeftColumn';
export default ModaleInfoRichiestaLeftColumn;

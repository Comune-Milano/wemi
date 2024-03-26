/** @format */

import React from 'react';
import { Column } from 'components/ui/Grid';
import PropostaEnteSection from './sections/PropostaEnteSection';
import DatiFatturazioneSection from './sections/DatiFatturazioneSection';
import RifiutataEnteSection from './sections/RifiutataEnteSection';

const ModaleInfoRichiestaRightColumn = ({ 
  richiestaEnte, 
  statoRichiestaBase, 
  statoRichiestaEnte, 
  rispostaNonRicevutaEnte,
}) => (
  <Column xs="12" md="6" padding="0" sizepadding={{ md: '0 0 0 3em' }}>
    { !statoRichiestaEnte.chiusaEnte && !statoRichiestaEnte.pagata && !rispostaNonRicevutaEnte ? (
      <PropostaEnteSection richiestaEnte={richiestaEnte} />
    ) : null}
    { statoRichiestaEnte.chiusaEnte ? (
      <RifiutataEnteSection richiestaEnte={richiestaEnte} />
    ) : null }
    { statoRichiestaEnte.pagata && !rispostaNonRicevutaEnte ? (
      <DatiFatturazioneSection richiestaEnte={richiestaEnte} />
    ) : null}
  </Column>
);

ModaleInfoRichiestaRightColumn.displayName = 'ModaleInfoRichiestaRightColumn';
export default ModaleInfoRichiestaRightColumn;

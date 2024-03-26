/** @format */

import React from 'react';
import { Column } from 'components/ui/Grid';
import { FirstContact, ActivationTime, CostWrapper, ProceduradiAttivazione, UlterioriInformazioni } from './rightPartials';
import { CondizioniDiUtilizzo } from './leftPartials';

const RightColumn = ({
  servizioErogato,
  locale,
  sectionsContentPrintWidth,
}) => (
  <Column xs="12" md="6" padding="0" sizepadding={{ md: '0 0 0 3.9rem' }}>
    <CostWrapper
      servizioErogato={servizioErogato}
      sectionsContentPrintWidth={sectionsContentPrintWidth}
    />
    <ProceduradiAttivazione
      servizioErogato={servizioErogato}
      locale={locale}
      sectionsContentPrintWidth={sectionsContentPrintWidth}
    />
    <UlterioriInformazioni
      servizioErogato={servizioErogato}
      sectionsContentPrintWidth={sectionsContentPrintWidth}
    />
    <FirstContact
      servizioErogato={servizioErogato}
      sectionsContentPrintWidth={sectionsContentPrintWidth}
    />
    <ActivationTime
      servizioErogato={servizioErogato}
      sectionsContentPrintWidth={sectionsContentPrintWidth}
    />
    <CondizioniDiUtilizzo sectionsContentPrintWidth={sectionsContentPrintWidth} />
  </Column>
);

RightColumn.displayName = 'RightColumn';

export default RightColumn;

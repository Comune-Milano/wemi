/** @format */

import React from 'react';
import { Column } from 'components/ui/Grid';
import { Description, PersEsterno, PersInterno, NomeDelServizio } from './leftPartials';

const LeftColumn = ({
  servizioErogato,
  sectionsContentPrintWidth,
  withoutNomeServizio,
}) => (
  <Column
    xs="12"
    md="6"
    padding="0"
    sizepadding={{ md: '0 3.9rem 0 0' }}
  >
    {
      withoutNomeServizio ? null
        : (
          <NomeDelServizio
            servizioErogato={servizioErogato}
            sectionsContentPrintWidth={sectionsContentPrintWidth}
          />
        )
    }

    <Description
      servizioErogato={servizioErogato}
      sectionsContentPrintWidth={sectionsContentPrintWidth}
    />
    <PersInterno
      servizioErogato={servizioErogato}
      sectionsContentPrintWidth={sectionsContentPrintWidth}
    />
    <PersEsterno
      servizioErogato={servizioErogato}
      sectionsContentPrintWidth={sectionsContentPrintWidth}
    />
  </Column>
);

LeftColumn.displayName = 'LeftColumn';

export default LeftColumn;

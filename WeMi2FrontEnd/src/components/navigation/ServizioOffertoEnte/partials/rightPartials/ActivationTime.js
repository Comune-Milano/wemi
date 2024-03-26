/** @format */

import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { SectionTitle } from '../SectionTitle';
import { SectionWrapperColumn } from '../SectionWrapperColumn';

const ActivationTime = ({
  servizioErogato,
  sectionsContentPrintWidth,
}) => {
  const qt_tempo_max_attivazione = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.qt_tempo_max_attivazione', null);

  return (
    <>
      {qt_tempo_max_attivazione ? (
        <Row fluid margin="3.9rem 0 0 0">
          <SectionTitle value="Tempi di attesa" />
          <SectionWrapperColumn
            padding="0"
            margin="0.5em 0"
            xs="12"
            sectionsContentPrintWidth={sectionsContentPrintWidth}
          >
            <Text
              value="Massimo "
              color="black"
              size="f7"
            />
            <Text
              value={qt_tempo_max_attivazione}
              color="black"
              size="f7"
            />
            <Text
              value=" giorni lavorativi"
              color="black"
              size="f7"
            />
          </SectionWrapperColumn>
        </Row>
      ) : undefined}
    </>
  );
};

ActivationTime.displayName = 'ActivationTime';


export default ActivationTime;

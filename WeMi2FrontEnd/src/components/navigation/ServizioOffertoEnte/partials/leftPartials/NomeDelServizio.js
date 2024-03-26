
import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { SectionTitle } from '../SectionTitle';
import { SectionWrapperColumn } from '../SectionWrapperColumn';

const NomeDelServizio = ({
  servizioErogato,
  sectionsContentPrintWidth,
}) => {
  const nomeServizio = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.nomeServizio', '');

  if (!nomeServizio) {
    return null;
  }

  return (
    <Row fluid margin="0 0 3.9rem 0">
      <SectionTitle
        value="Nome del servizio"
      />
      <SectionWrapperColumn
        padding="0"
        margin="1.2em 0px 0px"
        xs="12"
        sectionsContentPrintWidth={sectionsContentPrintWidth}
      >
        <Text
          value={nomeServizio}
          weight="bold"
        />
      </SectionWrapperColumn>
    </Row>
  );
};


NomeDelServizio.displayName = 'NomeDelServizio';

export default (NomeDelServizio);

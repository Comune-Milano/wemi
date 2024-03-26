
import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { SectionTitle } from '../SectionTitle';
import { SectionWrapperColumn } from '../SectionWrapperColumn';
import WrapperText from '../WrapperText';

const UlterioriInformazioni = ({
  servizioErogato,
  sectionsContentPrintWidth,
}) => {
  const ulterioriInformazioni = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.ulterioriInformazioni', '');

  if (!ulterioriInformazioni) {
    return null;
  }

  return (
    <Row fluid margin="3.9rem 0 0 0">
      <SectionTitle
        value="Ulteriori informazioni"
      />
      <SectionWrapperColumn
        padding="0"
        margin="0.5em 0"
        xs="12"
        sectionsContentPrintWidth={sectionsContentPrintWidth}
      >
        <WrapperText>
          <Text
            value={ulterioriInformazioni}
            whitespace="pre-line"
          />
        </WrapperText>
      </SectionWrapperColumn>
    </Row>
  );
};


UlterioriInformazioni.displayName = 'UlterioriInformazioni';

export default (UlterioriInformazioni);

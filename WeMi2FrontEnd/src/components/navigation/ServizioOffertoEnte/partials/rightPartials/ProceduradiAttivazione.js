/** @format */

import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { SectionTitle } from '../SectionTitle';
import { SectionWrapperColumn } from '../SectionWrapperColumn';
import WrapperText from '../WrapperText';

const ProceduradiAttivazione = ({
  servizioErogato,
  locale,
  sectionsContentPrintWidth,
}) => {
  const procedura = getObjectValue(servizioErogato, `EstraiDettaglioAmministrativoServizioEnte.tl_procedura_attivazione.${locale}`, null);

  return (
    <>
      {procedura && (
        <Row fluid margin="3.9rem 0 0 0">
          <SectionTitle
            value="Procedura di attivazione"
          />
          <SectionWrapperColumn
            padding="0"
            margin="0.5em 0"
            xs="12"
            sectionsContentPrintWidth={sectionsContentPrintWidth}
          >
            <WrapperText>
              <Text
                value={procedura}
                color="black"
                size="f7"
                whitespace="pre-wrap"
              />
            </WrapperText>
          </SectionWrapperColumn>
        </Row>
      )}
    </>
  );
};

ProceduradiAttivazione.displayName = 'ProceduradiAttivazione';


export default ProceduradiAttivazione;

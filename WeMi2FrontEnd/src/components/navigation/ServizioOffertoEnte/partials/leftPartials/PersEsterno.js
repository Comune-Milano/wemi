/** @format */

import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { SectionTitle } from '../SectionTitle';
import { DashedUnorderedList } from '../DashedUnorderedList';
import { SectionWrapperColumn } from '../SectionWrapperColumn';

const PersEsterno = ({
  servizioErogato,
  sectionsContentPrintWidth,
}) => {
  const nmFornitori = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.js_info_personale.nmFornitori', null);
  const qtEsperienzaPersonaleEsterno = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleEsterno', null);
  const qualifiche = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.qualifiche_esterne', []);
  const valueQtEsperienzaPersonaleEst = qtEsperienzaPersonaleEsterno === '1' ? `${qtEsperienzaPersonaleEsterno} anno` :
    `${qtEsperienzaPersonaleEsterno} anni`;

  return (
    <>
      {(nmFornitori || qualifiche?.length || qtEsperienzaPersonaleEsterno) ? (
        <Row fluid margin="3.9rem 0 0 0">
          <SectionTitle value="Personale esterno" />
          {nmFornitori && (
            <SectionWrapperColumn
              padding="0"
              margin="0.5em 0"
              xs="12"
              sectionsContentPrintWidth={sectionsContentPrintWidth}
            >
              <Text
                tag="h4"
                weight="bold"
                value="Fornitori"
                color="black"
                size="f7"
              />
              <Text
                padding="0.5em 0 0 0"
                tag="p"
                value={nmFornitori}
                color="black"
                size="f7"
              />
            </SectionWrapperColumn>
          )}
          {qualifiche && (
            <SectionWrapperColumn
              padding="0"
              margin="0.5em 0"
              xs="12"
              sectionsContentPrintWidth={sectionsContentPrintWidth}
            >
              <Text
                tag="h4"
                weight="bold"
                value="Personale impiegato"
                color="black"
                size="f7"
              />
              <DashedUnorderedList style={{ padding: '0.5em 0 0 0' }}>
                {qualifiche.map((el, i) => (
                  <li key={`qualifiche${i}`}>
                    <Text
                      tag="span"
                      value={el}
                      color="black"
                      size="f7"
                    />
                  </li>
                ))}
              </DashedUnorderedList>
            </SectionWrapperColumn>
          )}
          {qtEsperienzaPersonaleEsterno && (
            <SectionWrapperColumn
              padding="0"
              margin="0.5em 0"
              xs="12"
              sectionsContentPrintWidth={sectionsContentPrintWidth}
            >
              <Text
                tag="h4"
                weight="bold"
                value="Esperienza minima nel settore"
                color="black"
                size="f7"
              />
              <Text
                padding="0.5em 0 0 0"
                tag="p"
                value={valueQtEsperienzaPersonaleEst}
                color="black"
                size="f7"
              />
            </SectionWrapperColumn>
          )}
        </Row>
      )
        : null
      }
    </>
  );
};

PersEsterno.displayName = 'PersEsterno';

export default PersEsterno;

/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { SectionTitle } from '../SectionTitle';
import { DashedUnorderedList } from '../DashedUnorderedList';
import { SectionWrapperColumn } from '../SectionWrapperColumn';

const PersInterno = ({
  servizioErogato,
  locale,
  sectionsContentPrintWidth,
}) => {
  const qualifiche = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.qualifiche_interne', []);
  const qtEsperienzaPersonaleInterno = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.js_info_personale.qtEsperienzaPersonaleInterno', null);

  const valueQtEsperienzaPersonaleInt = qtEsperienzaPersonaleInterno === '1' ? `${qtEsperienzaPersonaleInterno} anno` :
    `${qtEsperienzaPersonaleInterno} anni`;
  return (
    <>
      {(qtEsperienzaPersonaleInterno || qualifiche?.length) ? (
        <Row fluid margin="3.9rem 0 0 0">
          <SectionTitle value="Personale impiegato" />
          {qualifiche && (
            <SectionWrapperColumn
              padding="0"
              margin={qualifiche.length > 0 ? '0.5em 0' : '0.7em 0 0 0'}
              xs="12"
              sectionsContentPrintWidth={sectionsContentPrintWidth}
            >
              {qualifiche.length > 0 ? (
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
            )
              : null }
            </SectionWrapperColumn>
          )}
          {qtEsperienzaPersonaleInterno && (
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
                value={valueQtEsperienzaPersonaleInt}
                color="black"
                size="f7"
              />
            </SectionWrapperColumn>
          )}
        </Row>
      )
    : null}
    </>
  );
};

PersInterno.displayName = 'PersInterno';

const mapStoreToProps = store => ({
  locale: store.locale,
});

export default connect(mapStoreToProps, null)(PersInterno);

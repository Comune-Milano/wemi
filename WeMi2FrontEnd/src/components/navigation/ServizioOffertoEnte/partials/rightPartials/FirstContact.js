/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { SectionTitle } from '../SectionTitle';
import { SectionWrapperColumn } from '../SectionWrapperColumn';
import WrapperText from '../WrapperText';

const FirstContact = ({
  servizioErogato,
  sectionsContentPrintWidth,
}) => {
  const calendario = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.disponibilitaDiContatto.calendario', null);
  const telefono = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.js_primo_contatto.txTelefono', null);
  const notePrimoContatto = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.ente.datiEnte.note_per_cittadino', null);

  return (
    <Row fluid margin="3.9rem 0 0 0">
      {calendario && calendario.length > 0 && (
        <Row fluid>
          <SectionTitle value="Primo contatto" />
          <SectionWrapperColumn
            padding="0"
            margin="0.5em 0"
            xs="12"
            sectionsContentPrintWidth={sectionsContentPrintWidth}
          >
            {
              calendario.map((day, i) => {
                if (day.disponibilita.length === 0) {
                  return null;
                }
                return (
                  <Row fluid key={`contday_${i}`} alignitems="flex-start">
                    <Column xs="3" padding="0 .5em 0 0">
                      <Text
                        tag="span"
                        value={day.giorno}
                        color="black"
                        size="f7"
                      />
                    </Column>
                    <Column xs="9" padding="0 0 0 1em">
                      {(day.disponibilita && (!isNullOrUndefined(day.disponibilita[0]) || !isNullOrUndefined(day.disponibilita[1]))) ?
                        day.disponibilita.map((disp, i2) => (
                          <React.Fragment key={`disp_${i}_${i2}`}>
                            {i2 && day.disponibilita[0] && day.disponibilita[1] ? ' / ' : ''}

                            {
                              disp ?
                                (
                                  <>
                                    <Text
                                      value={disp && disp.oraDa && disp.oraDa}
                                      color="black"
                                      size="f7"
                                    />
                                    -
                                    <Text
                                      value={disp && disp.oraA && disp.oraA}
                                      color="black"
                                      size="f7"
                                    />
                                  </>
                                ) : null
                            }


                          </React.Fragment>
                        )) :
                        '---'}
                    </Column>
                  </Row>
                );
              })
            }
          </SectionWrapperColumn>
        </Row>
      )}
      {telefono ?
        (
          <SectionWrapperColumn
            padding="0"
            margin="0.5em 0"
            xs="12"
            sectionsContentPrintWidth={sectionsContentPrintWidth}
          >
            <Text
              tag="h4"
              weight="bold"
              value="Telefono"
              color="black"
              size="f7"
            />
            <p style={{ padding: '0.5em 0 0 0' }}>
              <Text
                tag="span"
                value={telefono}
                color="black"
                size="f7"
              />
            </p>
          </SectionWrapperColumn>
        )
        : null
      }
      {notePrimoContatto ?
        (
          <SectionWrapperColumn
            padding="0"
            margin="0.5em 0"
            xs="12"
            sectionsContentPrintWidth={sectionsContentPrintWidth}
          >
            <Text
              tag="h4"
              weight="bold"
              value="Note"
              color="black"
              size="f7"
            />
            <WrapperText padding="0.5em 0 0 0">
              <Text
                tag="span"
                value={notePrimoContatto}
                color="black"
                size="f7"
                whitespace="pre-line"
              />
            </WrapperText>
          </SectionWrapperColumn>
        )
        : null
      }
    </Row>
  );
};

FirstContact.displayName = 'FirstContact';

export default FirstContact;

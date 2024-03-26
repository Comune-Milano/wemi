/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import TextAccordion from 'components/ui2/TextAccordion';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';

const DomandeFrequenti = ({ domandeFrequenti, color }) => (
  <Row fluid>
    <BackgroundTitle
      size={bgTitleSizes.small}
      label="DOMANDE FREQUENTI"
      bgColor={color}
    />
    <Row fluid margin="2em 0 0">
      {domandeFrequenti.map(domandaFrequente => (
        <Row fluid margin="0 0 1em" key={domandaFrequente.domanda}>
          <TextAccordion
            label={domandaFrequente.domanda}
            weight="bold"
            labelTransform="uppercase"
            labelLetterSpacing="0.05em"
            color={color}
          >
            <Row fluid margin="0 0 1em">
              {typeof domandaFrequente.risposta === 'string' ?
                  (
                    <Text
                      value={domandaFrequente.risposta}
                      tag="p"
                    />
                  )
                  : domandaFrequente.risposta
                }
            </Row>
          </TextAccordion>
        </Row>
        ))}
    </Row>
  </Row>
  );

DomandeFrequenti.displayName = 'DomandeFrequenti';
export default DomandeFrequenti;

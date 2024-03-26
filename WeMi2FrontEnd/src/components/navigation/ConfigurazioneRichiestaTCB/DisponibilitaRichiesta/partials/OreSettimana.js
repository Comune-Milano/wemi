/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import InputNumber from 'components/ui2/InputNumber';
import { getTCBServiceName } from '../../utils';
import TitleModalInfo from 'components/shared/SimulatoreCosto/partials/TitleModalInfo';
import { BodyModalInfo } from 'components/shared/SimulatoreCosto/utils';
import { WEEKEND } from 'types/tipologiaOrario';

const OreSettimana = ({
  setFormField,
  oreSettimanali,
  servizioTCB,
  locale,
  maxHours,
  orario,
  maxOre
}) => {
  const title = orario === WEEKEND ? `PER QUANTE ORE HAI BISOGNO DEL/LA ${getTCBServiceName(servizioTCB, locale)} NEL WEEKEND` : `Per quante ore alla settimana hai bisogno del/la ${getTCBServiceName(servizioTCB, locale)}`;
 
  return (
    <>
      <TitleModalInfo
        label={title}
        modalTitle="tipologia orario"
        modalBody={BodyModalInfo["oreSettimanali"](maxOre)}
        margin="2em 0 1em 0"
        required
        color="primary"
      />
      <Row fluid margin="0">
        <Column xs="12" padding="0" flex>
          <InputNumber
            value={Number.parseInt(oreSettimanali, 10) || 0}
            minValue={0}
            maxValue={maxHours || 54}
            onChange={(value) => setFormField('oreSettimanali', value)}
            onInputChange={(value) => setFormField('oreSettimanali', value)}
            step={1}
            ariaLabel="ore settimanali"
          />
          <Text
            value="ore alla settimana"
            size="f7"
            padding="0 0 0 1.5em"
          />
        </Column>
      </Row>
    </>
  );
};

OreSettimana.displayName = 'OreSettimana';

export default OreSettimana;

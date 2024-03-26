/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Radio from 'components/ui2/RadioGroup';
import TitleModalInfo from 'components/shared/SimulatoreCosto/partials/TitleModalInfo';
import { BodyModalInfo } from 'components/shared/SimulatoreCosto/utils';

const Orario = ({
  orarioValue,
  getOrarioValue,
  maxOre=[],
  orariTCB,
  disp,
  locale,
}) => {

  const handleRadioChange = (value) => {
    getOrarioValue(value);
  };

  const radioItems = orariTCB.map(el => {
    return {
      id: el.cd_dominio_tcb,
      label: el.tl_valore_testuale[locale],
    }
  });

  return (
    <>
      <TitleModalInfo
        label={`${disp ? 'Seleziona' : 'Definisci'} la tipologia di orario adatta alle tue esigenze`}
        modalTitle="tipologia orario"
        modalBody={BodyModalInfo["tipologiaOrario"](maxOre)}
        margin="3em 0 1em 0"
        color="primary"
        required
      />
      <Row fluid>
        <Column xs="12" md="6" lg="5" padding="0">
          <Radio
            radioItems={radioItems.slice(0, 3)}
            allowWrap
            selectedItem={orarioValue}
            onChange={(value, index) => { handleRadioChange(value, index) }}
            fontSize="f7"
            checkcolor={"primary"}
            display="inline-grid"
          />
        </Column>
        <Column xs="12" md="6" lg="5" padding="0">
          <Radio
            radioItems={radioItems.slice(3, 6)}
            allowWrap
            selectedItem={orarioValue}
            onChange={(value, index) => { handleRadioChange(value, index) }}
            fontSize="f7"
            checkcolor={"primary"}
            display="inline-grid"
          />
        </Column>
      </Row>
    </>
  )
};

Orario.displayName = 'Orario';
export default Orario;
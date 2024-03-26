/** @format */

import React from 'react';
import { GroupFieldTitle } from "components/navigation/ConfigurazioneRichiestaTCB/partials";
import { Row } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Checkbox from 'components/ui2/Checkbox';

const OreSettimanali = () => {
  const { dataset, setFormField } = useFormContext();

  return (
    <Row fluid margin="1em 0 ">
      <GroupFieldTitle
        title="PER QUANTE ORE MASSIME ALLA SETTIMANA SEI DISPONIBILE A LAVORARE?"
        marginTop="0"
      />
      {dataset.nrOreSettminali &&
        dataset.nrOreSettminali.map((tipoOreSett) => {
          return (
            <Row key={tipoOreSett.id.toString()} fluid>
              <Checkbox
                fontSize="f7"
                checkcolor="primary"
                width="auto"
                label={tipoOreSett.value}
                value={tipoOreSett.checked}
                onChange={isChecked => {
                  const dataCopy = dataset.nrOreSettminali.map(el => ({ ...el }));

                  const selectedCheckbox = dataCopy.find(el => el.id === tipoOreSett.id);
                  selectedCheckbox.checked = isChecked;

                  setFormField("nrOreSettminali", dataCopy);
                }}
              />
            </Row>
          );
        })}
    </Row>
  )
};

OreSettimanali.displayName = 'OreSettimanali';
export default OreSettimanali;
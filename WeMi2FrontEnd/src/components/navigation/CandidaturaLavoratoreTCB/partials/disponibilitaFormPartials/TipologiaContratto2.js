/** @format */

import React from 'react';
import { GroupFieldTitle } from "components/navigation/ConfigurazioneRichiestaTCB/partials";
import { Row } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';

const TipologiaContratto = ({
  handleChangeMultiSelect
}) => {

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  return (
    <Row fluid margin="1em 0">
      <GroupFieldTitle
        title="Tipologia di contratto"
        marginTop="0"
      />
      <Row fluid>
        <Text
          value="Quale tipologia di contratto sei disponibile ad accettare?"
          weight="bold"
        />
        <Row fluid margin="1em 0 0">
          {dataset.tipologiaContratto.map((tipoContratto) => (
            <Row key={tipoContratto.id.toString()} fluid>
              <Checkbox
                fontSize="f7"
                width="auto"
                checkcolor="primary"
                label={tipoContratto.value}
                value={tipoContratto.checked}
                onChange={isChecked => {
                  const dataCopy = dataset.tipologiaContratto.map(el => ({ ...el }));

                  const selectedCheckbox = dataCopy.find(el => el.id === tipoContratto.id);
                  selectedCheckbox.checked = isChecked;

                  setFormField("tipologiaContratto", dataCopy);
                }}
              />
            </Row>
          ))}
        </Row>
      </Row>
    </Row>
  )
};

TipologiaContratto.displayName = 'TipologiaContratto';
export default TipologiaContratto;
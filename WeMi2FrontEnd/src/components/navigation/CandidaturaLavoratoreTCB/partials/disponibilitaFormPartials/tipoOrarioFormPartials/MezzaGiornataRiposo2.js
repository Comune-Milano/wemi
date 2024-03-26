/** @format */

import React, { useState, useEffect } from 'react';
import { GroupFieldTitle } from "components/navigation/ConfigurazioneRichiestaTCB/partials";
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import media from 'utils/media-queries';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Select from 'components/ui2/Select';

const MezzaGiornataRiposo = ({
  handleChangeMultiSelect
}) => {

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  return (
    <Row fluid margin="1em 0">
      <GroupFieldTitle 
      marginTop="0"
      title="Hai delle preferenze sulla mezza giornata di riposo?" />
      <Row fluid>
        <Column lg="5" md="5" sm="5" sx="5" padding="0">
          {dataset.convivenzaMezzaGiornataDiRiposo ? (
            <Select
              material
              multi
              name="mezzaGiornataDiRiposo"
              clickedItem={event =>
                handleChangeMultiSelect(
                  event,
                  dataset.convivenzaMezzaGiornataDiRiposo,
                  "convivenzaMezzaGiornataDiRiposo"
                )
              }
              clickedSelectedItem={event =>
                handleChangeMultiSelect(
                  event,
                  dataset.convivenzaMezzaGiornataDiRiposo,
                  "convivenzaMezzaGiornataDiRiposo"
                )
              }
              items={dataset.convivenzaMezzaGiornataDiRiposo}
              selectedValue={dataset.convivenzaMezzaGiornataDiRiposo.filter(el => el.checked)}
              placeholder="Seleziona i giorni"
              bgColor="white"
            />
          ) : null}
        </Column>
      </Row>
    </Row>
  )
};

MezzaGiornataRiposo.displayName = 'MezzaGiornataRiposo';
export default MezzaGiornataRiposo;
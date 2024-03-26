/** @format */

import React, { useState, useEffect } from 'react';
import { GroupFieldTitle } from "components/navigation/ConfigurazioneRichiestaTCB/partials";
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import media from 'utils/media-queries';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Select from 'components/ui2/Select';

const StipendioMinimo = ({
  handleChangeSelect,
  nomeTipoOrario
}) => {

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  return (
    <Row fluid margin="1em 0">
      <GroupFieldTitle
        marginTop="0"
        title="Qual è lo stipendio minimo che sei disponibile ad accettare?"
      />
      <Row fluid>
        <Column lg="5" md="5" sm="5" sx="5" padding="0 0 1em">
          {dataset[`${nomeTipoOrario}StipendioProposto`] ? (
            <Select
              placeholder="Seleziona lo stipendio"
              name="Stipendio minimo disponibilità"
              clickedItem={event =>
                handleChangeSelect(
                  event,
                  dataset[`${nomeTipoOrario}StipendioProposto`],
                  `${nomeTipoOrario}StipendioProposto`
                )
              }
              clickedSelectedItem={event =>
                handleChangeSelect(
                  event,
                  dataset[`${nomeTipoOrario}StipendioProposto`],
                  `${nomeTipoOrario}StipendioProposto`
                )
              }
              items={dataset[`${nomeTipoOrario}StipendioProposto`]}
              selectedValue={dataset[`${nomeTipoOrario}StipendioProposto`].find(el => el.checked)}
              bgColor="white"
            />
          ) : null}
        </Column>
      </Row>
    </Row>
  )
};

StipendioMinimo.displayName = 'StipendioMinimo';
export default StipendioMinimo;
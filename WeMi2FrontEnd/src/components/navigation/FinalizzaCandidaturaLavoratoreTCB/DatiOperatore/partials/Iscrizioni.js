
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import Checkbox from 'components/ui2/Checkbox';

const Iscrizioni = () => {

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  const checkIscrizioniArray = [
    {
      id: 1,
      key: 'iscrittoInps',
      label: 'Iscritto INPS'
    },
    {
      id: 2,
      key: 'iscrittoRegioneLombardia',
      label: 'Iscritto Regione Lombardia'
    },
  ];

  return (
    <>
      <GroupFieldTitle
        title="Iscrizioni INPS e regione Lombardia"
      />
      <Row fluid>
        {
          checkIscrizioniArray.map(el => (
            <div>
              <Checkbox
                checkcolor="primary"
                noWrap
                spacing="0 2em 0 0"
                label={el.label}
                value={dataset[el.key]}
                onChange={(value) => {
                  setFormField(`${el.key}`, value)
                }}
              />
            </div>
          ))
        }
      </Row>

    </>
  );
};

Iscrizioni.displayName = 'Iscrizioni';

export default Iscrizioni;

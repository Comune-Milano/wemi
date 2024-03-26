import React from "react";
import { useFormContext } from "libs/Form/hooks/useFormContext";
import { Row, Column } from "components/ui/Grid";
import Text from "components/ui/Text";
import Select from 'components/ui2/Select';

const DimensioniCasa = ({ handleChangeMultiSelect }) => {

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  return (
    <>
      <Row fluid margin="2em 0 0">
        <Text
          value="Definisci le tue disponibilità in base alle dimensioni della casa"
          weight="bold"
          padding="0 0 1em 0"
        />
        <Row fluid>
          <Column xs="12" md="5" padding="0">
            <Select
              multi
              placeholder="Seleziona le dimensioni della casa"
              name="Dimensioni della casa"
              clickedItem={event =>
                handleChangeMultiSelect(
                  event,
                  dataset["grandezzaDellaCasa"],
                  "grandezzaDellaCasa"
                )
              }
              clickedSelectedItem={event =>
                handleChangeMultiSelect(
                  event,
                  dataset.grandezzaDellaCasa,
                  "grandezzaDellaCasa"
                )
              }
              items={dataset.grandezzaDellaCasa}
              selectedValue={dataset.grandezzaDellaCasa.filter(el => el.checked)}
            />
          </Column>
        </Row>
      </Row>
    </>)
};

DimensioniCasa.displayName = 'DimensioniCasa';
export default DimensioniCasa;

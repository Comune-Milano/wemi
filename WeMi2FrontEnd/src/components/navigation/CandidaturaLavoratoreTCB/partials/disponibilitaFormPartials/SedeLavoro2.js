/** @format */

import React from 'react';
import { GroupFieldTitle } from "components/navigation/ConfigurazioneRichiestaTCB/partials";
import { Row, Column } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Text from 'components/ui/Text';
import Select from 'components/ui2/Select';

const SedeLavoro = ({
  handleChangeMultiSelect,
  NumeroMunicipi,
}) => {

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  React.useEffect(() => {
    const municipiSelezionati = [];
    dataset.sedeDiLavoro.forEach(ele => {
      if (ele.checked) {
        municipiSelezionati.push(ele);
      }
    });
    const arr= dataset.sedeDiLavoro.slice();
    const tuttiMunicipiSelezionati= municipiSelezionati.length === NumeroMunicipi;
    if(tuttiMunicipiSelezionati){
      arr.forEach(ele => {
        ele.checked = false;
      });
    };
    arr.push({ id: 0, checked: tuttiMunicipiSelezionati, value: "TUTTI I MUNICIPI" });
    setFormField("sedeDiLavoro", arr );
  }, [])

  return (
    <Row fluid>
      <GroupFieldTitle
        title="Seleziona i municipi"
      />
      <Row fluid>
        <Text
          value="Seleziona il municipio della città di Milano in cui preferiresti lavorare"
          weight="bold"
          padding="0 0 1em 0"
        />
          <Row fluid>
            <Column xs="12" md="5" padding="0">
              <Select
                multi
                clickedItem={event =>
                  handleChangeMultiSelect(
                    event,
                    dataset.sedeDiLavoro,
                    "sedeDiLavoro",
                  )
                }
                clickedSelectedItem={event =>
                  handleChangeMultiSelect(
                    event,
                    dataset.sedeDiLavoro,
                    "sedeDiLavoro"
                  )
                }
                items={dataset.sedeDiLavoro}
                selectedValue={dataset.sedeDiLavoro.filter(el => el.checked)}
                placeholder="Seleziona i municipi"
                name="Seleziona i municipi"
              />
            </Column>
          </Row>
      </Row>
    </Row>
  )
};

SedeLavoro.displayName = 'SedeLavoro';
export default SedeLavoro;
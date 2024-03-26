import React from "react";
import { Row } from "components/ui/Grid";
import Text from "components/ui/Text";
import RadioGroup from "components/ui2/RadioGroup";
import { useFormContext } from "libs/Form/hooks/useFormContext";
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

const RadioCandidatura = () => {
  const { dataset, setFormField } = useFormContext();

  return (
    <>
      <Row fluid >
      <GroupFieldTitle
        title={dataset.candidatura.label}
        marginTop="0"
        required
      />
        <Row fluid padding={"0 2em 0 0"}>
          <RadioGroup
            radioItems={dataset.candidatura.radioOptions}
            selectedItem={dataset.candidatura.radioOptions.find(el => el.checked)}
            onChange={value => {
              if (Object.keys(value).length !== 0) {
                const dataCopy = dataset.candidatura.radioOptions.map(el => ({ ...el }));
                const elNotSelected = dataCopy.filter(el => el.id !== value.id);
                elNotSelected.forEach(el => (el.checked = false));
                const elSelected = dataCopy.find(el => el.id === value.id);
                elSelected.checked = !value.checked;
                setFormField("candidatura", {
                  label: dataset.candidatura.label,
                  radioOptions: dataCopy,
                });
              }
            }}
            fontSize="f7"
            checkcolor="primary"
            display="inline-grid"
          />
        </Row>
      </Row>
    </>
  );
};

RadioCandidatura.displayName = 'RadioCandidatura';
export default RadioCandidatura;

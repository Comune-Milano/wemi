
import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import InputNumber from 'components/ui2/InputNumber';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

const AnniEsperienza = ({
  title,
  input
}) => {

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  return (
    <>
      <GroupFieldTitle
        title={title}
      />
      {
        input.map((ele) => {
          return (
            <Row fluid key={ele.key} margin=".5em 0">
              <InputNumber
                value={Number.parseInt(dataset[ele.key], 10) || 0}
                onChange={(value) => { setFormField(ele.key, value); }}
                onInputChange={(value) => { setFormField(ele.key, value); }}
                minValue={0}
                maxValue={ele.max}
                size="f7"
                iconColor="primary"
                textColor="black"
              />
              <Text
                padding="0 0 0 .5em"
                size="f6"
                value={ele.label}
              />
            </Row>
          );
        })
      }
    </>
  );
};

AnniEsperienza.displayName = 'AnniEsperienza';

export default AnniEsperienza;

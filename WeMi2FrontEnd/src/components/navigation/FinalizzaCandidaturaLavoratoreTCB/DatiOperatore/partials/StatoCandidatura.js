
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { GroupFieldTitle, FieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import RadioGroup from 'components/ui2/RadioGroup';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const StatoCandidatura = () => {
  const { dataset, setFormField, errors, handleFieldBlur } = useFormContext();

  const radioStatoCandidatura = [
    {
      label: 'Validata idonea',
      id: 2,
    },
    {
      label: 'Validata non idonea',
      id: 3,
    },
    {
      label: 'Sospesa',
      id: 4,
    },
  ];

  const gestisciStato = (value) => radioStatoCandidatura.find(el => el.label === value.label).id;

  return (
    <>
      <GroupFieldTitle
        title="Stato Candidatura"
      />
      <Row fluid margin="1em 0" justifycontent="flex-start">
        <RadioGroup
          noWrap
          display="inline-flex"
          spacing="0 2em 0 0"
          radioItems={radioStatoCandidatura}
          onBlur={() => handleFieldBlur('statoCandidatura')}
          selectedItem={radioStatoCandidatura.find(el => el.id === dataset.statoCandidatura)}
          onChange={(value) => {
            if (value.label) {
              setFormField('statoCandidatura', gestisciStato(value));
            }
          }}
          fontSize="f7"
          checkcolor="primary"
        />
      </Row>
      <Row fluid margin="1em 0">
        <Column xs="12" sm="8" md="7" padding="0">
          <FieldTitle
            label="Eventuali vincoli sulla candidatura"
            marginBottom="0"
          />
          <TextArea
            onChange={(value) => setFormField('vincoliCandidatura', value)}
            onBlur={() => handleFieldBlur('vincoliCandidatura')}
            placeholder="Scrivi qui..."
            inputValue={dataset.vincoliCandidatura}
            name="vincoliCandidatura"
            rows={3}
            error={errors.vincoliCandidatura}
            maxLength={STRING_MAX_VALIDATION.value}
          />
        </Column>
      </Row>
    </>
  );
};

StatoCandidatura.displayName = 'StatoCandidatura';

export default StatoCandidatura;


import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const NotaOperatore = () => {
  const { dataset, setFormField, errors, handleFieldBlur } = useFormContext();

  return (
    <Row fluid>
      <Column xs="12" sm="12" md="12" padding="0">
        <GroupFieldTitle
          title="Nota operatore"
        />
        <TextArea
          onChange={(value) => setFormField('notaOperatore', value)}
          onBlur={() => handleFieldBlur('notaOperatore')}
          placeholder="Scrivi qui..."
          inputValue={dataset.notaOperatore}
          name="notaOperatore"
          rows={6}
          error={errors.notaOperatore}
          maxLength={STRING_MAX_VALIDATION.value}
        />
      </Column>
    </Row>
  );
};

NotaOperatore.displayName = 'NotaOperatore';

export default NotaOperatore;

import React from 'react';
import { Row } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import TextArea from 'components/ui2/TextArea';

const NotaRecensioneComponent = ({ disabled }) => {
  const { dataset, setFormField } = useFormContext();

  return (
    <Row fluid padding="2.5rem 0 0 0">
      <TextArea
        material
        height="8.5rem"
        placeholder="Scrivi in questa sezione una breve recensione del servizio offerto da WeMi (max 1000 caratteri)"
        label="RECENSIONE"
        onChange={(valore) => { setFormField('scriviNota', valore); }}
        inputValue={dataset.scriviNota}
        readOnly={disabled}
      />
    </Row>
  );

};

NotaRecensioneComponent.displayName = 'Nota per wemi';

export const NotaRecensione = NotaRecensioneComponent;

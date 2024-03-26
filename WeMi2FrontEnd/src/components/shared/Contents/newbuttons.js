import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import { useFormContext } from 'libs/Form/hooks/useFormContext';

const Buttons = ({
  onCreate,
  onCancel,
}) => {
  const { isFormValid, dataset } = useFormContext();
  return (
    <Row margin="1rem 0" justifycontent="space-between">
      <Column xs="12" md="4" sizepadding={{ xs: '1rem 0', md: '0' }}>
        <Button
          label="Annulla"
          onClick={onCancel}
          color="red"
          ariaLabel="Annulla"
        />
      </Column>
      <Column xs="12" md="4" sizepadding={{ xs: '1rem 0', md: '0' }}>
        <Button
          label="Aggiungi"
          onClick={() => onCreate(dataset)}
          disabled={!isFormValid}
          ariaLabel="Aggiungi"
        />
      </Column>
    </Row>
  );
};

Buttons.displayName = 'Buttons Content';

export default React.memo(Buttons);

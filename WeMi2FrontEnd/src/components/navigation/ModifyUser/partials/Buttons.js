import React from 'react';
import Button from 'components/ui2/Button';
import { Column, Row } from 'components/ui/Grid';

const Buttons = React.memo(({
  isFormDirty,
  isFormValid,
  onCancel, // return back
  onSave, //save data and return back
  dataset
}) => {
  return (
    <Row fluid flex justifycontent="center">
      <Column padding="1em" lg="2" md="2" xs="5">
        <Button
          color="red"
          label="Annulla"
          width="100%"
          onClick={onCancel}
        />
      </Column>
      <Column padding="1em" lg="2" md="2" xs="5">
        <Button
          color="blue"
          label="Salva"
          width="100%"
          disabled={!(isFormDirty && isFormValid)}
          onClick={() => onSave(dataset)}
        />
      </Column>
    </Row>
  )
});

Buttons.displayName = 'ModificaUtenza - NavigationButtons';

export default Buttons;
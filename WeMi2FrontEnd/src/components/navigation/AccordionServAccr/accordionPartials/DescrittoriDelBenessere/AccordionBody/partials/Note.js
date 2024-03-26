import React from 'react';
import TextArea from 'components/ui2/TextArea';

const Note = ({
  Value,
  UpdateValue,
  Modifica,
}) => (
  <TextArea
    readOnly={!Modifica?.note}
    label="Indicazioni della redazione WeMi"
    color="blue"
    hoverColor="blue"
    inputValue={Value}
    onChange={(value) => { UpdateValue(value, 'note'); }}
    bgColor="lightYellow"
  />
);

Note.displayName = 'Body destinatari sezione note';

export default Note;

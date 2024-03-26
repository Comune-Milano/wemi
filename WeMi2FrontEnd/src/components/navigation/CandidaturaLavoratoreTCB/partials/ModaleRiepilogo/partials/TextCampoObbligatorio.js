/** @format */
import React from 'react';
import Text from 'components/ui/Text';

const TextCampoObbligatorio = ({
  value,
}) => (
    <Text
      value={`* ${value}`}
      fontStyle="italic"
      size="f7"
      color="red"
    />
  );

TextCampoObbligatorio.displayName = 'TextCampoObbligatorio';

export default TextCampoObbligatorio;

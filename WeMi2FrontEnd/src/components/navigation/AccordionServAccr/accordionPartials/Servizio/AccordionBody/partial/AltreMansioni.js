import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const AltreMansioni = ({ Value, UpdateValue, Modifica }) =>
(
  <TextArea
    material
    readOnly={!Modifica.campi}
    disabled={!Modifica.campi}
    name="Indicazioni sulle mansioni di cui si vuole il censimento"
    intlFormatter
    color="blue"
    maxLength={STRING_MAX_VALIDATION.value}
    label="Indicazioni sulle mansioni di cui si vuole il censimento"
    inputValue={getObjectValue(Value, 'value', '')}
    onChange={UpdateValue}
  />

);

AltreMansioni.displayName = 'AltreMansioni';
export default AltreMansioni;

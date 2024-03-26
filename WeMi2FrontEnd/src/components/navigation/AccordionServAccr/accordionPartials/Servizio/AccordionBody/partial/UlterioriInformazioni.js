import React from 'react';
import TextArea from 'components/ui2/TextArea';
import { noop } from 'utils/functions/noop';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const UlterioriInformazioniComponent = ({ value, setForm, modifica }) => (
  <TextArea
    inputValue={value}
    label="ULTERIORI INFORMAZIONI"
    color="blue"
    maxLength={STRING_MAX_VALIDATION.value}
    disabled={!modifica.campi}
    onChange={modifica.campi ? setForm : noop}
    ariaLabel="Indicare le eventuali ulteriori informazioni sul vostro servizio"
  />
  );

UlterioriInformazioniComponent.displayName = 'ULTERIORI Informazioni component';

export const UlterioriInformazioni = UlterioriInformazioniComponent;

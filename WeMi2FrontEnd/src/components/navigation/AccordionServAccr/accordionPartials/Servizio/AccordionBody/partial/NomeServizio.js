import React from 'react';
import Input from 'components/ui2/Input';
import { noop } from 'utils/functions/noop';

const NomeServizioComponent = ({ value, setForm, modifica }) => (
  <Input
    inputValue={value}
    // placeholder="Inserisci il nome del servizio"
    aria-label="Indicare l'eventuale nome con cui il vostro servizio è comunemente conosciuto"
    label="Nome del servizio"
    disabled={!modifica.campi}
    onChange={modifica.campi ? setForm : noop}
    color="blue"
  />
  );

NomeServizioComponent.displayName = 'Nome servizio component';

export const NomeServizio = NomeServizioComponent;

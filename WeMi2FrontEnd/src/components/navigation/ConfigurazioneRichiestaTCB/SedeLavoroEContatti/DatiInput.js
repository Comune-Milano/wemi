/** @format */

import React, { useEffect, useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import DatePicker from 'components/ui2/DatePicker';
import Select from 'components/ui2/Select';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';


const DatiInput = ({
    dataset,
    setFormField,
    errors,
    touched,
    handleFieldBlur,
    Stati,
    locale,
}) => {
  const [lingueItems, setLingueItems] = useState([]);
  useEffect(() => {
    const arr = [];
    Stati.forEach(element => {
      arr.push(
        {
          id: element.cdDominioTcb,
          value: element.tlValoreTestuale[locale],
        }
            );
    });
    setLingueItems(arr);
  }, [Stati]);

  useEffect(() => {
    if (lingueItems) {
      if (!dataset?.stato_utente?.id) {
        return;
      }
      for (let i = 0; i < lingueItems.length; i += 1) {
        if (lingueItems[i].id === dataset.stato_utente.id) {
          setFormField('stato_utente', lingueItems[i]);
          break;
        }
      }
    }
  }, [lingueItems]);

  return (
    <Row fluid margin="1em 0 0 0">
      <Column xs="12" md="4" padding="0 0 1em 0" sizepadding={{ md: '0 .5em 2em 0' }}>
        <Input
          label="Nome"
          onChange={(value) => { setFormField('nome_utente', value); }}
          onBlur={() => { handleFieldBlur('nome_utente'); }}
          inputValue={dataset.nome_utente}
          error={touched.nome_utente && errors.nome_utente}
          maxLength={STRING_MAX_VALIDATION.value}
          required
        />
      </Column>
      <Column xs="12" md="4" padding="0 0 1em 0" sizepadding={{ md: '0 .5em 2em .5em' }}>
        <Input
          label="Cognome"
          onChange={(value) => { setFormField('cognome_utente', value); }}
          inputValue={dataset.cognome_utente}
          onBlur={() => { handleFieldBlur('cognome_utente'); }}
          error={touched.cognome_utente && errors.cognome_utente}
          maxLength={STRING_MAX_VALIDATION.value}
          required
        />
      </Column>
      <Column xs="12" md="4" padding="0 0 1em 0" sizepadding={{ md: '0 0 2em .5em' }}>
        <Input
          label="Codice Fiscale"
          onChange={(value) => { setFormField('codice_fiscale_utente', value); }}
          inputValue={dataset.codice_fiscale_utente}
          onBlur={() => { handleFieldBlur('codice_fiscale_utente'); }}
          error={touched.codice_fiscale_utente && errors.codice_fiscale_utente}
          maxLength={16}
          required
        />
      </Column>

      <Column xs="12" md="4" padding="0 0 1em 0" sizepadding={{ md: '0 .5em 2em 0' }}>
        <Input
          label="Luogo di Nascita"
          onChange={(value) => { setFormField('luogo_utente', value); }}
          inputValue={dataset.luogo_utente}
          onBlur={() => { handleFieldBlur('luogo_utente'); }}
          error={touched.luogo_utente && errors.luogo_utente}
          maxLength={STRING_MAX_VALIDATION.value}
          required
        />
      </Column>
      <Column xs="12" md="4" padding="0 0 1em 0" sizepadding={{ md: '0 .5em 2em .5em' }}>
        <Select
          enableSearch
          label="Stato di Nascita"
          required
          onBlur={() => { handleFieldBlur('stato_utente'); }}
          error={touched.stato_utente && errors.stato_utente}
          items={lingueItems}
          selectedValue={dataset.stato_utente}
          clickedSelectedItem={() => {
            setFormField('stato_utente', undefined);
          }}
          clickedItem={(value) => {
            setFormField('stato_utente', value);
          }}
          placeholder="Seleziona lo stato di nascita"
          maxHeight="17.5rem"
          labelSelected="stato di nascita"
        />
      </Column>
      <Column xs="12" md="4" padding="0 0 1em 0" sizepadding={{ md: '0 0 2em .5em' }}>
        <DatePicker
          required
          label="Data di Nascita"
          onBlur={() => handleFieldBlur('data_utente')}
          onChange={(day, value) => {
            const date = day || value;
            setFormField('data_utente', date || undefined);
          }}
          selectedDate={dataset.data_utente}
          error={touched.data_utente && errors.data_utente}
        />
      </Column>
      <Column xs="12" md="4" padding="0 0 1em 0" sizepadding={{ md: '0 .5em 0 0' }}>
        <Input
          label="Telefono"
          onChange={(value) => { setFormField('telefono_utente', value); }}
          inputValue={dataset.telefono_utente}
          onBlur={() => { handleFieldBlur('telefono_utente'); }}
          error={touched.telefono_utente && errors.telefono_utente}
          required
        />
      </Column>
      <Column xs="12" md="8" padding="0" sizepadding={{ md: '0 0 0 .5em' }}>
        <Input
          label="E-Mail"
          onChange={(value) => { setFormField('email_utente', value); }}
          inputValue={dataset.email_utente}
          onBlur={() => { handleFieldBlur('email_utente'); }}
          error={touched.email_utente && errors.email_utente}
          maxLength={STRING_MAX_VALIDATION.value}
          required
        />
      </Column>

    </Row>
  );
};

DatiInput.displayName = 'DatiInput';


export default DatiInput;

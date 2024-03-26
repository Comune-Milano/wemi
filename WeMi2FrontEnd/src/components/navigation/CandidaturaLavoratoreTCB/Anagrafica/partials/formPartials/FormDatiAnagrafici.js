/** @format */

import React from 'react';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import Select from 'components/ui2/Select';
import DatePicker from 'components/ui2/DatePicker';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import withAuthentication from 'hoc/withAuthentication';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const FormDatiAnagrafici = ({
  dataset,
  contatti,
  setFormField,
  sessoFieldsValues,
  statoNascitaFieldsValues,
  userInfo,
  errors,
  touched,
  handleFieldBlur,
}) => {
  // const DatiLogin = userProfile.datiLogin;

  const onChange = (value) => {
    setFormField('datiAnagrafici', {
      datiAccount: value,
      nome: value ? userInfo.nome : undefined,
      cognome: value ? userInfo.cognome : undefined,
      sesso: dataset.sesso,
      luogoNascita: dataset.luogoNascita,
      statoNascita: dataset.statoNascita,
      dataNascita: value ? userInfo.birthday : undefined,
      codiceFiscale: value ? userInfo.codiceFiscale : undefined,
      cittadinanza: dataset.cittadinanza, // non presente
    });
    setFormField('contatti', {
      telefono1: contatti.telefono1,
      email: value ? userInfo.email : undefined, // da aggiungere si trova su Dati personali da vedere
      telefono2: contatti.telefono2,
    });
  };

  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <Checkbox
          value={dataset.datiAccount}
          onChange={(value) => {
            onChange(value);
            // da implementare con lo userProfile fatto bene cioè con tutti i dati che si trova sulla branch da testare per ora è momentaneo
          }}
          label="Usa i dati del tuo account"
          checkcolor="primary"
          width="auto"
        />
      </div>
      <Row fluid justifycontent="space-between">
        <GroupFieldTitle
          title="Inserisci i tuoi dati anagrafici"
        />
      </Row>

      <Row fluid>
        <Column xs="12" md="4" padding="0 1em 1em 0">
          <Input
            label="Nome"
            onChange={(value) => {
              setFormField('datiAnagrafici', {
                datiAccount: false,
                nome: value,
                cognome: dataset.cognome,
                sesso: dataset.sesso,
                luogoNascita: dataset.luogoNascita,
                statoNascita: dataset.statoNascita,
                dataNascita: dataset.dataNascita,
                codiceFiscale: dataset.codiceFiscale,
                cittadinanza: dataset.cittadinanza,
              });
            }}
            onBlur={() => { handleFieldBlur('datiAnagrafici.nome'); }}
            inputValue={dataset.nome}
            error={touched['datiAnagrafici.nome'] && errors['datiAnagrafici.nome']}
            maxLength={STRING_MAX_VALIDATION.value}
            required
          />
        </Column>
        <Column xs="12" md="4" padding="0 1em 1em 0">
          <Input
            label="Cognome"
            onChange={(value) => {
              setFormField('datiAnagrafici', {
                datiAccount: false,
                nome: dataset.nome,
                cognome: value,
                sesso: dataset.sesso,
                luogoNascita: dataset.luogoNascita,
                statoNascita: dataset.statoNascita,
                dataNascita: dataset.dataNascita,
                codiceFiscale: dataset.codiceFiscale,
                cittadinanza: dataset.cittadinanza,
              });
            }}
            inputValue={dataset.cognome}
            onBlur={() => { handleFieldBlur('datiAnagrafici.cognome'); }}
            error={touched['datiAnagrafici.cognome'] && errors['datiAnagrafici.cognome']}
            maxLength={STRING_MAX_VALIDATION.value}
            required
          />
        </Column>
        <Column xs="12" md="4" padding="0 1em 1em 0">
          <Select
            name="datiAnagraficiLavoratore-sesso"
            label="Sesso"
            onBlur={() => { handleFieldBlur('datiAnagrafici.sesso'); }}
            error={touched['datiAnagrafici.sesso'] && errors['datiAnagrafici.sesso']}
            required
            items={sessoFieldsValues}
            selectedValue={sessoFieldsValues.find(el => el.id === dataset.sesso)}
            clickedItem={(value) => {
              setFormField('datiAnagrafici', {
                datiAccount: false,
                nome: dataset.nome,
                cognome: dataset.cognome,
                sesso: value.id,
                luogoNascita: dataset.luogoNascita,
                statoNascita: dataset.statoNascita,
                dataNascita: dataset.dataNascita,
                codiceFiscale: dataset.codiceFiscale,
                cittadinanza: dataset.cittadinanza,
              });
            }}
            clickedSelectedItem={() => {
              setFormField('datiAnagrafici', {
                datiAccount: false,
                nome: dataset.nome,
                cognome: dataset.cognome,
                sesso: undefined,
                luogoNascita: dataset.luogoNascita,
                statoNascita: dataset.statoNascita,
                dataNascita: dataset.dataNascita,
                codiceFiscale: dataset.codiceFiscale,
                cittadinanza: dataset.cittadinanza,
              });
            }}
            placeholder="Seleziona il sesso"
          />
        </Column>
        <Column xs="12" md="4" padding="0 1em 1em 0">
          <Input
            label="Luogo di Nascita"
            onChange={(value) => {
              setFormField('datiAnagrafici', {
                datiAccount: dataset.datiAccount,
                nome: dataset.nome,
                cognome: dataset.cognome,
                sesso: dataset.sesso,
                luogoNascita: value,
                statoNascita: dataset.statoNascita,
                dataNascita: dataset.dataNascita,
                codiceFiscale: dataset.codiceFiscale,
                cittadinanza: dataset.cittadinanza,
              });
            }}
            inputValue={dataset.luogoNascita}
            onBlur={() => { handleFieldBlur('datiAnagrafici.luogoNascita'); }}
            error={touched['datiAnagrafici.luogoNascita'] && errors['datiAnagrafici.luogoNascita']}
            maxLength={STRING_MAX_VALIDATION.value}
            required
          />
        </Column>
        <Column xs="12" md="4" padding="0 1em 1em 0">
          <Select
            enableSearch
            name="datiAnagraficiLavoratore-statoNascita"
            label="Stato di Nascita"
            onBlur={() => { handleFieldBlur('datiAnagrafici.statoNascita'); }}
            error={touched['datiAnagrafici.statoNascita'] && errors['datiAnagrafici.statoNascita']}
            required
            items={statoNascitaFieldsValues}
            selectedValue={statoNascitaFieldsValues.find(el => el.id === dataset.statoNascita)}
            clickedSelectedItem={() => {
              setFormField('datiAnagrafici', {
                datiAccount: dataset.datiAccount,
                nome: dataset.nome,
                cognome: dataset.cognome,
                sesso: dataset.sesso,
                luogoNascita: dataset.luogoNascita,
                statoNascita: undefined,
                dataNascita: dataset.dataNascita,
                codiceFiscale: dataset.codiceFiscale,
                cittadinanza: dataset.cittadinanza,
              });
            }}
            clickedItem={(value) => {
              setFormField('datiAnagrafici', {
                datiAccount: dataset.datiAccount,
                nome: dataset.nome,
                cognome: dataset.cognome,
                sesso: dataset.sesso,
                luogoNascita: dataset.luogoNascita,
                statoNascita: value.id,
                dataNascita: dataset.dataNascita,
                codiceFiscale: dataset.codiceFiscale,
                cittadinanza: dataset.cittadinanza,
              });
            }}
            placeholder="Seleziona lo stato di nascita"
          />
        </Column>
        <Column xs="12" md="4" padding="0 1em 1em 0">
          <DatePicker
            required
            label="Data di Nascita"
            onBlur={() => handleFieldBlur('datiAnagrafici.dataNascita')}
            onChange={(day) => {
              setFormField('datiAnagrafici', {
                datiAccount: false,
                nome: dataset.nome,
                cognome: dataset.cognome,
                sesso: dataset.sesso,
                luogoNascita: dataset.luogoNascita,
                statoNascita: dataset.statoNascita,
                dataNascita: day,
                codiceFiscale: dataset.codiceFiscale,
                cittadinanza: dataset.cittadinanza,
              });
            }}
            selectedDate={dataset.dataNascita}
            error={touched['datiAnagrafici.dataNascita'] && errors['datiAnagrafici.dataNascita']}
          />
        </Column>
        <Column xs="12" md="4" padding="0 1em 1em 0">
          <Select
            enableSearch
            name="datiAnagraficiLavoratore-cittadinanza"
            label="Cittadinanza"
            onBlur={() => { handleFieldBlur('datiAnagrafici.cittadinanza'); }}
            error={touched['datiAnagrafici.cittadinanza'] && errors['datiAnagrafici.cittadinanza']}
            required
            items={statoNascitaFieldsValues}
            selectedValue={statoNascitaFieldsValues.find(el => el.id === dataset.cittadinanza)}
            clickedSelectedItem={() => {
              setFormField('datiAnagrafici', {
                datiAccount: dataset.datiAccount,
                nome: dataset.nome,
                cognome: dataset.cognome,
                sesso: dataset.sesso,
                luogoNascita: dataset.luogoNascita,
                statoNascita: dataset.statoNascita,
                dataNascita: dataset.dataNascita,
                codiceFiscale: dataset.codiceFiscale,
                cittadinanza: undefined,
              });
            }}
            clickedItem={(value) => {
              setFormField('datiAnagrafici', {
                datiAccount: dataset.datiAccount,
                nome: dataset.nome,
                cognome: dataset.cognome,
                sesso: dataset.sesso,
                luogoNascita: dataset.luogoNascita,
                statoNascita: dataset.statoNascita,
                dataNascita: dataset.dataNascita,
                codiceFiscale: dataset.codiceFiscale,
                cittadinanza: value.id,
              });
            }}
            placeholder="Seleziona la cittadinanza"
          />
        </Column>
        <Column xs="12" md="4" padding="0 1em 1em 0">
          <Input
            label="Codice Fiscale"
            onChange={(value) => {
              setFormField('datiAnagrafici', {
                datiAccount: false,
                nome: dataset.nome,
                cognome: dataset.cognome,
                sesso: dataset.sesso,
                luogoNascita: dataset.luogoNascita,
                statoNascita: dataset.statoNascita,
                dataNascita: dataset.dataNascita,
                codiceFiscale: value,
                cittadinanza: dataset.cittadinanza,
              });
            }}
            inputValue={dataset.codiceFiscale}
            onBlur={() => { handleFieldBlur('datiAnagrafici.codiceFiscale'); }}
            maxLength={16}
            error={touched['datiAnagrafici.codiceFiscale'] && errors['datiAnagrafici.codiceFiscale']}
            required
          />
        </Column>
      </Row>
    </>
  );
};

FormDatiAnagrafici.displayName = 'FormDatiAnagrafici';

export default withAuthentication(FormDatiAnagrafici);

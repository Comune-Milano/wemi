/** @format */

import React from 'react';
import Checkbox from 'components/ui2/Checkbox';
import moment from 'moment';
import { AMMINISTRATORE } from 'types/userRole';
import GroupFieldTitle from '../partials/GroupFieldTitle';
import DatiInput from './DatiInput';

const DatiAnagrafici = ({
    dataset,
    setFormField,
    datiUtente,
    errors,
    touched,
    handleFieldBlur,
    Stati,
    locale,
    datiLogin,
    setFormFields,
}) => {

  const settaValori = (value) => {
    if (value) {
      const nome = datiUtente.tx_nome_utente || datiLogin.Nome || undefined;
      const cognome = datiUtente.tx_cognome_utente || datiLogin.Cognome || undefined;
      const cf = datiUtente.ptx_codice_fiscale || datiLogin.CodiceFiscale || undefined;
      const data = datiUtente.dt_nascita && moment(datiUtente.dt_nascita).isValid() ? new Date(datiUtente.dt_nascita) : undefined;
      const email = datiUtente.ptx_email || datiLogin.Email || undefined;
      setFormFields({
        nome_utente: nome,
        cognome_utente: cognome,
        codice_fiscale_utente: cf,
        data_utente: data,
        email_utente: email,
        usaDatiAnagrafici: value,
      });
    } else {
      setFormFields({
        nome_utente: '',
        cognome_utente: undefined,
        codice_fiscale_utente: undefined,
        data_utente: undefined,
        email_utente: undefined,
        usaDatiAnagrafici: value,
      });
    }
  };


  return (
    <>
      <GroupFieldTitle
        title="Dati anagrafici"
        marginTop="0"
      />
      <div>
        {datiUtente && datiUtente.cd_profilo_utente !== AMMINISTRATORE ? (
          <Checkbox
            value={dataset.usaDatiAnagrafici}
            onChange={(value) => { settaValori(value); }}
            label="Usa i dati del tuo account"
            checkcolor="primary"
            width="auto"
          />
                  )
                    : null}
      </div>
      <DatiInput
        errors={errors}
        Stati={Stati.EstraiStatoNascita}
        locale={locale}
        dataset={dataset}
        setFormField={setFormField}
        touched={touched}
        handleFieldBlur={handleFieldBlur}
      />
    </>
  );
};

DatiAnagrafici.displayName = 'DatiAnagrafici';


export default DatiAnagrafici;

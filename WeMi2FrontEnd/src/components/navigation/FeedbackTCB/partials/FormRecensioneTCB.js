import React, { Fragment, useEffect } from 'react';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { Buttons } from './Buttons';
import { ValutazioneGenerale } from './ValutazioneGenerale';
import { RatingsForm } from './RatingsForm';
import { NotaRecensione } from './NotaRecensione';


const FormRecensioneTcbComponent = ({ recensione, isAdmin, datiLogin, getRecensione, isRilasciato, idRichiesta }) => {
  const { resetFormFields } = useFormContext();

  const disabledFormFields = isAdmin || isRilasciato;

  useEffect(() => {
    if (recensione && isRilasciato) {
      resetFormFields(recensione);
    }
  }, [recensione]);

  return (
    <Fragment>
      <ValutazioneGenerale
        disabled={disabledFormFields}
      />
      <RatingsForm
        disabled={disabledFormFields}
      />
      <NotaRecensione
        disabled={disabledFormFields}
      />

      <Buttons
        idRichiesta={idRichiesta}
        isRilasciato={isRilasciato}
        isAdmin={isAdmin}
        datiLogin={datiLogin}
        getRecensione={getRecensione}
      />

    </Fragment>
  );
};

FormRecensioneTcbComponent.displayName = 'Form rating wemi';

export const FormRecensioneTcb = FormRecensioneTcbComponent;

/** @format */

import React, { useState } from 'react';
import { Row } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { RecuperaUtente as RecuperaUtenteQ } from 'components/navigation/InserimentoCandidaturaTCB_IOO/partials/inserimentoCandGraphQl';
import Text from 'components/ui/Text';
import RecuperaUtente from './partials/RecuperaUtente';
import Anagrafica from './partials/Anagrafica';
import Buttons from './partials/Buttons';
import Wrapper from './partials/Wrapper';
import { isNullOrUndefined } from '../AccordionServAccr/accordionPartials/common/utils';
import ModaleUtenteNonTrovato from './partials/ModaleUtenteNonTrovato';

const InserimentoCandidatura = ({
    setInserisci,
    setFormField,
    resetFormFields,
    dataset,
    errors,
    touched,
    handleFieldBlur,
    isFormValid,
    datiLogin,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const fetchUtente = useStatelessGraphQLRequest(RecuperaUtenteQ);

  const recuperaUtente = async () => {
    try {
      const result = await fetchUtente({
        codicefiscale: dataset.codicefiscaleRicerca,
      });

      if (!isNullOrUndefined(result?.RecuperaUtente)) {
        resetFormFields({
          nome: result.RecuperaUtente.nome,
          cognome: result.RecuperaUtente.cognome,
          codicefiscale: result.RecuperaUtente.ptx_codice_fiscale,
          email: result.RecuperaUtente.ptx_email,
          codicefiscaleRicerca: dataset.codicefiscaleRicerca,
          recuperaDati: true,
          idUtente: result.RecuperaUtente.id_utente,
        });
      }
    } catch (error) {
      setOpenModal(true);
    }
  };

  return (
    <Row fluid>
      <Wrapper>
        <Text
          value="Ricerca utente per CF"
          size="f3"
          color="primary"
          padding="0 0 0.5em 0"
          tag="h3"
          align="center"
        />
        <RecuperaUtente
          dataset={dataset}
          errors={errors}
          setFormField={setFormField}
          setUtente={recuperaUtente}
          touched={touched}
          handleFieldBlur={handleFieldBlur}
          resetFormFields={resetFormFields}
        />
        <Anagrafica
          dataset={dataset}
          errors={errors}
          setFormField={setFormField}
          touched={touched}
          handleFieldBlur={handleFieldBlur}
        />
        <Buttons
          dataset={dataset}
          setInserisci={setInserisci}
          touched={touched}
          isFormValid={isFormValid}
          datiLogin={datiLogin}
        />
      </Wrapper>
      <ModaleUtenteNonTrovato
        open={openModal}
        setOpenModal={setOpenModal}
        dataset={dataset}
      />
    </Row>
  );
};

InserimentoCandidatura.displayName = 'Inserimento candidatura';

export default (InserimentoCandidatura);

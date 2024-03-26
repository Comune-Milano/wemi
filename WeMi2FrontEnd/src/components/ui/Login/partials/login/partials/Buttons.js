import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import NavLink from 'components/router/NavLink';
import withAuthentication from 'hoc/withAuthentication';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { CITTADINO, OPERATORE_ENTE, LAVORATORE } from 'types/userRole';

import { mapperUser } from 'services/Authentication/mapperUser';
import { estraiDatiUtente as estraiDatiUtenteQ } from './graphql/estraiDatiUtente';
const Buttons = ({
    array,
    errore,
    setShowComponent,
    showComponent,
    parolaChiave,
    setUserProfile,
    userProfile,
    openModal,
    open,
    setErrore,
    setSubmitted,
}) => {
  const estraiDatiUtente = useStatelessGraphQLRequest(estraiDatiUtenteQ);

  const StorageLoginNew = async () => {
    let Utente = { userId: parolaChiave };
    let loginSuccess = true;
    try {
      /**
       * Estraiamo in base a username il cittadino
       */
      const response = await estraiDatiUtente({ email: parolaChiave.username });
      Utente = mapperUser(response);
    } catch (e) {
      setErrore({ ...e, isErrored: true });
      setSubmitted(true);
      loginSuccess = false;
    }

    if (loginSuccess) {
      openModal(!open);
      setUserProfile({ ...userProfile, datiLogin: Utente });
      setErrore();
    } else {
      setSubmitted(true);
    }
  };

  return (
    <Row>
      <Column sm={6} xs={6}>
        <Button
          color="red"
          label="Indietro"
          type="button"
          onClick={() => {
            setShowComponent(!showComponent);
          }}
        />
      </Column>
      <Column sm={6} xs={6}>
        {
          !errore ?
            <Button onClick={StorageLoginNew} type="button" label="Accedi" /> : 
            <Button type="button" disabled label="Accedi" />
        }
      </Column>
    </Row>
  );
};

Buttons.displayName = 'Buttons';

export default withAuthentication(Buttons);

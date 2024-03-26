import React from 'react';
import { isNull, isUndefined } from 'util';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import withAuthentication from 'hoc/withAuthentication';
import { useHttpClient } from 'hooks/httpClient/useHttpClient';
import { withRouter } from 'react-router';
import FetchLogin from './FetchLogin';

const Buttons = ({ setSubmitted, formData, validita, setLoginErrorVisible, userProfile, setUserProfile }) => {
  const { performHttpRequest: fetchDatiAdmin } = useHttpClient();

  const onClickFunction = async () => {
    const risultato = await FetchLogin(formData, fetchDatiAdmin);

    if (isUndefined(risultato) || isNull(risultato.user)) {
      setLoginErrorVisible({ isErrored: true, error: risultato?.error });
      setSubmitted(true);
    } else if (isUndefined(risultato.user)) {
      setLoginErrorVisible({ isErrored: true, error: risultato?.error });
      setSubmitted(true);
    } else if (risultato.success) {
      const utente = {};
      const { user } = risultato;
      utente.Profilo = user.profileObject?.code;
      utente.Ruolo = user.profileObject?.description;
      utente.email = user.email;
      utente.Nome = user.name;
      utente.username = user.username;
      utente.idCittadino = user.idUtente;
      utente.Authorizations = user.authorizations;
      setUserProfile({ ...userProfile, datiLogin: utente });
    } else {
      setLoginErrorVisible({ isErrored: true, error: risultato.error });
      setSubmitted(true);
    }
  };
  return (
    <Row justifycontent="space-between">
      <Column xs={12} md={12}>
        <Button
          onClick={onClickFunction}
          label="Accedi"
          type="submit"
          name="access-button"
          disabled={validita}
        />
      </Column>
    </Row>
  );
};

Buttons.displayName = 'Buttons admin';

export default withAuthentication(withRouter(Buttons));

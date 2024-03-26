/** @format */

import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import checkCittadino from 'utils/functions/checkCittadino';
import checkEnte from 'utils/functions/checkEnte';
import RedirectAdmin from 'components/router/RedirectAdmin';
import checkAdmin from 'utils/functions/checkAdmin';
import LoginContainer from './LoginContainer';

const LoginPage = ({ userProfile }) => {
  const { datiLogin } = userProfile;
  const validitaCittadino = checkCittadino(datiLogin);
  const validitaEnte = checkEnte(datiLogin);
  const validitaAdmin = checkAdmin(datiLogin);
  return (
    <>
      {validitaCittadino || validitaEnte || validitaAdmin ?
        <RedirectAdmin />
        :
        <LoginContainer />
      }

    </>
  );
};

LoginPage.displayName = 'LoginPage';

export default withAuthentication(LoginPage);

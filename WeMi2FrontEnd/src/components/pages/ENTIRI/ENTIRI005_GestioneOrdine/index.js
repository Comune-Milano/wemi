/** @format */

import React from 'react';
import Wrapper from 'components/navigation/NavigationWrapper';
import HandleServiceOrder from 'components/navigation/HandleServiceOrder';
import checkCittadino from 'utils/functions/checkCittadino';
import RedirectAdmin from 'components/router/RedirectAdmin';
import { PAGE_HOME_URL } from 'types/url';
import { numberRegex } from 'libs/Form/validation/regex';
import { checkLoginHoc } from 'hoc/checklogin';
import withAuthentication from 'hoc/withAuthentication';
import HandleOrderHeader from './Header';

const HandleOrderPage = ({ userProfile, match, history }) => {
  const { datiLogin } = userProfile;
  const validitaCittadino = checkCittadino(datiLogin);

  const { idRichiestaServizio } = match.params;

  const regexRichiestaServizio = new RegExp(numberRegex, 'ig');

  if (!regexRichiestaServizio.test(idRichiestaServizio)) {
    history.push(PAGE_HOME_URL);
  }

  return (
    <Wrapper>
      {validitaCittadino ? (
        <>
          <HandleOrderHeader />
          <HandleServiceOrder />
        </>
      )
        : <RedirectAdmin />}
    </Wrapper>
  );
};

HandleOrderPage.displayName = 'HandleOrderPage';

export default checkLoginHoc(withAuthentication(HandleOrderPage));

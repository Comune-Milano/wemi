/** @format */

import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import { Row, Column } from 'components/ui/Grid';
import FeedbackTCB from 'components/navigation/FeedbackTCB';
import {
    withRouter, generatePath,
} from 'react-router-dom';
import withAuthentication from 'hoc/withAuthentication';
import Header from 'components/ui2/Header';
import checkAdmin from 'utils/functions/checkAdmin';
import { PAGE_HOME_URL, PAGE_TCB_ADMIN_ERI_001, PAGE_AREAPERSONALE_URL } from 'types/url';


const RecensioneTCB = ({ match, userProfile, history }) => {
  const idRichiesta = parseInt(match.params.idRichiesta, 10);

  const { datiLogin } = userProfile;

  if (!checkAdmin(datiLogin)) {
    history.push(PAGE_HOME_URL);
  }

  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: PAGE_HOME_URL,
    },
    {
      slash: 'Area personale',
      url: PAGE_AREAPERSONALE_URL,
    },
    {
      slash: 'Gestione richieste di servizio TCB',
      url: generatePath(PAGE_TCB_ADMIN_ERI_001, { idOperatore: datiLogin.idCittadino }),
    },
    {
      slash: 'Visualizza recensione servizio TCB',
      url: match.url,
    },
  ];


  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      <Header fontSize="f4" title="Valuta il servizio di ricerca Tate Colf e Badanti" color="primary" />
      <Row fluid>
        <Column xs="12" md="8" lg="7" padding="0 0 0 0">
          <FeedbackTCB
            match={match}
            idRichiesta={idRichiesta}
            isAdmin
            datiLogin={datiLogin}
          />
        </Column>
      </Row>
    </Wrapper>
  );
};

RecensioneTCB.displayName = 'RecensioneTCB Admin page';

export default withRouter(withAuthentication(RecensioneTCB));

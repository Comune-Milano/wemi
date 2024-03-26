
import React from 'react';
import withAuthentication from "hoc/withAuthentication";
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Redirect } from "react-router-dom";
import CandidaturaLavoratoreTCB from 'components/navigation/CandidaturaLavoratoreTCB';
import { PAGE_TCBMEN003_URL } from 'types/url';

const CandidaturaLavoratoreTCBPage = ({
  userProfile,
}) => {

  const BreadcrumbPath = [
    {
      slash: 'Tate Colf Badanti',
      url: 'menutcb',
    },
    {
      slash: 'Lavora come assistente familiare',
      url: 'menutcb/lavoratore',
    },
    {
      slash: 'Invia la tua candidatura',
      url: window.location.pathname,
    },
  ];

  const { datiLogin } = userProfile;

  if (!datiLogin) {
    return <Redirect to={PAGE_TCBMEN003_URL} />;
  }

  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      <CandidaturaLavoratoreTCB idOperatore={datiLogin.idCittadino} idLavoratore={datiLogin.idCittadino} />
    </Wrapper>
  );
};

CandidaturaLavoratoreTCBPage.displayName = 'CandidaturaLavoratoreTCBPage';

export default withAuthentication(CandidaturaLavoratoreTCBPage);

/** @format */

import React from 'react';
import { PUBLIC_URL } from 'types/url';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import checkAdmin from 'utils/functions/checkAdmin';
import { Redirect } from 'react-router';
import withAuthentication from '../../../hoc/withAuthentication';
import BackofficeTcbAssociaLavoratoriRichiesta from '../../pages/TCB/TCB_ADMIN_ERI_002/backofficeTcbAssociaLavoratoriRichiesta';

const BackofficeTcbAssociaLavoratoriRichiestaPage = ({ userProfile, location }) => {
  const isAdmin = checkAdmin(userProfile.datiLogin);
  const breadcrumbPaths = location.state && location.state.isFromMatching ? 
  [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Area personale',
      url: 'areaPersonale',
    },
    {
      slash: 'Gestione Richieste di Servizio TCB',
      url: `admin/${userProfile.datiLogin.idCittadino}/richiesteTcb`,
    },
    {
      slash: 'Associazione lavoratore con domanda',
      url: `admin/matchingDomandaLavoratore/${location.state.idRichiesta}`,
    },
    {
      slash: 'Associa Domanda offerta',
    },
  ] : [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Area personale',
      url: 'areaPersonale',
    },
    {
      slash: 'Gestione Richieste di Servizio TCB',
      url: `admin/${userProfile.datiLogin.idCittadino}/richiesteTcb`,
    },
    {
      slash: 'Associa Domanda offerta',
    },
  ];

  if (isAdmin) {
    return (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPaths} />
        <BackofficeTcbAssociaLavoratoriRichiesta />
      </Wrapper>
    );
  }

  return (<Redirect to={`${PUBLIC_URL}/`} />);
};

BackofficeTcbAssociaLavoratoriRichiestaPage.displayName = 'BackofficeTcbAssociaLavoratoriRichiestaPage';
export default withAuthentication(BackofficeTcbAssociaLavoratoriRichiestaPage);

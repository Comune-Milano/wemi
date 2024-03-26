
import React from 'react';
import withAuthentication from "hoc/withAuthentication";
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Header from 'components/ui2/Header';
import { Redirect, generatePath } from "react-router-dom";
import CandidaturaLavoratoreTCB from 'components/navigation/CandidaturaLavoratoreTCB';
import { PAGE_TCBMEN003_URL, PAGE_MATCHING_DOMANDA_LAVORATORE_URL } from 'types/url';
import FinalizzaCandidaturaLavoratoreTCB from 'components/navigation/FinalizzaCandidaturaLavoratoreTCB';
import { getObjectValue } from 'utils/extensions/objectExtensions';

const FinalizzaCandidaturaLavoratoreTCBPage = ({
  userProfile,
  match,
  location,
}) => {
  const idRichiesta = getObjectValue(location, 'state.idRichiesta', undefined);
  /** TODO: Da modificare per Admin */
  let BreadcrumbPath = [
    {
      slash: 'Area Personale',
      url: 'areaPersonale',
    },
    {
      slash: 'Gestione candidature lavoratore',
      url: `admin/${userProfile.datiLogin.idCittadino}/candidatureLavoratoriTcb`,
    },
    {
      slash: 'Modifica candidatura',
      url: `admin/ModificaCandidaturaLavoratore/${match.params.idLavoratore}`,
    },
    {
      slash: 'Finalizza candidatura',
      url: match.url,
    },
  ];

  if (idRichiesta) {
    BreadcrumbPath = [
      {
        slash: 'Area Personale',
        url: 'areaPersonale',
      },
      {
        slash: 'Gestione Richieste di Servizio TCB',
        url: `admin/${getObjectValue(userProfile, 'datiLogin.idCittadino')}/richiesteTcb`,
      },
      {
        slash: 'Associazione lavoratore con domanda',
        url: generatePath(PAGE_MATCHING_DOMANDA_LAVORATORE_URL, { idDomanda: idRichiesta }),
      },
      {
        slash: 'Modifica candidatura',
        url: `admin/ModificaCandidaturaLavoratore/${match.params.idLavoratore}`,
        state: getObjectValue(location, 'state', undefined),
      },
      {
        slash: 'Finalizza candidatura',
        url: match.url,
      },
    ];
  }

  const { datiLogin } = userProfile;

  /** TODO: Da modificare per Admin */
  if (!datiLogin) {
    return <Redirect to={PAGE_TCBMEN003_URL} />;
  }

  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      <Header fontSize="f4" title="Dati operatore" color={'primary'} />
      <FinalizzaCandidaturaLavoratoreTCB idOperatore={datiLogin.idCittadino} idLavoratore={parseInt(match.params.idLavoratore, 10)} />
    </Wrapper>
  );
};

FinalizzaCandidaturaLavoratoreTCBPage.displayName = 'FinalizzaCandidaturaLavoratoreTCBPage';

export default withAuthentication(FinalizzaCandidaturaLavoratoreTCBPage);

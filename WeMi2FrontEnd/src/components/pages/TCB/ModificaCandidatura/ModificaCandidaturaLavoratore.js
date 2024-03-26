import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Redirect } from 'react-router-dom';
import CandidaturaLavoratoreTCB from 'components/navigation/CandidaturaLavoratoreTCB';
import { PAGE_TCBMEN003_URL } from 'types/url';
import moment from 'moment';
import { useAuthGraphQLRequest } from 'hooks/authRequest/useAuthGraphQLRequest';
import {
  inizializzaUtenteLav as inizializzaUtenteLavM,
} from 'components/navigation/CandidaturaLavoratoreTCB/graphQLRequests/graphQLRequests';

const ModificaCandidaturaLavoratore = ({ userProfile }) => {
  const { datiLogin } = userProfile;

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


  const [createUtenteLav] = useAuthGraphQLRequest(
    undefined,
    inizializzaUtenteLavM,
    { idUtenteLav: datiLogin?.idCittadino },
    true
  );

  if (!datiLogin) {
    return <Redirect to={PAGE_TCBMEN003_URL} />;
  }

  const userInfo = {
    idLavoratore: datiLogin.idCittadino,
    nome: datiLogin.Nome,
    cognome: datiLogin.Cognome,
    // è stato inserito "0" per indicare che non c'è il sesso
    sesso: datiLogin.Sesso ? datiLogin.Sesso === 1 ? 2 : 1 : '0',
    anagraficaResidenza: datiLogin.DatiPersonali,
    codiceFiscale: datiLogin.CodiceFiscale,
    email: datiLogin.Email ? datiLogin.Email : null,
    birthday: datiLogin.birthday ? new Date(datiLogin.birthday) : null,
  };
  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      {!createUtenteLav.isLoading && !createUtenteLav.errored && !createUtenteLav.pristine ?
        <CandidaturaLavoratoreTCB userInfo={userInfo}></CandidaturaLavoratoreTCB>
      : null}
    </Wrapper>
  );
};

ModificaCandidaturaLavoratore.displayName = 'ModificaCandidaturaLavoratore';

export default withAuthentication(ModificaCandidaturaLavoratore);

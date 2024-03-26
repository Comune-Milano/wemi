import React from 'react';
import { withRouter, Redirect, generatePath } from 'react-router-dom';
import Wrapper from 'components/navigation/NavigationWrapper';

import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import {
  EstraiInfoUtente as EstraiInfoUtenteQ,
} from 'components/navigation/ConfigurazioneRichiestaTCB/SedeLavoroEContatti/partials/graphQLTCBIRI008';
import CandidaturaLavoratoreTCB from 'components/navigation/CandidaturaLavoratoreTCB';
import Loader from 'components/ui/Loader';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { PAGE_MATCHING_DOMANDA_LAVORATORE_URL } from 'types/url';

const ModificaCandidaturaAdmin = ({ match, location, userProfile }) => {
  const { datiLogin } = userProfile;

  let BreadcrumbPath = [
    {
      slash: 'Area Personale',
      url: 'areaPersonale',
    },
    {
      slash: 'Gestione Candidature lavoratore',
      url: `admin/${getObjectValue(userProfile, 'datiLogin.idCittadino')}/candidatureLavoratoriTcb`,
    },
    {
      slash: 'Modifica candidatura',
      url: match.url,
    },
  ];

  const idRichiesta = getObjectValue(location, 'state.idRichiesta', undefined);

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
        url: match.url,
      },
    ];
  }

  const [datiUtente] = useGraphQLRequest(
    undefined,
    EstraiInfoUtenteQ,
    { idUtente: parseInt(match.params.idLavoratore, 10) },
    true,
    response => ({
      idLavoratore: response.datiUtente.id_utente,
      nome: response.datiUtente.tx_nome_utente,
      cognome: response.datiUtente.tx_cognome_utente,
      sesso: response.datiUtente.cd_sesso_utente,
      anagraficaResidenza: response.datiUtente.js_anagrafica_residenza,
      codiceFiscale: response.datiUtente.ptx_codice_fiscale,
      birthday: response.datiUtente.dt_nascita ? new Date(response.datiUtente.dt_nascita) : null,
    })
  );

  if (datiUtente.pristine) {
    return null;
  }

  if (datiUtente.isLoading) {
    return <Loader />;
  }

  if (!checkAdmin(datiLogin)) {
    return <Redirect to="areaPersonale" />;
  }

  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      <CandidaturaLavoratoreTCB
        idOperatore={datiLogin.idCittadino}
        userInfo={datiUtente.data}
      />
    </Wrapper>
  );
};

ModificaCandidaturaAdmin.displayName = 'ModificaCandidaturaAdmin';

const ModificaCandidaturaAdminWithAuthentication = withAuthentication(ModificaCandidaturaAdmin);

export default withRouter(ModificaCandidaturaAdminWithAuthentication);

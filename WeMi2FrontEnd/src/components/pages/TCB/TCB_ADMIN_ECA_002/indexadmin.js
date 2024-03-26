/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import {
  DatiLavoratoreCandidatura as DatiLavoratoreCandidaturaQ,
  StoricoLavoratoreFiltro as StoricoLavoratoreFiltroQ,
} from 'components/navigation/StoricoOpportunita/partials/DatilavoratoreGraphql/';
import StoricoOpportunita from 'components/navigation/StoricoOpportunita';
import Loader from 'components/ui/Loader';
import { withRouter } from 'react-router-dom';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import Header from 'components/ui2/Header';

const WeMiStoricoOpportunitaAdmin = ({
  locale,
  loaded,
  location,
  match,
  userProfile,
}) => {
  const idRichiesta = location.state ? location.state.idRichiesta ? location.state.idRichiesta : null : null;

  const { datiLogin } = userProfile;

  const idLavoratore = Number(match.params.idLavoratore) || null;

  const [filters, setFilters] = useState({
    statoOpportunita: { id: '', value: 'Tutti gli stati' },
    dataOfferta: undefined,
  });

  const [datiCandidatura] = useGraphQLRequest(
    undefined,
    DatiLavoratoreCandidaturaQ,
    { id_utente: idLavoratore },
    true
  );

  const [datiStorico, datiStoricoRequest] = useGraphQLRequest(
    undefined,
    StoricoLavoratoreFiltroQ,
    {
      id_utente: idLavoratore,
      cd_stato_ric_serv_ente: '11',
      cd_stato_associazione: String(filters.statoOpportunita.id),
      dataOfferta: filters.dataOfferta,
      locale,
    },
    true
  );

  useEffect(() => {
    datiStoricoRequest();
  }, [filters]);

  let BreadcrumbPaths;

  if (checkAdmin(userProfile.datiLogin) && idRichiesta) {
    BreadcrumbPaths = [
      {
        slash: 'Home',
        url: '',
      },
      {
        slash: 'Area personale',
        url: 'areaPersonale',
      },
      {
        slash: 'Gestione richieste di servizio TCB',
        url: `admin/${datiLogin.idCittadino}/richiesteTcb`,
      },
      {
        slash: 'Associazione lavoratore con domanda',
        url: `admin/matchingDomandaLavoratore/${idRichiesta}`,
      },
      {
        slash: 'Gestione Storico opportunità lavoratore',
        url: `r/StoricoLavoratore/${idLavoratore}`,
      },
    ];
  } else if (checkAdmin(userProfile.datiLogin) && !idRichiesta) {
    BreadcrumbPaths = [
      {
        slash: 'Home',
        url: '',
      },
      {
        slash: 'Area personale',
        url: 'areaPersonale',
      },
      {
        slash: 'Gestione Candidature Lavoratori Tate, Colf e Badanti',
        url: `admin/${datiLogin.idCittadino}/candidatureLavoratoriTcb`,
      },
      {
        slash: 'Gestione Storico opportunità lavoratore',
        url: `/admin/r/StoricoLavoratore/${idLavoratore}`,
      },
    ];
  }

  const dataLoaded = !datiCandidatura.pristine && !datiCandidatura.isLoading && !datiCandidatura.errored &&
                     !datiStorico.errored && !datiStorico.pristine && !datiStorico.isLoading;

  if (!dataLoaded) {
    return <Loader />;
  }

  const nomeCognome = dataLoaded && datiCandidatura.data && `${datiCandidatura.data.cognome || ''} ${datiCandidatura.data.nome || ''}`;

  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPaths} />
      <Row fluid>
        <Header fontSize="f4" title={`Storico delle richieste ${nomeCognome}`} color="blue" />
        { dataLoaded ? (
          <StoricoOpportunita
            locale={locale}
            loaded={loaded}
            dati={datiCandidatura && datiCandidatura.data}
            datistorico={datiStorico && datiStorico.data}
            setFilters={setFilters}
            filters={filters}
          />
        ) : null}
      </Row>
    </Wrapper>
  );
};

WeMiStoricoOpportunitaAdmin.displayName = 'WeMiStoricoOpportunitaAdmin';


const mapStoreToProps = store => ({
  locale: store.locale,
  loaded: store.graphql.loaded,
});

export default withRouter(withAuthentication(connect(mapStoreToProps)(WeMiStoricoOpportunitaAdmin)));

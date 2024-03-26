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
import checkLavoratore from 'utils/functions/checkLavoratore';
import Header from 'components/ui2/Header';
import { PAGE_HOME_URL } from 'types/url';

const WeMiStoricoOpportunita = ({
  locale,
  loaded,
  location,
  match,
  userProfile,
  history,
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

  const BreadcrumbPaths = [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Area personale',
      url: 'AreaPersonale',
    },
    {
      slash: 'Proposte di lavoro',
      url: `r/StoricoLavoratore/${idLavoratore}`,
    },
  ];

  const dataLoaded = !datiCandidatura.pristine && !datiCandidatura.isLoading && !datiCandidatura.errored &&
                     !datiStorico.errored && !datiStorico.pristine && !datiStorico.isLoading;

  if (!dataLoaded) {
    return <Loader />;
  }

  const nome = dataLoaded && datiCandidatura.data && `${datiCandidatura.data.nome || ''}`;

  if (!checkLavoratore(datiLogin)) {
    history.push(PAGE_HOME_URL);
  }

  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPaths} />
      <Row fluid>
        <Header fontSize="f4" title={`Proposte di lavoro per ${nome}`} color="blue" />
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

WeMiStoricoOpportunita.displayName = 'WeMiStoricoOpportunita';


const mapStoreToProps = store => ({
  locale: store.locale,
  loaded: store.graphql.loaded,
});

export default withRouter(withAuthentication(connect(mapStoreToProps)(WeMiStoricoOpportunita)));

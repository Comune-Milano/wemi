/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import EntRecensione from 'components/navigation/EntRecensione';
import Wrapper from 'components/navigation/NavigationWrapper';
import Header from 'components/ui2/Header';
import withAuthentication from 'hoc/withAuthentication';
import checkEnte from 'utils/functions/checkEnte';
import RedirectAdmin from 'components/router/RedirectAdmin';
import checkAdmin from 'utils/functions/checkAdmin';
import { withRouter } from 'react-router';
import { numberRegex } from 'libs/Form/validation/regex';
import { PAGE_HOME_URL } from 'types/url';

const EntFeedbackPage = ({ loaded, userProfile, location, match, history }) => {
  // const DatiLogin = JSON.parse(sessionStorage.getItem('DatiLogin'))
  const { datiLogin } = userProfile;
  const validitaEnte = checkEnte(datiLogin);
  const validitaAdmin = checkAdmin(datiLogin);
  const { idRichiesta } = match.params;

  const regexRichiesta = new RegExp(numberRegex, 'ig');

  if (!regexRichiesta.test(idRichiesta)) {
    history.push(PAGE_HOME_URL);
  }

  if (validitaEnte) {
    const BreadcrumbPath = [
      {
        slash: 'Home',
        url: '',
      },
      {
        slash: 'Area Personale',
        url: 'AreaPersonale/',
      },
      {
        slash: 'Gestione Richieste Servizi Ente',
        url: `e/${datiLogin.idEnte}/handleRequests`,
      },
      {
        slash: `Recensione richiesta di servizio ${idRichiesta}`,
        url: `admin/rec/${idRichiesta}`,
      },
    ];
    return (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Header loading={loaded === 1} fontSize="f4" title="Recensione servizio" color="blue" />
        <Row fluid margin="1em 0">
          <Column xs="12" md="8" lg="7" padding="0 0 0 0">
            <EntRecensione readOnly={false} />
          </Column>
        </Row>
      </Wrapper>
    );
  }
  if (validitaAdmin) {
    const BreadcrumbPath = location.state && location.state.isFromBackoffice ?
    [
      {
        slash: 'Home',
        url: '',
      },
      {
        slash: 'Area Personale',
        url: 'areaPersonale',
      },
      {
        slash: 'Gestione Candidature Lavoratori Tate, Colf e Badanti',
        url: `admin/${datiLogin.idCittadino}/candidatureLavoratoriTcb`,
      },
      {
        slash: 'Gestione Storico opportunità lavoratore',
        url: `r/StoricoLavoratore/${location.state.idLavoratore}`,
      },
      {
        slash: `Recensione richiesta di servizio ${idRichiesta}`,
        url: `admin/rec/${idRichiesta}`,
      },
    ] :
    [
      {
        slash: 'Home',
        url: '',
      },
      {
        slash: 'Area Personale',
        url: 'AreaPersonale/',
      },
      {
        slash: 'Gestione Richieste Servizi Ente',
        url: `admin/${datiLogin.idCittadino}/handleRequests`,
      },
      {
        slash: `Recensione richiesta di servizio ${idRichiesta}`,
        url: `admin/rec/${idRichiesta}`,
      },
    ];

    return (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Header loading={loaded === 1} fontSize="f4" title="Recensione servizio" color="blue" />
        <Row fluid margin="1em 0">
          <Column xs="12" md="8" lg="7" padding="0 0 0 0">
            <EntRecensione readOnly />
          </Column>
        </Row>
      </Wrapper>

    );
  }

  return (<RedirectAdmin />);
};

EntFeedbackPage.displayName = 'EntFeedbackPage';
// EntFeedbackPage.propTypes = EntHandleRequestsPagePropTypes;

const mapStoreToProps = store => ({
  locale: store.locale,
  loaded: store.graphql.loaded,

});
const mapDispatchToProps = ({
  graphqlRequest,
});

const EntFeedbackPageWithAuth = withAuthentication(EntFeedbackPage);
export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(EntFeedbackPageWithAuth));

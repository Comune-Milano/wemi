/** @format */

import React from 'react';
import { Form } from 'libs/Form/components/Form';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import withRouter from 'react-router-dom/withRouter';
import withAuthentication from 'hoc/withAuthentication';
import { Row, Column } from 'components/ui/Grid';
import RecensioneLavoratore from 'components/navigation/RecensioneLavoratore/';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import {
  EstraiRichiestaLavoratore as EstraiRichiestaQ,
  ListaMansioniLavoratore as ListaMansioniQ,
  EstraiDatiLavoratore,
  EstraiRecensioneLavoratore as EstraiRecensioneQ,
} from 'components/navigation/RecensioneLavoratore/RecLavoratoreGraphQL';
import RiferimentiLavoratore from 'components/navigation/RecensioneLavoratore/partials/RiferimentiLavoratore';
import { PAGE_HOME_URL } from 'types/url';
import Redirect from 'react-router-dom/Redirect';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { getInitialDataset } from './utils/getInitialDataset';


const FeedbackLavoratore = ({ match, locale, userProfile }) => {
  const idRichiesta = parseInt(match.params.idRichiesta, 10);

  const { datiLogin } = userProfile;

  const [Estrailista] = useGraphQLRequest(
    [],
    ListaMansioniQ,
    {
      id_richiesta_servizio_tcb: idRichiesta,
    },
    true
  );

  const [datiLavoratore] = useGraphQLRequest(
    undefined,
    EstraiDatiLavoratore,
    {
      codiceRichiesta: idRichiesta,
      locale: `{${locale}}`,
    },
    true,
  );

  const [EstraiRecensione] = useGraphQLRequest(
    undefined,
    EstraiRecensioneQ,
    { id_rich_serv_rec: idRichiesta },
    true
  );

  const [EstraiRichiesta] = useGraphQLRequest(
    [],
    EstraiRichiestaQ,
    { id_richiesta_servizio_tcb: idRichiesta },
    true
  );

  const loadedRecensione = !EstraiRecensione.isLoading && !EstraiRecensione.pristine;
  const loadedRichiesta = !EstraiRichiesta.isLoading && !EstraiRichiesta.pristine;
  const loadedDatiLavoratore = !datiLavoratore.isLoading && !datiLavoratore.pristine;
  const loadedLista = !Estrailista.isLoading && !Estrailista.pristine;

  const loaded = loadedRecensione && loadedRichiesta && loadedDatiLavoratore && loadedLista;


  const initialDataset = loaded && getInitialDataset(
    EstraiRecensione.data,
    EstraiRichiesta.data,
    datiLavoratore.data,
    Estrailista.data,
    locale
  );

  const BreadcrumbPathCittadino = [
    {
      slash: 'Home',
      url: 'homepage',
    },
    {
      slash: 'Area personale',
      url: 'areaPersonale',
    },
    {
      slash: 'Visualizza la recensione del cittadino per il tuo servizio',
      url: `${match.url}`,
    },
  ];

  const idLavoratoreRichiesta = getObjectValue(datiLavoratore, 'data.codiceLavoratore', '');

  if (loadedDatiLavoratore) {
    if (idLavoratoreRichiesta !== datiLogin.idCittadino) {
      return (
        <Redirect to={PAGE_HOME_URL} />
      );
    }
  }


  return (
    loaded && (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPathCittadino} />
        <Form initialDataset={initialDataset}>
          <>
            <RiferimentiLavoratore />
            <Row fluid margin="1em 0">
              <Column xs="12" md="8" lg="7" padding="0 0 0 0">
                <RecensioneLavoratore
                  datiLogin={datiLogin}
                  match={match}
                />
              </Column>
            </Row>
          </>
        </Form>
      </Wrapper>
    )
  );
};

const mapStoreToProps = store => ({
  locale: store.locale,
});
FeedbackLavoratore.displayName = 'FeedbackLavoratore';

const LavoratoreRouter = withRouter(FeedbackLavoratore);

export default connect(
  mapStoreToProps
)(withAuthentication(LavoratoreRouter));

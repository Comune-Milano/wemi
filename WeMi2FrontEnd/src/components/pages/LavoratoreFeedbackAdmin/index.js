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
  EstraiRichiestaAdmin as EstraiRichiestaQ,
  ListaMansioniAdmin as ListaMansioniQ,
  EstraiDatiLavoratore,
  EstraiAllFeedbacks,
  EstraiRecensioneAdmin as EstraiRecensioneQ,
} from 'components/navigation/RecensioneLavoratore/RecLavoratoreGraphQL';
import RiferimentiLavoratore from 'components/navigation/RecensioneLavoratore/partials/RiferimentiLavoratore';
import checkAdmin from 'utils/functions/checkAdmin';
import Redirect from 'react-router-dom/Redirect';
import { PAGE_HOME_URL, PAGE_FEEDBACK_OLD_LAVORATORE_ADMIN_URL, PAGE_TCB_ADMIN_ERI_001, PAGE_MATCHING_DOMANDA_LAVORATORE_URL } from 'types/url';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { generatePath } from 'react-router';
import moment from 'moment';
import { getInitialDataset } from './utils/getInitialDataset';

const StyledDiv = styled.div`
  cursor:pointer
  width:fit-content;
`;


const FeedbackLavoratoreAdmin = ({ match, locale, userProfile, history, location }) => {
  const idRichiesta = parseInt(match.params.idRichiesta, 10);
  const idDomanda = getObjectValue(location, 'state.idRichiesta', undefined);
  const { datiLogin } = userProfile;

  const isFromBackoffice = getObjectValue(location, 'state.isFromBackoffice', undefined);

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

  const [EstraiTutteRecensioni] = useGraphQLRequest(
    undefined,
    EstraiAllFeedbacks,
    { id_rich_serv_rec: idRichiesta },
    true
  );

  const loadedRecensione = !EstraiRecensione.isLoading && !EstraiRecensione.pristine;
  const loadedRichiesta = !EstraiRichiesta.isLoading && !EstraiRichiesta.pristine;
  const loadedDatiLavoratore = !datiLavoratore.isLoading && !datiLavoratore.pristine;
  const loadedLista = !Estrailista.isLoading && !Estrailista.pristine;
  const loadedAllFeedbacks = !EstraiTutteRecensioni.isLoading && !EstraiTutteRecensioni.pristine;

  const loaded = loadedRecensione && loadedRichiesta && loadedDatiLavoratore && loadedLista && loadedAllFeedbacks;


  const initialDataset = loaded && getInitialDataset(
    EstraiRecensione.data,
    EstraiRichiesta.data,
    datiLavoratore.data,
    Estrailista.data,
    EstraiTutteRecensioni.data,
    locale
  );

  if (!checkAdmin(datiLogin)) {
    return (
      <Redirect to={PAGE_HOME_URL} />
    );
  }

  const idLavoratore = getObjectValue(datiLavoratore, 'data.codiceLavoratore', '');

  let BreadcrumbPathCittadino = [
    {
      slash: 'Home',
      url: 'homepage',
    },
    {
      slash: 'Area personale',
      url: 'areaPersonale',
    },
    {
      slash: 'Gestione candidatura',
      url: `/admin/${getObjectValue(datiLogin, 'idCittadino', '')}/candidatureLavoratoriTcb`,
    },
    {
      slash: 'Finalizza candidatura lavoratore',
      url: `/admin/finalizzaCandidaturaLavoratoreTCB/${idLavoratore}`,
    },
    {
      slash: 'Visualizza o scrivi la recensione',
      url: `${match.url}`,
    },
  ];

  if (isFromBackoffice) {
    BreadcrumbPathCittadino = [
      {
        slash: 'Home',
        url: 'homepage',
      },
      {
        slash: 'Area personale',
        url: 'areaPersonale',
      },
      {
        slash: 'Gestione richieste di servizio TCB',
        url: generatePath(PAGE_TCB_ADMIN_ERI_001, { idOperatore: getObjectValue(datiLogin, 'idCittadino', '') }),
      },
      {
        slash: 'Visualizza o scrivi la recensione',
        url: `${match.url}`,
      },
    ];
  }

  if (idDomanda) {
    BreadcrumbPathCittadino = [
      {
        slash: 'Home',
        url: 'homepage',
      },
      {
        slash: 'Area personale',
        url: 'areaPersonale',
      },
      {
        slash: 'Gestione richieste di servizio TCB',
        url: generatePath(PAGE_TCB_ADMIN_ERI_001, { idOperatore: getObjectValue(datiLogin, 'idCittadino', '') }),
      },
      {
        slash: 'Associazione lavoratore con domanda',
        url: generatePath(PAGE_MATCHING_DOMANDA_LAVORATORE_URL, { idDomanda }),
      },
      {
        slash: 'Modifica candidatura',
        url: `admin/ModificaCandidaturaLavoratore/${match.params.idLavoratore}`,
        state: getObjectValue(location, 'state', undefined),
      },
      {
        slash: 'Finalizza candidatura lavoratore',
        url: `/admin/finalizzaCandidaturaLavoratoreTCB/${idLavoratore}`,
        state: getObjectValue(location, 'state', undefined),
      },
      {
        slash: 'Visualizza o scrivi la recensione',
        url: `${match.url}`,
      },
    ];
  }

  const linkTo = (pgRichServRec) => {
    const path = generatePath(PAGE_FEEDBACK_OLD_LAVORATORE_ADMIN_URL, { idRichiesta, pgRichServRec });
    history.push({ pathname: path, state: { isFromBackoffice, pgRichServRec } });
  };

  const feedbacksToMap = initialDataset && initialDataset.recensioniVecchie.filter(el => el.maxProgressivo !== el.pg_rich_serv_rec);

  return (
    loaded && (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPathCittadino} />
        <Form initialDataset={initialDataset}>
          {({ dataset }) =>
            (
              <>
                <RiferimentiLavoratore />
                {feedbacksToMap.length > 0 ? (
                  <Row fluid margin="1em 0">
                    <Text value="Sono state rilasciate più valutazioni per questo servizio: " />
                    {feedbacksToMap.map((el, index) => (
                      <StyledDiv onClick={() => { linkTo(el.pg_rich_serv_rec); }}>
                        {index === feedbacksToMap.length - 1 ?
                          <Text value={` ${moment(el.ts_creazione).format('DD/MM/YYYY')}.`} weight="bold" tag="span" margin="0 0.3em" />
                          :
                          <Text value={` ${moment(el.ts_creazione).format('DD/MM/YYYY')},`} weight="bold" tag="span" margin="0 0.3em" />
                        }
                      </StyledDiv>
                    ))}
                    <Text value="Cliccare sulla data per visualizzarla " />
                  </Row>
                )
                  : null}
                <Row fluid margin="1em 0">
                  <Column xs="12" md="8" lg="7" padding="0 0 0 0">
                    <RecensioneLavoratore
                      datiLogin={datiLogin}
                      match={match}
                      isFromBackoffice={isFromBackoffice}
                    />
                  </Column>
                </Row>
              </>
            )
          }
        </Form>
      </Wrapper>
    )
  );
};

const mapStoreToProps = store => ({
  locale: store.locale,
});
FeedbackLavoratoreAdmin.displayName = 'FeedbackLavoratoreAdmin';

const LavoratoreRouter = withRouter(FeedbackLavoratoreAdmin);

export default connect(
  mapStoreToProps
)(withAuthentication(LavoratoreRouter));

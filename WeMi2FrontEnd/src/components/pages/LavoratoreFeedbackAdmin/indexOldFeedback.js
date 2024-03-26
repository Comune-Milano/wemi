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
import { PAGE_HOME_URL, PAGE_FEEDBACK_OLD_LAVORATORE_ADMIN_URL, PAGE_TCB_ADMIN_ERI_001, PAGE_FEEDBACK_LAVORATORE_ADMIN_URL } from 'types/url';
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

  const { datiLogin } = userProfile;


  const isFromBackoffice = getObjectValue(location, 'state.isFromBackoffice', undefined);

  const pg_rich_serv_rec = ((getObjectValue(location, 'state.pgRichServRec', undefined)) || parseInt(getObjectValue(match, 'params.pgRichServRec', undefined), 10));

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
        { id_rich_serv_rec: idRichiesta, pg_rich_serv_rec },
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
        locale,
        pg_rich_serv_rec
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
      slash: 'Feedback più recente',
      url: generatePath(PAGE_FEEDBACK_LAVORATORE_ADMIN_URL, { idRichiesta }),
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
        slash: 'Feedback più recente',
        url: generatePath(PAGE_FEEDBACK_LAVORATORE_ADMIN_URL, { idRichiesta }),
      },
      {
        slash: 'Visualizza o scrivi la recensione',
        url: `${match.url}`,
      },
    ];
  }

  const linkTo = (pgRichServRec, maxProgressivo) => {
    if (maxProgressivo === pgRichServRec) {
      const path = generatePath(PAGE_FEEDBACK_LAVORATORE_ADMIN_URL, { idRichiesta });
      history.push({ pathname: path, state: { isFromBackoffice } });
    } else {
      const path = generatePath(PAGE_FEEDBACK_OLD_LAVORATORE_ADMIN_URL, { idRichiesta, pgRichServRec });
      history.push({ pathname: path, state: { isFromBackoffice, pgRichServRec } });
    }
  };

  const feedbacksToMap = initialDataset && initialDataset.recensioniVecchie.filter(el => pg_rich_serv_rec !== el.pg_rich_serv_rec);


  return (
        loaded && (
        <Wrapper>
          <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPathCittadino} />
          <Form initialDataset={initialDataset}>
            {({ dataset }) => (
              <>
                <RiferimentiLavoratore />
                {dataset.recensioniVecchie.length > 0 ? (
                  <Row fluid margin="1em 0">
                    <Text value="Sono state rilasciate più valutazioni per questo servizio: " />
                    {feedbacksToMap.map((el, index) => {
                      if (pg_rich_serv_rec !== el.pg_rich_serv_rec) {
                        return (
                          <StyledDiv onClick={() => { linkTo(el.pg_rich_serv_rec, el.maxProgressivo); }}>
                                {index === feedbacksToMap.length - 1 ?
                                    <Text value={` ${moment(el.ts_creazione).format('DD/MM/YYYY')}.`} weight="bold" tag="span" margin="0 0.3em" />
                                                        :
                                      <Text value={` ${moment(el.ts_creazione).format('DD/MM/YYYY')},`} weight="bold" tag="span" margin="0 0.3em" />
                                                    }
                              </StyledDiv>
                        );
                      }
                    })}
                    <Text value="Cliccare sulla data per visualizzarla " />
                  </Row>
                            )
                                : null}
                <Row fluid margin="1em 0">
                  <Column xs="12" md="8" lg="7" padding="0 0 0 0">
                    <RecensioneLavoratore
                      datiLogin={datiLogin}
                      match={match}
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

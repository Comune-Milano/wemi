/** @format */

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { EstraiDettaglioAmministrativoServizioEnteQ } from 'components/navigation/Search/partials/FilterRequestGraphQL';
import { connect } from 'react-redux';
import { Row } from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import RedirectAdmin from 'components/router/RedirectAdmin';
import checkEnte from 'utils/functions/checkEnte';
import withAuthentication from 'hoc/withAuthentication';
import Header from 'components/ui2/Header';
import EntServiceModal from 'components/shared/ModaleServizioEnte';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { EstraiRichiestaEnte as EstraiRichiestaEnteQ } from 'components/pages/ENTERI/ENTERI001_GestioneRichiesteEnte/graphql/HandleRequestsGraphQL.js';
import Loader from 'components/ui2/Loader';
import { FormInput, Summary } from './partials';

const FormAccettazione = ({ userProfile, locale, match }) => {
  const [openEntService, setOpenEntService] = useState(false);

  const [datiRichiesta] = useGraphQLRequest(
    undefined,
    EstraiRichiestaEnteQ,
    { idRichiestaEnte: parseInt(match.params.idRichiesta, 10) },
    true
  );

  const idEnte = parseInt(match.params.idEnte, 10);

  const [estrai, setdati] = useGraphQLRequest(
    undefined,
    EstraiDettaglioAmministrativoServizioEnteQ,
    null,
    false
  );

  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Area personale',
      url: 'AreaPersonale',
    },
    {
      slash: 'Gestione Richieste Servizi Ente',
      url: `e/${window.location.pathname.split('e/')[1].split('/handleRequests')[0]}/handleRequests`,
    },
    {
      slash: 'Conferma accettazione',
      url: `e/${window.location.pathname.split('e/')[1].split('/handleRequests')[0]}/handleRequests${window.location.pathname.split('/handleRequests')[1].split('/AccettaRichiesta')[0]}/AccettaRichiesta`,
    },
  ];

  const { datiLogin } = userProfile;
  const validitaEnte = checkEnte(datiLogin);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!validitaEnte) {
    return <RedirectAdmin />;
  }


  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      <Header fontSize="f4" title="Conferma Accettazione" color="blue" />
      {!datiRichiesta.isLoading && !datiRichiesta.pristine && !datiRichiesta.errored ? (
        <Row fluid padding="0 20px" width="80%">
          <Summary
            locale={locale}
            setdati={() => setdati({ id_servizio: datiRichiesta.data.servizioEnte.id_servizio_ente, id: idEnte })}
            richiesta={datiRichiesta.data}
            idEnte={match.params.idEnte}
            open={openEntService}
            setOpen={setOpenEntService}
          />
          <FormInput
            locale={locale}
            datiRichiesta={datiRichiesta.data}
          />
          <EntServiceModal
            open={openEntService}
            setOpen={() => setOpenEntService(false)}
            idServizioEnte={getObjectValue(estrai, 'data.EstraiDettaglioAmministrativoServizioEnte.id_servizio_ente', undefined)}
            locale={locale}
            idEnte={idEnte}
          />
        </Row>
      )

        :
        <Loader size="2em" margin="0 auto" width="auto" />
      }

    </Wrapper>
  );
};


const mapStoreToProps = store => ({
  arrayRichieste: store.graphql.estraiRichiestePerIdEnte,
  loaded: store.graphql.loaded,
  locale: store.locale,
});

const FormAccWithAuth = withAuthentication(FormAccettazione);

FormAccettazione.displayName = 'Form accettazione';

export default connect(mapStoreToProps, null)(withRouter(FormAccWithAuth));

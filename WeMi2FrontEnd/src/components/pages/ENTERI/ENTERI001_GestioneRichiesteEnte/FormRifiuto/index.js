/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from 'components/ui2/Header';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Row } from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import withAuthentication from 'hoc/withAuthentication';
import Loader from 'components/ui2/Loader';
import { EstraiDettaglioAmministrativoServizioEnteQ } from 'components/navigation/Search/partials/FilterRequestGraphQL';
import RedirectAdmin from 'components/router/RedirectAdmin';
import checkEnte from 'utils/functions/checkEnte';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import EntServiceModal from 'components/shared/ModaleServizioEnte';
import { EstraiRichiestaEnte as EstraiRichiestaEnteQ } from 'components/pages/ENTERI/ENTERI001_GestioneRichiesteEnte/graphql/HandleRequestsGraphQL.js';
import { Form, Summary } from './partials';


const FormRifiuto = ({ userProfile, arrayRichieste, match, locale }) => {
  const [notesValue, setNotesValue] = useState();
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
      slash: 'Conferma Chiusura',
      url: `e/${window.location.pathname.split('e/')[1].split('/ChiudiRichiesta')[0]}/ChiudiRichiesta`,
    },
  ];


  const getNotesValue = (value) => {
    setNotesValue(value);
  };

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
      <Header fontSize="f4" title="Conferma Chiusura" color="blue" />
      {!datiRichiesta.isLoading && !datiRichiesta.pristine && !datiRichiesta.errored ? (
        <Row fluid padding="0 20px" width="80%">
          <Summary
            locale={locale}
            richiesta={datiRichiesta.data}
            setdati={() => setdati({ id_servizio: datiRichiesta.data.servizioEnte.id_servizio_ente, id: idEnte })}
            open={openEntService}
            setOpen={setOpenEntService}
          />
          <Form
            notesValue={notesValue}
            getNotesValue={getNotesValue}
            richiesta={datiRichiesta.data}
            locale={locale}
            open={openEntService}
            setOpen={setOpenEntService}
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

FormRifiuto.displayName = 'Form rifiuto';
const FormRifiutoWithAuth = withAuthentication(FormRifiuto);
export default connect(mapStoreToProps)(withRouter(FormRifiutoWithAuth));

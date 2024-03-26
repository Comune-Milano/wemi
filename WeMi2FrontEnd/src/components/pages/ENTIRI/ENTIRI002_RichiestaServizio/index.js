/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { generatePath } from 'react-router-dom';

import RequestService from 'components/navigation/RequestService';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { requestService } from 'mocks/RequestServiceJson';
import Stepper from 'components/ui2/Header/Stepper';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { PAGE_ENTI_SERVICES_SEARCH_URL } from 'types/url';
import Loader from 'components/ui2/Loader';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { getService } from './RichiestaServizioGraphQL';
import { openLoginModal } from '../../../../redux-modules/actions/authActions';

const RequestServicePage = ({
  match,
  baseBreadcrumbPath,
  entiSelezionati,
  filtri,
  indirizzo,
  destinatariDisponibili,
  mansioniDisponibili,
  fasceOrarieDisponibili,
  removeEnte,
  location,
}) => {
  const [breadcrumbPath, setBreadcrumbPath] = useState([]);

  const param = new URLSearchParams(location.search);
  const codSezione = param.get('codSezione');
  const idCategoria = !match.params.idCategoria || Number.isNaN(match.params.idCategoria) ?
    null : parseInt(match.params.idCategoria, 10);

  const idServizio = parseInt(match.params.idServizio, 10);
  const [servizioPK] = useGraphQLRequest(
    undefined,
    getService,
    {
      idServizio,
      idCategoria,
    },
    true
  );

  const unitaPrezzoServizio = getObjectValue(servizioPK.data, 'servizioPK.prezzo');

  useEffect(() => {
    if (servizioPK.isLoading || !servizioPK.data || !baseBreadcrumbPath) {
      return;
    }

    const serviceBreadcrumbItem = {
      slash: servizioPK.data.servizioPK.txTitoloServizio.it,
      url: generatePath(PAGE_ENTI_SERVICES_SEARCH_URL, {
        idServizio,
        idCategoria,
      }),
      state: {
        service018: location.state?.service018 ? location.state.service018 === true : false,
      },
      search: `codSezione=${codSezione}`,
    };

    const completeRequestBreadcrumbItem = {
      slash: 'COMPLETA LA RICHIESTA',
      url: '',
    };

    setBreadcrumbPath([
      ...baseBreadcrumbPath,
      serviceBreadcrumbItem,
      completeRequestBreadcrumbItem,
    ]);
  }, [baseBreadcrumbPath, servizioPK]);

  const steps = [
    {
      title: 'Scegli il servizio',
      color: 'primary',
      link: null,
      active: false,
      onClickStepHandler: () => null,

    },
    {
      title: 'Seleziona gli enti',
      color: 'orange',
      link: null,
      active: false,
      onClickStepHandler: () => null,

    },
    {
      title: 'Richiedi il servizio',
      color: 'green',
      link: null,
      active: true,
      onClickStepHandler: () => null,
    },
  ];

  return (
    servizioPK.pristine || servizioPK.isLoading ?
      <Loader /> :
      (
        <>
          <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} />
          <Stepper steps={steps} />
          <RequestService
            requestService={requestService}
            unitaPrezzoServizio={unitaPrezzoServizio}
            match={match}
            entiSelezionati={entiSelezionati}
            filtri={filtri}
            indirizzo={indirizzo}
            destinatariDisponibili={destinatariDisponibili}
            mansioniDisponibili={mansioniDisponibili}
            fasceOrarieDisponibili={fasceOrarieDisponibili}
            removeEnte={removeEnte}
          />
        </>
      )
  );
};

RequestServicePage.displayName = 'RequestServicePage';

const mapDispatchToProps = ({
  openLoginModal,
});

export default connect(
  null,
  mapDispatchToProps
)(RequestServicePage);

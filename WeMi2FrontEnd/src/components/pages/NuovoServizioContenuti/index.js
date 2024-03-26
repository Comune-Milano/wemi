import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Title as TitleSection } from 'components/pages/SchedaEntePage/shared';
import FormService from 'components/navigation/ServizioContenuti';
import { PAGE_CONTENT_SERVICE_LIST, PAGE_HOME_URL } from 'types/url';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Loader from 'components/ui2/Loader';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { breadcrumb } from './constants';
import { destinatariPubblicati, getLevel2Categories, getMaxOrderService, getPublishedAccreditationCategories, getUnitPrice, mansioniPubblicateAll } from './graphql';


const NewServicePageComponent = ({
  userProfile,
  history,
}) => {
  const { datiLogin } = userProfile;

  const validitaAdmin = checkAdmin(datiLogin);

  const [publishedCategories] = useGraphQLRequest(
    undefined,
    getPublishedAccreditationCategories,
    {},
    true,
    response => response?.map(contenuto => ({
      id: contenuto.id_contenuto,
      value: getObjectValue(contenuto, 'tl_testo_1.it', ''),
    }))
  );

  const [priceUnit] = useGraphQLRequest(
    undefined,
    getUnitPrice,
    {},
    true,
    response => response?.map(contenuto => ({
      id: contenuto.cd_unita_prezzo,
      value: contenuto.title,
    }))
  );

  const [level2Categories] = useGraphQLRequest(
    undefined,
    getLevel2Categories,
    { ty_contenuto: 4 },
    true,
    response => response?.map(contenuto => ({
      id: contenuto.id_contenuto,
      value: getObjectValue(contenuto, 'tl_testo_1.it', ''),
    }))
  );

  const [mansioniAll] = useGraphQLRequest(
    undefined,
    mansioniPubblicateAll,
    {},
    true,
    response => response?.map(contenuto => ({
      id: contenuto.idMansione,
      value: getObjectValue(contenuto, 'txTitoloMansione.it', ''),
    }))
  );

  const [destinatariAll] = useGraphQLRequest(
    undefined,
    destinatariPubblicati,
    {},
    true,
    response => response?.map(contenuto => ({
      id: contenuto.idDestinatario,
      value: getObjectValue(contenuto, 'txDestinatario.it', ''),
    }))
  );

  const [orderMax, getMaxOrder] = useGraphQLRequest(
    {
    },
    getMaxOrderService,
    {
    },
    false,
  );

  React.useEffect(() => {
    if (!validitaAdmin) {
      history.push(PAGE_HOME_URL);
      return;
    }
    getMaxOrder({});
  }, []);

  const loadingCategories = !publishedCategories.isLoading && !publishedCategories.pristine;
  const loadingPriceUnits = !priceUnit.isLoading && !priceUnit.pristine;
  const loadingLevel2Categories = !level2Categories.isLoading && !level2Categories.pristine;
  const loadingMansioni = !mansioniAll.isLoading && !mansioniAll.pristine;
  const loadingDestinatari = !destinatariAll.isLoading && !destinatariAll.pristine;
  const loadingMaxOrder = !orderMax.isLoading && !orderMax.pristine;


  const hasToRender = loadingCategories &&
  loadingPriceUnits &&
  loadingLevel2Categories &&
  loadingMansioni &&
  loadingDestinatari &&
  loadingMaxOrder;

  return (
    <Wrapper>
      <Breadcrumbs pathSlashes={breadcrumb(datiLogin.idCittadino)} />
      <TitleSection firstTitle="Gestione" secondTitle="Servizi" />
      {hasToRender ? (
        <FormService
          url={PAGE_CONTENT_SERVICE_LIST}
          publishedCategories={publishedCategories.data}
          priceUnit={priceUnit.data}
          level2Categories={level2Categories.data}
          mansioniAll={mansioniAll.data}
          destinatariAll={destinatariAll.data}
          dataset={{ order: orderMax.data }}
        />
      ) : (
        <Loader overlay />
      )}
    </Wrapper>
  );
};


NewServicePageComponent.displayName = 'New Service Page Component';
const NewServicePage = withAuthentication(NewServicePageComponent);

export default NewServicePage;

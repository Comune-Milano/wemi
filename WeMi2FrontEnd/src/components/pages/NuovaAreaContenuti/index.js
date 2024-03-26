import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Title as TitleArea } from 'components/pages/SchedaEntePage/shared';
import FormArea from 'components/navigation/AreaContenuti';
import { PAGE_CONTENT_AREA_LIST, PAGE_HOME_URL } from 'types/url';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Loader from 'components/ui2/Loader';
import { breadcrumb } from './constants';
import { getMaxOrderArea } from './graphql';


const NewAreaPageComponent = ({
  userProfile,
  history,
}) => {
  const { datiLogin } = userProfile;

  const validitaAdmin = checkAdmin(datiLogin);

  const [orderMax, getMaxOrder] = useGraphQLRequest(
    {
    },
    getMaxOrderArea,
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

  const hasToRender = !orderMax.isLoading && !orderMax.pristine;

  return (
    <Wrapper>
      <Breadcrumbs pathSlashes={breadcrumb(datiLogin.idCittadino)} />
      <TitleArea
        firstTitle="Gestione"
        secondTitle="AREE DEI SERVIZI (CATEGORIE LIVELLO 1)"
      />
      {hasToRender ? (
        <FormArea url={PAGE_CONTENT_AREA_LIST} dataset={{ order: orderMax.data }} />
      ) : (
        <Loader overlay />
      )}
    </Wrapper>
  );
};


NewAreaPageComponent.displayName = 'New Area Page Component';
const NewAreaPage = withAuthentication(NewAreaPageComponent);

export default NewAreaPage;

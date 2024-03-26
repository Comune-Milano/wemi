import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Title as TitleSection } from 'components/pages/SchedaEntePage/shared';
import Loader from 'components/ui2/Loader';
import { PAGE_CONTENUTO_SLIDER_0_18, PAGE_HOME_URL } from 'types/url';
import NuovoContenutoSlider from 'components/navigation/Slider018Contenuti';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { breadcrumb } from './constants';
import { getMaxOrderContentSlider } from './graphql';


const NewContentPageComponent = ({
  userProfile,
  history,
}) => {
  const { datiLogin } = userProfile;

  const validitaAdmin = checkAdmin(datiLogin);

  const [orderMax, getMaxOrder] = useGraphQLRequest(
    {
    },
    getMaxOrderContentSlider,
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
      <TitleSection firstTitle="Gestione" secondTitle="Slider HomePage 0-18" />
      {hasToRender ? (
        <NuovoContenutoSlider url={PAGE_CONTENUTO_SLIDER_0_18} dataset={{ order: orderMax.data }} />
      ) : (
        <Loader overlay />
      )}
    </Wrapper>
  );
};


NewContentPageComponent.displayName = 'NewContentPageComponent';
const NewContentPage = withAuthentication(NewContentPageComponent);

export default NewContentPage;

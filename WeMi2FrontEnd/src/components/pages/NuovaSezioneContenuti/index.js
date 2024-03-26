import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Title as TitleSection } from 'components/pages/SchedaEntePage/shared';
import FormSection from 'components/navigation/SezioneContenuti';
import { PAGE_CONTENT_SECTION_LIST, PAGE_HOME_URL } from 'types/url';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Loader from 'components/ui2/Loader';
import { breadcrumb } from './constants';
import { getMaxOrderSection } from './graphql';


const NewSectionPageComponent = ({
  userProfile,
  history,
}) => {
  const { datiLogin } = userProfile;

  const validitaAdmin = checkAdmin(datiLogin);

  const [orderMax, getMaxOrder] = useGraphQLRequest(
    {
    },
    getMaxOrderSection,
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
      <TitleSection firstTitle="Gestione" secondTitle="Sezioni" />
      {hasToRender ? (
        <FormSection url={PAGE_CONTENT_SECTION_LIST} dataset={{ order: orderMax.data }} />
      ) : (
        <Loader overlay />
      )}
    </Wrapper>
  );
};


NewSectionPageComponent.displayName = 'New Section Page Component';
const NewSectionPage = withAuthentication(NewSectionPageComponent);

export default NewSectionPage;

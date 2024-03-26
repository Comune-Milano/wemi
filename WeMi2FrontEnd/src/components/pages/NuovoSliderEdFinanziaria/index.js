import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Title as TitleSection } from 'components/pages/SchedaEntePage/shared';
import FormSlider from 'components/navigation/SliderEdFinanziariaContenuti';
import { PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST, PAGE_HOME_URL } from 'types/url';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Loader from 'components/ui2/Loader';
import { breadcrumb } from './constants';
import { getMaxOrderTextualValuesSlider } from './graphql';


const NewSliderPageComponent = ({
  userProfile,
  history,
}) => {
  const { datiLogin } = userProfile;

  const validitaAdmin = checkAdmin(datiLogin);

  const [orderMaxTextValues, getValues] = useGraphQLRequest(
    {
    },
    getMaxOrderTextualValuesSlider,
    {
    },
    false,
  );

  React.useEffect(() => {
    if (!validitaAdmin) {
      history.push(PAGE_HOME_URL);
      return;
    }
    getValues({});
  }, []);

  const hasToRender = !orderMaxTextValues.isLoading && !orderMaxTextValues.pristine;

  return (
    <Wrapper>
      <Breadcrumbs pathSlashes={breadcrumb(datiLogin.idCittadino)} />
      <TitleSection firstTitle="Gestione" secondTitle="Slider Educazione Finanziaria" />
      {hasToRender ? (
        <FormSlider
          url={PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST}
          dataset={orderMaxTextValues.data}
        />
      ) : (
        <Loader overlay />
      )}
    </Wrapper>
  );
};


NewSliderPageComponent.displayName = 'NewSliderPageComponent';
const NewSliderPage = withAuthentication(NewSliderPageComponent);

export default NewSliderPage;

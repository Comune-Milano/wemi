import React from 'react';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Title as TitleSection } from 'components/pages/SchedaEntePage/shared';
import { PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST, PAGE_HOME_URL } from 'types/url';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Loader from 'components/ui2/Loader';
import FormSlider from 'components/navigation/SliderEdFinanziariaContenuti';
import { breadcrumb } from './constants';
import { getSliderFinancialEducation } from './graphql';


const EditSliderPageComponent = ({
  userProfile,
  match,
  history,
}) => {
  const { datiLogin } = userProfile;
  const { idContent } = match.params;

  const parsedIdContent = Number.parseInt(idContent, 10);

  const validitaAdmin = checkAdmin(datiLogin);

  const [content, getContent] = useGraphQLRequest(
    {
    },
    getSliderFinancialEducation,
    {
      id: parsedIdContent,
    },
    false,
    response => ({ ...response,
      order: response.progressive,
      media1: {
        ...response.image,
        file: response.image?.path,
      } }),
  );

  React.useEffect(() => {
    if (!validitaAdmin) {
      history.push(PAGE_HOME_URL);
      return;
    }
    if (!parsedIdContent) {
      history.push(PAGE_HOME_URL);
      return;
    }
    getContent({ id: parsedIdContent });
  }, []);

  const hasToRender = !content.isLoading && !content.pristine;

  const title = hasToRender ? content.data?.title : '';

  if (content.errored) {
    return null;
  }

  return (
    <Wrapper>
      <Breadcrumbs pathSlashes={breadcrumb(datiLogin.idCittadino, title)} />
      <TitleSection firstTitle="Gestione" secondTitle="Slider educazione finanziaria" />
      {hasToRender ? (
        <FormSlider isEdit url={PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_LIST} dataset={content.data} />
      ) : (
        <Loader overlay />
      )}
    </Wrapper>
  );
};


EditSliderPageComponent.displayName = 'EditSliderPageComponent';
const EditSliderPageComponentWithAuth = withAuthentication(EditSliderPageComponent);

export default EditSliderPageComponentWithAuth;

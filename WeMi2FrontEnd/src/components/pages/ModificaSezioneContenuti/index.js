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
import { getContentSection } from './graphql';


const EditSectionPageComponent = ({
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
    getContentSection,
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
      <TitleSection firstTitle="Gestione" secondTitle="Sezioni" />
      {hasToRender ? (
        <FormSection isEdit url={PAGE_CONTENT_SECTION_LIST} dataset={content.data} />
      ) : (
        <Loader overlay />
      )}
    </Wrapper>
  );
};


EditSectionPageComponent.displayName = 'Edit Section Page Component';
const EditSectionPage = withAuthentication(EditSectionPageComponent);

export default EditSectionPage;

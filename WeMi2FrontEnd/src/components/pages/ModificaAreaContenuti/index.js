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
import { getContentArea } from './graphql';


const EditAreaPageComponent = ({
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
    getContentArea,
    {
      id: parsedIdContent,
    },
    false,
    response => ({ ...response,
      order: response.progressive,
      sections: (response.associates || []).map(associate => ({ id: associate.id, value: associate.title })),
    }),
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
      <TitleArea
        firstTitle="Gestione"
        secondTitle="AREE DEI SERVIZI (CATEGORIE LIVELLO 1)"
      />
      {hasToRender ? (
        <FormArea isEdit url={PAGE_CONTENT_AREA_LIST} dataset={content.data} />
      ) : (
        <Loader overlay />
      )}
    </Wrapper>
  );
};


EditAreaPageComponent.displayName = 'Edit Area Page Component';
const EditAreaPage = withAuthentication(EditAreaPageComponent);

export default EditAreaPage;

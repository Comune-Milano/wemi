import React from 'react';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { PAGE_HOME_URL } from 'types/url';
import { useUserProfile } from 'hooks/useUserProfile';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import checkAdmin from 'utils/functions/checkAdmin';
import { calculateBreadCrumbPathAdmin } from './utils';
import { mapperService } from './mapper';
import { getInstitutionCardAdmin } from './graphql';
import { FormInstitutionCard } from './forminstitutioncard';
import { Title } from './shared';
import { createValidationSchema } from './validationschema';

const InstitutionCardAdminPage = ({ match, history }) => {
  const [userProfile] = useUserProfile();

  const { datiLogin } = userProfile;

  const institutionId = parseInt(match.params.idEnte, 10);

  const breadCrumbPath = calculateBreadCrumbPathAdmin(match.url);

  const [institutionCard, getInstitutionCard] = useGraphQLRequest(
    {},
    getInstitutionCardAdmin,
    {
      institutionId,
    },
    true,
    mapperService,
  );

  if (!checkAdmin(datiLogin)) {
    history.push(PAGE_HOME_URL);
  }
  const { data, pristine, isLoading, errored } = institutionCard;

  const isEndedLoading = !pristine && !isLoading && !errored;

  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadCrumbPath} />
      <Title
        firstTitle="Scheda"
        secondTitle="Ente"
        animatedTitle={data?.institutionSection?.name}
        isLoading={!isEndedLoading}
        hasErrors={institutionCard.errored}
      />
      <FormInstitutionCard
        initialDataset={institutionCard.data}
        validationSchema={createValidationSchema}
        isLoading={!isEndedLoading}
        hasErrors={institutionCard.errored}
        isAdmin
        institutionId={institutionId}
        getInstitutionCard={getInstitutionCard}
      />
    </Wrapper>
  );
};

InstitutionCardAdminPage.displayName = 'Institution card administrator page';

export default InstitutionCardAdminPage;

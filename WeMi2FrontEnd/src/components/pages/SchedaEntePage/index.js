import React from 'react';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { PAGE_HOME_URL } from 'types/url';
import { useUserProfile } from 'hooks/useUserProfile';
import checkEnte from 'utils/functions/checkEnte';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { calculateBreadCrumbPathEnte } from './utils';
import { mapperService } from './mapper';
import { getInstitutionCard as getInstitutionCardQ } from './graphql';
import { FormInstitutionCard } from './forminstitutioncard';
import { Title } from './shared';
import { createValidationSchema } from './validationschema';


const InstitutionCardPage = ({ match, history }) => {
  const [userProfile] = useUserProfile();

  const { datiLogin } = userProfile;

  const breadCrumbPath = calculateBreadCrumbPathEnte(match.url);

  const [institutionCard, getInstitutionCard] = useGraphQLRequest(
    {},
    getInstitutionCardQ,
    {},
    true,
    mapperService,
  );

  if (!checkEnte(datiLogin)) {
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
        hasErrors={errored}
      />
      <FormInstitutionCard
        initialDataset={data}
        validationSchema={createValidationSchema}
        isLoading={!isEndedLoading}
        hasErrors={errored}
        getInstitutionCard={getInstitutionCard}
        datiLogin={datiLogin}
      />
    </Wrapper>
  );
};

InstitutionCardPage.displayName = 'Institution card page';

export default InstitutionCardPage;

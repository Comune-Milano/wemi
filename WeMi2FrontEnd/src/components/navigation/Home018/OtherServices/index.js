import React from 'react';
import { Row } from 'components/ui/Grid';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { OtherServicesButton } from './partials';
import { getAll018Cross } from './graphql';

const OtherServicesNavigation = () => {
  const [categories018Cross] = useGraphQLRequest(
    [{ categorie: [] }],
    getAll018Cross,
    undefined,
    true,
    response => response.areeCategoria,
  );

  // Data Loading
  const otherServicesLoading = categories018Cross.isLoading;
  // Data Pristine
  const otherServicesPristine = categories018Cross.pristine;
  // Data
  const otherServicesData = categories018Cross.data;

  return (
    <Row fluid>
      <OtherServicesButton
        loading={otherServicesLoading || otherServicesPristine}
        data={otherServicesData}
      />
    </Row>
  );
};

OtherServicesNavigation.displayName = 'OtherServicesNavigation';
export default OtherServicesNavigation;

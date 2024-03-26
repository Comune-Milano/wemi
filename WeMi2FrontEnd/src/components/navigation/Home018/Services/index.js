import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { ServicesButton } from './partials';
import { getAll018 } from './graphql';

const ServicesNavigation = () => {
  const [services] = useGraphQLRequest(
    [{ categorie: [] }],
    getAll018,
    undefined,
    true,
    response => response.areeCategoria,
);

  // Data Loading
  const servicesLoading = services.isLoading;
  // Data Pristine
  const servicesPristine = services.pristine;
  // Data
  const servicesData = services.data;

  return (
    <>
      <Row fluid>
        <Column xs="12" md="12" lg="12" sizepadding={{ xs: '0 0 0 0', md: '0 0 0 0', lg: '0 0 0 0', xl: '0 0 0 0' }}>
          <Row justifycontent="center">
            <ServicesButton
              loading={servicesLoading || servicesPristine}
              data={servicesData}
            />
          </Row>
        </Column>
      </Row>
    </>
  );
};

ServicesNavigation.displayName = 'ServicesNavigation';
export default ServicesNavigation;

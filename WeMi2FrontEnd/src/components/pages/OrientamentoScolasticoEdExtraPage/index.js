import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import OrientamentoScolasticoEdExtra from 'components/navigation/OrientamentoScolasticoEdExtra';
import { BreadcrumbPath } from './constants';

const OrientamentoScolasticoEdExtraPage = () => (
  <>
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} ignoreCase />
    </Wrapper>
    <OrientamentoScolasticoEdExtra />
  </>
  );

OrientamentoScolasticoEdExtraPage.displayName = 'OrientamentoScolasticoEdExtraPage';

export default OrientamentoScolasticoEdExtraPage;

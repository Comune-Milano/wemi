import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import ConsulenzaSocialeGiuridica from 'components/navigation/ConsulenzaSocialeGiuridica';
import { BreadcrumbPath } from './constants';

const ConsulenzaSocialeGiuridicaPage = () => (
  <>
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} ignoreCase />
    </Wrapper>
    <ConsulenzaSocialeGiuridica />
  </>
);

ConsulenzaSocialeGiuridicaPage.displayName = 'ConsulenzaSocialeGiuridicaPage';

export default ConsulenzaSocialeGiuridicaPage;

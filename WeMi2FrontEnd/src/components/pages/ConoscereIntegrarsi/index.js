import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import InclusioneConoscereIntegrarsi from 'components/navigation/InclusioneConoscereIntegrarsi';
import { BreadcrumbPath } from './constants';

const ConoscereIntegrarsi = () => (
  <Wrapper>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} ignoreCase />
    <InclusioneConoscereIntegrarsi />
  </Wrapper>
);

ConoscereIntegrarsi.displayName = 'ConoscereIntegrarsiPage';

export default ConoscereIntegrarsi;

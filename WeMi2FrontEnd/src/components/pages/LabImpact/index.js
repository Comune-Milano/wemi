import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import InclusioneLabImpact from 'components/navigation/InclusioneLabImpact';
import { Helmet } from 'react-helmet';
import { BreadcrumbPath, title, description, keywords } from './constants';

const LabImpact = () => (
  <Wrapper>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} ignoreCase />
    <InclusioneLabImpact />
  </Wrapper>
);

LabImpact.displayName = 'LabImpactPage';

export default LabImpact;

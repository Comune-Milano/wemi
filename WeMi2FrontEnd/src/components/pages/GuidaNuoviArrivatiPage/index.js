import Breadcrumbs from 'components/navigation/Breadcrumbs';
import React from 'react';
import Wrapper from 'components/navigation/NavigationWrapper';
import GuidaNuoviArrivati from 'components/navigation/GuidaNuoviArrivati';
import { Helmet } from 'react-helmet';
import { breadcrumbPath, title, description, keywords } from './costants';

const GuidaNuoviArrivatiPage = () => (
  <Wrapper>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} ignoreCase />
    <GuidaNuoviArrivati />
  </Wrapper>
);

GuidaNuoviArrivatiPage.displayName = 'GuidaNuoviArrivatiPage';
export default GuidaNuoviArrivatiPage;

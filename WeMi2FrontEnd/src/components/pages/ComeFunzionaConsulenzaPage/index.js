import Breadcrumbs from 'components/navigation/Breadcrumbs';
import React from 'react';
import Wrapper from 'components/navigation/NavigationWrapper';
import ComeFunzionaConsulenza from 'components/navigation/ComeFunzionaConsulenza';
import { Helmet } from 'react-helmet';
import { breadcrumbPath, title, description, keywords } from './constants';

const ComeFunzionaConsulenzaPage = () => (
  <Wrapper>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} ignoreCase />
    <ComeFunzionaConsulenza />
  </Wrapper>
);

ComeFunzionaConsulenzaPage.displayName = 'ComeFunzionaConsulenzaPage';
export default ComeFunzionaConsulenzaPage;

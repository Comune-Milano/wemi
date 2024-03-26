import Breadcrumbs from 'components/navigation/Breadcrumbs';
import React from 'react';
import ComeFunzionaOrientamentoScolastico from 'components/navigation/ComeFunzionaOrientamentoScolastico';
import Wrapper from 'components/navigation/NavigationWrapper';
import { Helmet } from 'react-helmet';
import { breadcrumbPath, title, description, keywords } from './costants';

const ComeFunzionaOrientamentoScolasticoPage = () => (
  <Wrapper>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} ignoreCase />
    <ComeFunzionaOrientamentoScolastico />
  </Wrapper>
);

ComeFunzionaOrientamentoScolasticoPage.displayName = 'ComeFunzionaOrientamentoScolasticoPage';
export default ComeFunzionaOrientamentoScolasticoPage;

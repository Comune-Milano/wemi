import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import InclusioneComeFunziona from 'components/navigation/InclusioneComeFunziona';
import { Helmet } from 'react-helmet';
import { BreadcrumbPath, title, description, keywords } from './constants';

const RicongiungimentoComeFunziona = () => (
  <Wrapper>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} ignoreCase />
    <InclusioneComeFunziona />
  </Wrapper>
);

RicongiungimentoComeFunziona.displayName = 'RicongiungimentoComeFunzionaPage';

export default RicongiungimentoComeFunziona;

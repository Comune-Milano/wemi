import React from 'react';
import RicongiungimentoParenteNavigation from 'components/navigation/InclusioneRicongiungimentoParente';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import { Helmet } from 'react-helmet';
import { breadcrumbPath, title, description, keywords } from './constants';

const RicongiungimentoParentePage = () => (
  <Wrapper>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} ignoreCase />
    <RicongiungimentoParenteNavigation />
  </Wrapper>
);

RicongiungimentoParentePage.displayName = 'RicongiungimentoParentePage';
export default RicongiungimentoParentePage;

import Breadcrumbs from 'components/navigation/Breadcrumbs';
import React from 'react';
import VoglioSapereDiPiuLingua from 'components/navigation/InfoApprendimentoLingua';
import Wrapper from 'components/navigation/NavigationWrapper';
import { Helmet } from 'react-helmet';
import { breadcrumbPath, title, description, keywords } from './costants';

const InfoApprendimentoLinguaItalianaPage = () => (
  <Wrapper>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} ignoreCase />
    <VoglioSapereDiPiuLingua />
  </Wrapper>
);

InfoApprendimentoLinguaItalianaPage.displayName = 'InfoApprendimentoLinguaItalianaPage';
export default InfoApprendimentoLinguaItalianaPage;

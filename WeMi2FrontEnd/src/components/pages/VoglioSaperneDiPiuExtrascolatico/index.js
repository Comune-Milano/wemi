import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import InclusioneVoglioSaperneDiPiuExtrascolatico from 'components/navigation/InclusioneVoglioSaperneDiPiuExtrascolatico';
import { Helmet } from 'react-helmet';
import { BreadcrumbPath, title, description, keywords } from './constants';

const VoglioSaperneDiPiuExtrascolatico = () => (
  <Wrapper>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} ignoreCase />
    <InclusioneVoglioSaperneDiPiuExtrascolatico />
  </Wrapper>
);

VoglioSaperneDiPiuExtrascolatico.displayName = 'VoglioSaperneDiPiuExtrascolaticoPage';

export default VoglioSaperneDiPiuExtrascolatico;

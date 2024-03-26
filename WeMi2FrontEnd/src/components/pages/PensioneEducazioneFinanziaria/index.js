import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import PensioneEducazioneFinanziariaNavigation from 'components/navigation/PensioneEducazioneFinanziaria';
import { BreadcrumbPath } from './constants';

const PensioneEducazioneFinanziariaPage = () => (
  <Wrapper>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} ignoreCase />
    <PensioneEducazioneFinanziariaNavigation />
  </Wrapper>
);

PensioneEducazioneFinanziariaPage.displayName = 'PensioneEducazioneFinanziariaPage';

export default PensioneEducazioneFinanziariaPage;

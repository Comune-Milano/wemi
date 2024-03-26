import Breadcrumbs from 'components/navigation/Breadcrumbs';
import React from 'react';
import Wrapper from 'components/navigation/NavigationWrapper';
import DebitiEducazioneFinanziariaNavigation from 'components/navigation/DebitiEducazioneFinanziaria';
import { breadcrumbPath } from './constants';

const DebitiEducazioneFinanziariaPage = () => (
  <Wrapper>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} ignoreCase />
    <DebitiEducazioneFinanziariaNavigation />
  </Wrapper>
);

DebitiEducazioneFinanziariaPage.displayName = 'DebitiEducazioneFinanziariaPage';
export default DebitiEducazioneFinanziariaPage;

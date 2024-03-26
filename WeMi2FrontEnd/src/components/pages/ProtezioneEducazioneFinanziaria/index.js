import Breadcrumbs from 'components/navigation/Breadcrumbs';
import React from 'react';
import Wrapper from 'components/navigation/NavigationWrapper';
import { breadcrumbPath } from './costants';
import ProtezioneEducazioneFinanziariaComponents from 'components/navigation/ProtezioneEducazioneFinanziaria';

const ProtezioneEducazioneFinanziaria = () => (
  <Wrapper>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} ignoreCase />
    <ProtezioneEducazioneFinanziariaComponents />
  </Wrapper>
);

ProtezioneEducazioneFinanziaria.displayName = 'ProtezioneEducazioneFinanziaria Page';
export default ProtezioneEducazioneFinanziaria;

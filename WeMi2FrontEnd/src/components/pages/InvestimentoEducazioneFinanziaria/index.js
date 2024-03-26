import Breadcrumbs from 'components/navigation/Breadcrumbs';
import React from 'react';
import Wrapper from 'components/navigation/NavigationWrapper';
import { breadcrumbPath } from './costants';
import InvestimentoEducazioneFinanziariaComponents from 'components/navigation/InvestimentoEducazioneFinanziaria';

const InvestimentoEducazioneFinanziaria = () => (
  <Wrapper>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} ignoreCase />
    <InvestimentoEducazioneFinanziariaComponents />
  </Wrapper>
);

InvestimentoEducazioneFinanziaria.displayName = 'InvestimentoEducazioneFinanziaria Page';
export default InvestimentoEducazioneFinanziaria;

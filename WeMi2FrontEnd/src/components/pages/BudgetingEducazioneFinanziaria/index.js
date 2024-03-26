import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import BudgetingEducazioneFinanziariaComponents from 'components/navigation/BudgetingEducazioneFinanziaria';
import { BreadcrumbPath } from './constants';

const BudgetingEducazioneFinanziaria = () => (
  <Wrapper>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} ignoreCase />
    <BudgetingEducazioneFinanziariaComponents />
  </Wrapper>
);

BudgetingEducazioneFinanziaria.displayName = 'BudgetingEducazioneFinanziaria Page';

export default BudgetingEducazioneFinanziaria;

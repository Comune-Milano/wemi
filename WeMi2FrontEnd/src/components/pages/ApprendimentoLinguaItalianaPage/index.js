import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import ApprendimentoLinguaItaliana from 'components/navigation/ApprendimentoLinguaItaliana';
import { BreadcrumbPath } from './constants';

const ApprendimentoLinguaItalianaPage = () => (
  <>
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} ignoreCase />
    </Wrapper>
    <ApprendimentoLinguaItaliana />
  </>
  );

ApprendimentoLinguaItalianaPage.displayName = 'ApprendimentoLinguaItalianaPage';

export default ApprendimentoLinguaItalianaPage;

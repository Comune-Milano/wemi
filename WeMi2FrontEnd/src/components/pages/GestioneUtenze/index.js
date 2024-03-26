import React from 'react';
import Header from 'components/ui2/Header';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { BreadcrumbPath } from './constants';
import Wrapper from 'components/navigation/NavigationWrapper';
import UsersManagement from 'components/navigation/UsersManagement';

const GestioneUtenze = () => {

  return (
    <Wrapper>
      <>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Header fontSize="f4" title="Gestione utenze" color="blue" />
        <UsersManagement/>
      </>
    </Wrapper>
  );
};

GestioneUtenze.displayName = 'GestioneUtenzePage';

export default GestioneUtenze;
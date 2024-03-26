import React from 'react';
import Header from 'components/ui2/Header';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { BreadcrumbPath } from './constants';
import Wrapper from 'components/navigation/NavigationWrapper';
import ModifyUser from 'components/navigation/ModifyUser';

const ModificaUtenza = () => {

  return (
    <Wrapper>
      <>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Header fontSize="f4" title="Modifica utenza" color="blue" />
        <ModifyUser />
      </>
    </Wrapper>
  );
};

ModificaUtenza.displayName = 'ModificaUtenzaPage';

export default ModificaUtenza;
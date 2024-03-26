import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import InclusioneCorsoItaliano from 'components/navigation/InclusioneCorsoItaliano';
import { BreadcrumbPath } from './constants';

const CorsoItaliano = () => {

  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} ignoreCase />
      <InclusioneCorsoItaliano />
    </Wrapper>
  );
};

CorsoItaliano.displayName = 'CorsoItalianoPage';

export default CorsoItaliano;

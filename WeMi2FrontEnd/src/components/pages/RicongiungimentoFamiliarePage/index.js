import React from 'react';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import RicongiungimentoFamiliare from 'components/navigation/RicongiungimentoFamiliare';
import { BreadcrumbPath } from './constants';

const RicongiungimentoFamiliarePage = () => (
  <>
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} ignoreCase />
    </Wrapper>
    <RicongiungimentoFamiliare />
  </>
  );

RicongiungimentoFamiliarePage.displayName = 'RicongiungimentoFamiliarePage';

export default RicongiungimentoFamiliarePage;

import Breadcrumbs from 'components/navigation/Breadcrumbs';
import React from 'react';
import Wrapper from 'components/navigation/NavigationWrapper';
import MilanoL2 from 'components/navigation/MilanoL2';
import { breadcrumbPath } from './constants';

const MilanoL2Page = () => (
  <Wrapper>
    <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumbPath} ignoreCase />
    <MilanoL2 />
  </Wrapper>
);

MilanoL2Page.displayName = 'MilanoL2Page';
export default MilanoL2Page;

import React from 'react';
import { Row } from 'components/ui/Grid';
import { CategoriesHeaderBox } from 'components/shared/CategoriesHeaderBox';
import { title, categories } from './costants';
import { subTitle } from './subtitle';

const ApprendimentoLinguaItaliana = () => (
  <Row fluid margin="0 0 8em 0">
    <CategoriesHeaderBox title={title} subTitle={subTitle} color="blue" categories={categories} />
  </Row>
  );

ApprendimentoLinguaItaliana.displayName = 'ApprendimentoLinguaItalianaNavigation';

export default ApprendimentoLinguaItaliana;

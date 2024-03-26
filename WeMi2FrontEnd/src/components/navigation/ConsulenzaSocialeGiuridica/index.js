import React from 'react';
import { Row } from 'components/ui/Grid';
import { CategoriesHeaderBox } from 'components/shared/CategoriesHeaderBox';
import { title, categories } from './constants';
import { subTitle } from './subtitle';

const ConsulenzaSocialeGiuridica = () => (
  <Row fluid margin="0 0 8em 0">
    <CategoriesHeaderBox title={title} subTitle={subTitle} color="green" categories={categories} />
  </Row>
);

ConsulenzaSocialeGiuridica.displayName = 'ConsulenzaSocialeGiuridicaNavigation';

export default ConsulenzaSocialeGiuridica;

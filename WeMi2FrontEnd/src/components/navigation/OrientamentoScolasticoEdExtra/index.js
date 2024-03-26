import React from 'react';
import { Row } from 'components/ui/Grid';
import { categories, title } from './costants';
import { CategoriesHeaderBox } from '../../shared/CategoriesHeaderBox';
import { subTitle } from './subtitle';

const OrientamentoScolasticoEdExtra = () => (

  <Row fluid margin="0 0 8em 0">
    <CategoriesHeaderBox categories={categories} title={title} subTitle={subTitle} color="purple" />
  </Row>
  );

OrientamentoScolasticoEdExtra.displayName = 'OrientamentoScolasticoEdExtra Navigation';

export default OrientamentoScolasticoEdExtra;

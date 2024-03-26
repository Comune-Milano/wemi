import React from 'react';
import { Row } from 'components/ui/Grid';
import { CategoriesHeaderBox } from 'components/shared/CategoriesHeaderBox';
import { title, categories } from './constants';
import { subTitle } from './subtitle';

const RicongiungimentoFamiliare = () => (
  <Row fluid margin="0 0 8em 0">
    <CategoriesHeaderBox title={title} subTitle={subTitle} categories={categories} color="red" />
  </Row>
  );

RicongiungimentoFamiliare.displayName = 'RicongiungimentoFamiliare Navigation';

export default RicongiungimentoFamiliare;

import HeaderBox from 'components/shared/HeaderBox';
import CategoriesHeaderBoxContent from 'components/shared/CategoriesHeaderBox/categoriesheaderboxcontent';
import React from 'react';

export const CategoriesHeaderBox = ({ categories = [], title, subTitle, color }) => (
  <HeaderBox
    titolo={title}
    sottoTitolo={subTitle}
    sizePadding={{ xs: '6em 2rem', md: '6em 2.7em', lg: '6em 8em' }}
    color={color}
    mdTitolo="8"
    // paddingMd="6em 8em"
  >
    <CategoriesHeaderBoxContent categories={categories} />
  </HeaderBox>
    );

CategoriesHeaderBox.displayName = 'CategoriesHeaderBox';

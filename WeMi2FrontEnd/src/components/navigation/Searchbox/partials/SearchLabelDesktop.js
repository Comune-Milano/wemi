/** @format */

import React from 'react';
import { Column } from 'components/ui/Grid';
import { SearchboxJson } from 'mocks/SearchboxJson';
import { SearchboxHeaderRow, SearchboxHeader } from 'components/navigation/Searchbox/partials';
import Text from 'components/ui/Text';

const SearchLabelDesktop = () => (
  <SearchboxHeaderRow justifycontent="space-around">
    <SearchboxHeader xs="0" md="3" lg="2">
      {SearchboxJson.headerMessage.map(text => (
        <Text   weight={text.weight} value={text.label} intlFormatter color="darkGrey" size="f4" />
      ))}
    </SearchboxHeader>
    <Column md="7" lg="9" />
  </SearchboxHeaderRow>
);

SearchLabelDesktop.displayName = 'SearchLabelDesktop';
export default SearchLabelDesktop;
